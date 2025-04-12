import React, { useState } from "react";
import useFetchTotal from "./Calculations";
import { FinanceOverview, MonthlyComparison, PendingApprovals } from "./DashboardElements";
import { MonthlyRevenueExpensesChart } from "./MonthlyRevenueExpensesChart";
import { ExpenseBreakdownChart } from "./ExpenseBreakdownChart";
import { Box, Checkbox, Divider, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import theme from "../components/theme";

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

                    {/* <h3>
                        Filtered Finance Overview (
                        {effectiveMonth !== null ? `${new Date(0, effectiveMonth).toLocaleString("default", { month: "long" })} / ` : ""}
                        {effectiveYear !== null ? `${effectiveYear}` : "All Years"}
                        )
                    </h3>
                    <p>Total Revenue: Rs. {filteredRevenue.toFixed(2)}</p>
                    <p>Total Expenses: Rs. {filteredExpenses.toFixed(2)}</p>
                    <p>{filteredProfit >= 0 ? `Net Profit: Rs. ${filteredProfit.toFixed(2)}` : `Net Loss: Rs. ${filteredLoss.toFixed(2)}`}</p> */}

                    {/* <h3>Pending Approvals</h3>
                    <p>Fuel (Pending in selected month): {fuelFilteredPending}</p>
                    <p>Maintenance (Pending in selected month): {maintenanceFilteredPending}</p>
                    <p>Total Pending Approvals: {filteredPendingApprovals}</p> */}
                </>
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
                            display: "flex",
                            width: "100%",
                            justifyContent: "space-between",
                            flexWrap: "wrap" // If on smaller screens you want them to stack
                        }}
                    >
                        <Box sx={{ flex: 1, minWidth: "300px", height: 350 }}>
                            <MonthlyRevenueExpensesChart
                                currentRevenue={revenueCurrent}
                                previousRevenue={revenuePrevious}
                                currentExpenses={fuelCurrent + maintenanceCurrent}
                                previousExpenses={fuelPrevious + maintenancePrevious}
                            />
                        </Box>

                        <Box sx={{ flex: 1, minWidth: "300px", height: 350 }}>
                            <ExpenseBreakdownChart
                                fuel={fuelCurrent}
                                maintenance={maintenanceCurrent}
                            />
                        </Box>
                    </Box>

                    {/* <p>Total Revenue (Citizen Payments): Rs. {totalRevenue.toFixed(2)}</p>
                    <p>Total Expenses (Fuel + Maintenance): Rs. {totalExpenses.toFixed(2)}</p>
                    <p>{netProfit >= 0 ? `Net Profit: Rs. ${netProfit.toFixed(2)}` : `Net Loss: Rs. ${netLoss.toFixed(2)}`}</p> */}

                    {/* <h3>Pending Approvals</h3>
                    <p>Pending Fuel Approvals: {pendingFuel}</p>
                    <p>Pending Maintenance Approvals: {pendingMaintenance}</p>
                    <p>Total Pending Approvals: {totalPendingApprovals}</p> */}

                    {/* <h3>Monthly Comparison</h3>
                    <p>Revenue → Current: Rs. {revenueCurrent.toFixed(2)} | Previous: Rs. {revenuePrevious.toFixed(2)}</p>
                    <p>Maintenance → Current: Rs. {maintenanceCurrent.toFixed(2)} | Previous: Rs. {maintenancePrevious.toFixed(2)}</p>
                    <p>Fuel Expenses → Current: Rs. {fuelCurrent.toFixed(2)} | Previous: Rs. {fuelPrevious.toFixed(2)}</p> */}
                </>
            )}
        </Box>
    );
};

export default FinanceDashboard;
