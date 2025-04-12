import React, { useState } from "react";
import useFetchTotal from "./Calculations";

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
    const netLoss = totalExpenses - totalRevenue;

    const filteredExpenses = filteredFuel + filteredMaintenance;
    const filteredProfit = filteredRevenue - filteredExpenses;
    const filteredLoss = filteredExpenses - filteredRevenue;

    const totalPendingApprovals = pendingFuel + pendingMaintenance;
    const filteredPendingApprovals = fuelFilteredPending + maintenanceFilteredPending;

    return (
        <div>
            <h2>Finance Dashboard</h2>

            <div style={{ marginBottom: "1rem" }}>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={allMonths}
                            onChange={() => setAllMonths(!allMonths)}
                        />
                        All Months
                    </label>
                    {!allMonths && (
                        <select
                            onChange={(e) => setSelectedMonth(Number(e.target.value))}
                            defaultValue=""
                        >
                            <option value="" disabled>Select Month</option>
                            {Array.from({ length: 12 }, (_, i) => (
                                <option key={i} value={i}>
                                    {new Date(0, i).toLocaleString("default", { month: "long" })}
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={allYears}
                            onChange={() => setAllYears(!allYears)}
                        />
                        All Years
                    </label>
                    {!allYears && (
                        <select
                            onChange={(e) => setSelectedYear(Number(e.target.value))}
                            defaultValue=""
                        >
                            <option value="" disabled>Select Year</option>
                            {[2023, 2024, 2025].map((year) => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    )}
                </div>
            </div>

            {showFiltered ? (
                <>
                    <h3>
                        Filtered Finance Overview (
                        {effectiveMonth !== null ? `${new Date(0, effectiveMonth).toLocaleString("default", { month: "long" })} / ` : ""}
                        {effectiveYear !== null ? `${effectiveYear}` : "All Years"}
                        )
                    </h3>
                    <p>Total Revenue: Rs. {filteredRevenue.toFixed(2)}</p>
                    <p>Total Expenses: Rs. {filteredExpenses.toFixed(2)}</p>
                    <p>{filteredProfit >= 0 ? `Net Profit: Rs. ${filteredProfit.toFixed(2)}` : `Net Loss: Rs. ${filteredLoss.toFixed(2)}`}</p>

                    <h3>Pending Approvals</h3>
                    <p>Fuel (Pending in selected month): {fuelFilteredPending}</p>
                    <p>Maintenance (Pending in selected month): {maintenanceFilteredPending}</p>
                    <p>Total Pending Approvals: {filteredPendingApprovals}</p>
                </>
            ) : (
                <>
                    <h3>Finance Overview</h3>
                    <p>Total Revenue (Citizen Payments): Rs. {totalRevenue.toFixed(2)}</p>
                    <p>Total Expenses (Fuel + Maintenance): Rs. {totalExpenses.toFixed(2)}</p>
                    <p>{netProfit >= 0 ? `Net Profit: Rs. ${netProfit.toFixed(2)}` : `Net Loss: Rs. ${netLoss.toFixed(2)}`}</p>

                    <h3>Pending Approvals</h3>
                    <p>Pending Fuel Approvals: {pendingFuel}</p>
                    <p>Pending Maintenance Approvals: {pendingMaintenance}</p>
                    <p>Total Pending Approvals: {totalPendingApprovals}</p>

                    <h3>Monthly Comparison</h3>
                    <p>Revenue → Current: Rs. {revenueCurrent.toFixed(2)} | Previous: Rs. {revenuePrevious.toFixed(2)}</p>
                    <p>Maintenance → Current: Rs. {maintenanceCurrent.toFixed(2)} | Previous: Rs. {maintenancePrevious.toFixed(2)}</p>
                    <p>Fuel Expenses → Current: Rs. {fuelCurrent.toFixed(2)} | Previous: Rs. {fuelPrevious.toFixed(2)}</p>
                </>
            )}
        </div>
    );
};

export default FinanceDashboard;
