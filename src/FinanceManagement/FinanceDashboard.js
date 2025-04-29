import React, { useState } from "react";
import useFetchTotal from "./Calculations";
import { FinanceOverview, FuturePrediction, MonthlyComparison, PendingApprovals } from "./DashboardElements";
import { MonthlyRevenueExpensesChart } from "./MonthlyRevenueExpensesChart";
import { ExpenseBreakdownChart } from "./ExpenseBreakdownChart";
import { Box, Checkbox, Divider, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import theme from "../components/theme";
import MonthlyProfitLossChart from "./MonthlyProfitLossChart";

const FinanceDashboard = () => {
    const [allMonths, setAllMonths] = useState(true);
    const [allYears, setAllYears] = useState(true);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);

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
    
      
    return (
        <Box>
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
        </Box>
    );
};

export default FinanceDashboard;
