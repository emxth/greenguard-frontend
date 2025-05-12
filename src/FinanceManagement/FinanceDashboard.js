import React, { useRef, useState } from "react";
import useFetchTotal from "./Calculations";
import { FinanceOverview, FuturePrediction, MonthlyComparison, PendingApprovals } from "./DashboardElements";
import { MonthlyRevenueExpensesChart } from "./MonthlyRevenueExpensesChart";
import { ExpenseBreakdownChart } from "./ExpenseBreakdownChart";
import { Backdrop, Box, Button, Checkbox, CircularProgress, Divider, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import theme from "../components/theme";
import logo from '../images/logo-color.png';
import MonthlyProfitLossChart from "./MonthlyProfitLossChart";
import jsPDF from "jspdf";
import { FileDownload } from "@mui/icons-material";

const FinanceDashboard = () => {
    const [allMonths, setAllMonths] = useState(true);
    const [allYears, setAllYears] = useState(true);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const [loading, setLoading] = useState(false);

    const effectiveMonth = allMonths ? null : selectedMonth;
    const effectiveYear = allYears ? null : selectedYear;
    const showFiltered = effectiveMonth !== null || effectiveYear !== null;

    const {
        total: totalFuelExpense,
        pendingCount: pendingFuel,
        currentMonthTotal: fuelCurrent,
        previousMonthTotal: fuelPrevious,
        filteredTotal: filteredFuel,
        filteredPending: fuelFilteredPending
    } = useFetchTotal("http://localhost:8081/FuelCost/getAllFuelCost", "FuelCost", "Fuel_Date", "Status", effectiveMonth, effectiveYear);

    const {
        total: totalMaintenanceExpense,
        pendingCount: pendingMaintenance,
        currentMonthTotal: maintenanceCurrent,
        previousMonthTotal: maintenancePrevious,
        filteredTotal: filteredMaintenance,
        filteredPending: maintenanceFilteredPending
    } = useFetchTotal("http://localhost:8081/Maintenance/getAllCosts", "Cost", "Maintenance_Date", "Status", effectiveMonth, effectiveYear);

    const {
        total: totalCitizenPayments,
        currentMonthTotal: revenueCurrent,
        previousMonthTotal: revenuePrevious,
        filteredTotal: filteredRevenue
    } = useFetchTotal("http://localhost:8081/payment/", "amount", "created_at", null, effectiveMonth, effectiveYear);

    const totalExpenses = totalFuelExpense + totalMaintenanceExpense;
    const totalRevenue = totalCitizenPayments;
    const netProfit = totalRevenue - totalExpenses;

    const filteredExpenses = filteredFuel + filteredMaintenance;
    const filteredProfit = filteredRevenue - filteredExpenses;
    const filteredLoss = filteredExpenses - filteredRevenue;

    const totalPendingApprovals = pendingFuel + pendingMaintenance;
    const filteredPendingApprovals = fuelFilteredPending + maintenanceFilteredPending;

    // Fetch data for get monthly profit/loss
    const { data: revenueData, } = useFetchTotal("http://localhost:8081/payment/", "amount", "created_at");
    const { data: fuelExpenses, } = useFetchTotal("http://localhost:8081/FuelCost/getAllFuelCost", "FuelCost", "Fuel_Date", "Status");
    const { data: maintenanceExpenses, } = useFetchTotal("http://localhost:8081/Maintenance/getAllCosts", "Cost", "Maintenance_Date", "Status");

    // Fetch data for pie chart (expense breakdown chart)
    const { filteredTotal: fuelCurrentPie } = useFetchTotal("http://localhost:8081/FuelCost/getAllFuelCost", "FuelCost", "Fuel_Date", "Status");
    const { filteredTotal: maintenanceCurrentPie } = useFetchTotal("http://localhost:8081/Maintenance/getAllCosts", "Cost", "Maintenance_Date");

    // Convert the different date formats into standard date
    const parseDate = (dateString) => {
        if (!dateString) return null;

        if (typeof dateString === "string") {
            if (dateString.includes("T")) {
                // ISO format: 2025-03-25T12:06:22.304Z
                return new Date(dateString);
            } else if (dateString.includes("-")) {
                const parts = dateString.split("-");
                if (parts[0].length === 4) {
                    // yyyy-mm-dd
                    return new Date(dateString);
                } else {
                    // dd-mm-yyyy
                    const [day, month, year] = parts.map(Number);
                    return new Date(year, month - 1, day);
                }
            }
        }

        // Fallback
        return new Date(dateString);
    };

    // Setup monthly profit/loss data
    const getMonthlyProfitLoss = () => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthlyData = [];

        for (let i = 0; i < 12; i++) {
            let revenue = 0;
            let expenses = 0;

            // sum revenue
            revenueData.forEach((item) => {
                const date = parseDate(item.created_at);
                if (date && date.getMonth() === i) {
                    revenue += Number(item.amount) || 0;
                }
            });

            // sum expenses
            fuelExpenses.forEach((item) => {
                const date = parseDate(item.Fuel_Date);
                if (date && date.getMonth() === i && item.Status === "Approved") {
                    expenses += Number(item.FuelCost) || 0;
                }
            });

            maintenanceExpenses.forEach((item) => {
                const date = parseDate(item.Maintenance_Date);
                if (date && date.getMonth() === i && item.Status === "Approved") {
                    expenses += Number(item.Cost) || 0;
                }
            });

            monthlyData.push({
                month: months[i],
                profit: revenue >= expenses ? revenue - expenses : 0,
                loss: expenses > revenue ? expenses - revenue : 0,
            });
        }

        return monthlyData;
    };

    const profitLossData = getMonthlyProfitLoss();

    // Function to export the dashboard as a PDF
    const exportRef = useRef();

    // Function to handle PDF export
    const handleExportPDF = async () => {
        setLoading(true);
        const pdf = new jsPDF("p", "mm", "a4");

        // Constants for styling
        const marginLeft = 15;
        const headerColor = [50, 50, 50];
        const rowColor = [240, 240, 240];
        const borderColor = [200, 200, 200];
        let y = 50;

        // Add logo
        await new Promise((resolve) => {
            const logoImg = new Image();
            logoImg.onload = () => {
                pdf.addImage(logoImg, 'PNG', marginLeft, 10, 30, 30);
                resolve();
            };
            logoImg.src = logo;
        });

        // Construct the dynamic date range string
        let dateLabel = "";
        if (effectiveMonth !== null || effectiveYear !== null) {
            const monthStr = effectiveMonth !== null
                ? new Date(0, effectiveMonth).toLocaleString("default", { month: "long" }) + " / "
                : "";
            const yearStr = effectiveYear !== null ? effectiveYear : "All Years";
            dateLabel = `FINANCE REPORT (${monthStr}${yearStr})`;
        } else {
            dateLabel = "FINANCE REPORT (All Data)";
        }

        // Set font and add the label to PDF
        pdf.setFontSize(18);
        pdf.setTextColor(40, 40, 40);
        pdf.setFont("helvetica", "bold");
        pdf.text(dateLabel, marginLeft, y); // Use same y you're tracking

        pdf.setFontSize(10);
        pdf.setTextColor(100, 100, 100);
        pdf.setFont("helvetica", "normal");
        pdf.text(`Generated on: ${new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })}`, marginLeft, y + 8);
        y += 20;

        // Helper function for creating tables
        const createTable = (title, headers, data) => {
            // Table Title
            pdf.setFontSize(14);
            pdf.setTextColor(...headerColor);
            pdf.setFont("helvetica", "bold");
            pdf.text(title, marginLeft, y);
            y += 8;

            // Calculate column widths
            const colWidths = headers.map(header => {
                // Calculate header width
                const headerWidth = pdf.getStringUnitWidth(header.text) * 5 + 10;

                // Calculate maximum data width for this column
                let maxDataWidth = 0;
                data.forEach(row => {
                    const cellValue = String(row[header.key]);
                    const cellWidth = pdf.getStringUnitWidth(cellValue) * 5 + 10;
                    if (cellWidth > maxDataWidth) {
                        maxDataWidth = cellWidth;
                    }
                });

                // Return the wider of header or data width, with a minimum width
                return Math.max(headerWidth, maxDataWidth, 30); // 30mm minimum width
            });

            // Table Headers
            pdf.setFontSize(10);
            pdf.setFillColor(...headerColor);
            pdf.setTextColor(255, 255, 255);
            pdf.setFont("helvetica", "bold");

            headers.forEach((header, i) => {
                const xPos = marginLeft + (i > 0 ? colWidths.slice(0, i).reduce((a, b) => a + b, 0) : 0);
                pdf.rect(xPos, y, colWidths[i], 8, 'F');
                pdf.text(header.text, xPos + 5, y + 5);
            });
            y += 8;

            // Table Data
            pdf.setFontSize(10);
            pdf.setTextColor(0, 0, 0);
            pdf.setFont("helvetica", "normal");

            data.forEach((row, rowIndex) => {
                // Alternate row colors
                if (rowIndex % 2 === 0) {
                    pdf.setFillColor(...rowColor);
                    pdf.rect(marginLeft, y, colWidths.reduce((a, b) => a + b, 0), 8, 'F');
                }

                // Draw cell borders
                pdf.setDrawColor(...borderColor);
                headers.forEach((_, i) => {
                    const xPos = marginLeft + (i > 0 ? colWidths.slice(0, i).reduce((a, b) => a + b, 0) : 0);
                    pdf.rect(xPos, y, colWidths[i], 8);
                });

                // Add cell content (ensuring all values are strings)
                headers.forEach((header, i) => {
                    const xPos = marginLeft + (i > 0 ? colWidths.slice(0, i).reduce((a, b) => a + b, 0) : 0) + 5;
                    pdf.text(String(row[header.key]), xPos, y + 5);
                });
                y += 8;
            });
            y += 12;
        };

        // 1. Finance Overview Table
        createTable("Finance Overview", [
            { text: "Metric", key: "metric" },
            { text: "Amount (LKR)", key: "amount" }
        ], [
            { metric: "Total Revenue", amount: filteredRevenue.toFixed(2) },
            { metric: "Total Expenses", amount: filteredExpenses.toFixed(2) },
            {
                metric: filteredProfit >= 0 ? "Net Profit" : "Net Loss",
                amount: Math.abs(filteredProfit >= 0 ? filteredProfit : filteredLoss).toFixed(2)
            }
        ]);

        // 2. Pending Approvals Table
        createTable("Pending Approvals", [
            { text: "Approval Type", key: "type" },
            { text: "Count", key: "count" }
        ], [
            { type: "Fuel Approvals", count: String(fuelFilteredPending) },
            { type: "Maintenance Approvals", count: String(maintenanceFilteredPending) },
            { type: "Total Pending Approvals", count: String(filteredPendingApprovals) }
        ]);

        // 3. Monthly Comparison Table
        createTable("Monthly Comparison (LKR)", [
            { text: "Category", key: "category" },
            { text: "Current Month", key: "current" },
            { text: "Previous Month", key: "previous" },
            { text: "Difference", key: "difference" }
        ], [
            {
                category: "Revenue",
                current: revenueCurrent.toFixed(2),
                previous: revenuePrevious.toFixed(2),
                difference: (revenueCurrent - revenuePrevious).toFixed(2)
            },
            {
                category: "Maintenance",
                current: maintenanceCurrent.toFixed(2),
                previous: maintenancePrevious.toFixed(2),
                difference: (maintenanceCurrent - maintenancePrevious).toFixed(2)
            },
            {
                category: "Fuel",
                current: fuelCurrent.toFixed(2),
                previous: fuelPrevious.toFixed(2),
                difference: (fuelCurrent - fuelPrevious).toFixed(2)
            }
        ]);

        // Footer
        pdf.setFontSize(8);
        pdf.setTextColor(150, 150, 150);
        pdf.text("Confidential - GreenGuard Solutions Internal Use Only", marginLeft, 280);

        // Save file
        pdf.save(`Finance_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
        setLoading(false);
    };

    return (
        <>
            {/* Export Button */}
            <Box sx={{ display: "flex", justifyContent: "end", mt: 3, mr: 3 }}>
                <Button
                    variant="contained"
                    color="warning"
                    onClick={handleExportPDF}
                >
                    <FileDownload sx={{ mr: 1 }} />
                    Export as PDF
                </Button>
            </Box>

            <Box ref={exportRef}>
                <Typography variant="h5" sx={{ color: theme.palette.lightgreen.main, mb: 2, mt: 3, fontWeight: 600 }}>
                    Finance Dashboard (
                    {effectiveMonth !== null ? `${new Date(0, effectiveMonth).toLocaleString("default", { month: "long" })} / ` : ""}
                    {effectiveYear !== null ? `${effectiveYear}` : "All Years"}
                    )
                </Typography>

                <Box sx={{ display: "flex", gap: 3, justifyContent: "end", mb: 2, mr: 3 }}>
                    {/* Month Filter */}
                    <Box>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={allMonths}
                                    onChange={() => setAllMonths(!allMonths)}
                                    color="success"
                                />
                            }
                            label="All Months"
                        />
                        {!allMonths && (
                            <FormControl sx={{ minWidth: 150, mt: 1 }} size="small">
                                <InputLabel id="month-select-label">Select Month</InputLabel>
                                <Select
                                    labelId="month-select-label"
                                    color="success"
                                    value={selectedMonth ?? ""}
                                    onChange={(e) => setSelectedMonth(Number(e.target.value))}
                                    label="Select Month"
                                >
                                    {Array.from({ length: 12 }, (_, i) => (
                                        <MenuItem key={i} value={i}>
                                            {new Date(0, i).toLocaleString("default", { month: "long" })}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                    </Box>

                    {/* Year Filter */}
                    <Box>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={allYears}
                                    onChange={() => setAllYears(!allYears)}
                                    color="success"
                                />
                            }
                            label="All Years"
                        />
                        {!allYears && (
                            <FormControl sx={{ minWidth: 150, mt: 1 }} size="small">
                                <InputLabel id="year-select-label">Select Year</InputLabel>
                                <Select
                                    labelId="year-select-label"
                                    color="success"
                                    value={selectedYear ?? ""}
                                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                                    label="Select Year"
                                >
                                    {[2023, 2024, 2025].map((year) => (
                                        <MenuItem key={year} value={year}>
                                            {year}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                    </Box>
                </Box>
                <Divider sx={{ mb: 2 }} />

                {showFiltered ? (
                    <>
                        {/* Filtered Finance Overview */}
                        <FinanceOverview
                            revenueValue={filteredRevenue}
                            expenseValue={filteredExpenses}
                            profitValue={filteredProfit >= 0 ? filteredProfit : filteredLoss}
                        />

                        {/* Filtered Pending Approvals */}
                        <PendingApprovals
                            pendingFuel={fuelFilteredPending}
                            pendingMaintenance={maintenanceFilteredPending}
                            totalPending={filteredPendingApprovals}
                        />
                    </>

                    // if non filtered
                ) : (
                    <>
                        <FinanceOverview
                            revenueValue={totalRevenue}
                            expenseValue={totalExpenses}
                            profitValue={netProfit}
                        />

                        <PendingApprovals
                            pendingFuel={pendingFuel}
                            pendingMaintenance={pendingMaintenance}
                            totalPending={totalPendingApprovals}
                        />

                        <MonthlyComparison
                            revenueCurrent={revenueCurrent}
                            revenuePrevious={revenuePrevious}
                            maintenanceCurrent={maintenanceCurrent}
                            maintenancePrevious={maintenancePrevious}
                            fuelCurrent={fuelCurrent}
                            fuelPrevious={fuelPrevious}
                        />

                        <Box
                            sx={{
                                mb: 3,
                                width: "100%",
                                flexWrap: "wrap"
                            }}
                        >
                            {/* Line Chart */}
                            <MonthlyProfitLossChart data={profitLossData} />
                        </Box>

                        <Box
                            sx={{
                                mb: 3,
                                display: "flex",
                                width: "100%",
                                justifyContent: "space-between",
                                flexWrap: "wrap"
                            }}
                        >
                            {/* Bar Chart */}
                            <Box sx={{ flex: 1, minWidth: "300px", height: 350 }}>
                                <MonthlyRevenueExpensesChart
                                    currentRevenue={revenueCurrent}
                                    previousRevenue={revenuePrevious}
                                    currentExpenses={fuelCurrent + maintenanceCurrent}
                                    previousExpenses={fuelPrevious + maintenancePrevious}
                                />
                            </Box>

                            {/* Pie Chart */}
                            <Box sx={{ flex: 1, minWidth: "300px", height: 350 }}>
                                <ExpenseBreakdownChart
                                    fuel={fuelCurrentPie}
                                    maintenance={maintenanceCurrentPie}
                                />
                            </Box>
                        </Box>

                        <FuturePrediction
                            revenueCurrent={revenueCurrent}
                            revenuePrevious={revenuePrevious}
                            maintenanceCurrent={maintenanceCurrent}
                            maintenancePrevious={maintenancePrevious}
                            fuelCurrent={fuelCurrent}
                            fuelPrevious={fuelPrevious}
                        />
                    </>
                )}

                {/* MUI Backdrop Loader */}
                <Backdrop open={loading} sx={{ zIndex: 9999, color: "#fff" }}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Box>
        </>
    );
};

export default FinanceDashboard;
