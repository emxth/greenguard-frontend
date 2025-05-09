import { Box, Typography, Grid, Card, CardContent, CircularProgress, Divider } from "@mui/material";
import theme from "../components/theme";
import { TipsAndUpdates } from "@mui/icons-material";

// Calling methods for display Net Profit/Loss, Total Revenue, and Total Expenses
export function FinanceOverview({ revenueValue, expenseValue, profitValue }) {
    return (
        <Box>
            <Typography variant="h5" sx={{ color: theme.palette.lightgreen.main, mb: 3, }}>
                Finance Overview
            </Typography>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <Card sx={{ boxShadow: 2, borderRadius: 2, height: "140px", textAlign: "center", bgcolor: revenueValue - expenseValue >= 0 ? "#ffffff00" : "#FECFCF" }}>
                        <CardContent>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                {revenueValue - expenseValue >= 0 ? `Net Profit` : `Net Loss`}
                            </Typography>
                            <Typography variant="h6" sx={{ mt: 1, fontWeight: 600, color: revenueValue - expenseValue >= 0 ? theme.palette.success.main : theme.palette.error.main }}>
                                LKR {profitValue.toFixed(2)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Card sx={{ boxShadow: 2, borderRadius: 2, height: "140px", textAlign: "center", }}>
                        <CardContent>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                Total Revenue <br /><i>(Citizen Payments)</i>
                            </Typography>
                            <Typography variant="h6" sx={{ mt: 1, fontWeight: 600 }}>
                                LKR {revenueValue.toFixed(2)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Card sx={{ boxShadow: 2, borderRadius: 2, height: "140px", textAlign: "center", }}>
                        <CardContent>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                Total Expenses <br /><i>(Fuel + Maintenance)</i>
                            </Typography>
                            <Typography variant="h6" sx={{ mt: 1, fontWeight: 600 }}>
                                LKR {profitValue.toFixed(2)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}

// Calling methods for display Pending Fuel Approvals, Pending Maintenance Approvals, and Total Pending Approvals
export function PendingApprovals({ pendingFuel, pendingMaintenance, totalPending }) {
    const maxFuel = totalPending;
    const maxMaintenance = totalPending;

    const fuelPercent = Math.min((pendingFuel / maxFuel) * 100, 100);
    const maintenancePercent = Math.min((pendingMaintenance / maxMaintenance) * 100, 100);

    const GaugeCard = ({ label, value, percent }) => (
        <Card sx={{ boxShadow: 2, borderRadius: 2, height: "180px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                    {label}
                </Typography>
                <Box position="relative" display="inline-flex">
                    <CircularProgress variant="determinate" value={percent} size={80} thickness={5} color="warning" />
                    <Box
                        top={0}
                        left={0}
                        bottom={0}
                        right={0}
                        position="absolute"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Typography variant="h6" component="div" color="textSecondary">
                            {value}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );

    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="h5" sx={{ color: theme.palette.lightgreen.main, mb: 3 }}>
                Pending Approvals
            </Typography>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <GaugeCard label="Pending Fuel Approvals" value={pendingFuel} percent={fuelPercent} />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <GaugeCard label="Pending Maintenance Approvals" value={pendingMaintenance} percent={maintenancePercent} />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card sx={{ boxShadow: 2, borderRadius: 2, height: "180px", display: "flex", alignItems: "center", justifyContent: "center", }}>
                        <CardContent>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                Total Pending Approvals
                            </Typography>
                            <Typography variant="h6" sx={{ mt: 2, textAlign: "center" }}>
                                {totalPending}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}

// Calling methods for display Monthly Comparison of Revenue, Maintenance, and Fuel and Total profit/loss in each month
export function MonthlyComparison({ revenueCurrent, revenuePrevious, maintenanceCurrent, maintenancePrevious, fuelCurrent, fuelPrevious }) {
    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h5" sx={{ color: theme.palette.lightgreen.main, mb: 3 }}>
                Monthly Comparison
            </Typography>
        </Box>
    );
}

// Calling methods for display Monthly Comparison of Revenue, Maintenance, and Fuel and Total profit/loss in each month
export function FuturePrediction({ revenueCurrent, revenuePrevious, maintenanceCurrent, maintenancePrevious, fuelCurrent, fuelPrevious }) {
    // Calculate predicted values
    const predictedRevenue = revenueCurrent + (revenueCurrent - revenuePrevious);
    const predictedMaintenance = maintenanceCurrent + (maintenanceCurrent - maintenancePrevious);
    const predictedFuel = fuelCurrent + (fuelCurrent - fuelPrevious);

    const currentProfit = revenueCurrent - (maintenanceCurrent + fuelCurrent);
    const predictedProfit = predictedRevenue - (predictedMaintenance + predictedFuel);

    // Advice logic
    let advice = "";

    if (predictedProfit > currentProfit) {
        advice = "Great job! Your profit is increasing. Continue controlling maintenance and fuel costs.";
    } else if (predictedProfit < currentProfit && predictedRevenue >= revenueCurrent) {
        advice = "Revenue is increasing but costs are rising faster. Focus on reducing maintenance and fuel expenses.";
    } else if (predictedRevenue < revenueCurrent) {
        advice = "Revenue is dropping. Consider improving services or finding new revenue sources.";
    } else {
        advice = "Stable trend. Keep optimizing operations to maximize profits.";
    }

    return (
        <Box sx={{ mt: 4 }}>
            <Divider sx={{ mb: 4 }} />

            <Typography variant="h5" sx={{ color: theme.palette.lightgreen.main, mb: 3 }}>
                Future Prediction (Next Month)
            </Typography>

            {/* Predicted values table */}
            <table style={{ width: "70%", borderCollapse: "collapse" }}>
                <tr>
                    <td>
                        <Typography variant="body1" sx={{ mb: 1 }}>Predicted Revenue :</Typography>
                    </td>
                    <td>
                        <Typography variant="body1" sx={{ mb: 1, fontWeight: 600 }}>(LKR) {predictedRevenue.toFixed(2)}</Typography>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Typography variant="body1" sx={{ mb: 1 }}>Predicted Maintenance Cost :</Typography>
                    </td>
                    <td>
                        <Typography variant="body1" sx={{ mb: 1, fontWeight: 600 }}>(LKR) {predictedMaintenance.toFixed(2)}</Typography>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Typography variant="body1" sx={{ mb: 1 }}>Predicted Fuel Cost :</Typography>
                    </td>
                    <td>
                        <Typography variant="body1" sx={{ mb: 1, fontWeight: 600 }}>(LKR) {predictedFuel.toFixed(2)}</Typography>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Typography variant="body1" sx={{ mb: 1 }}>Predicted Profit/Loss :</Typography>
                    </td>
                    <td>
                        <Typography variant="body1" sx={{ mb: 1, fontWeight: 600 }} style={{ color: predictedProfit >= 0 ? "green" : "red" }}>(LKR) {predictedProfit.toFixed(2)}</Typography>
                    </td>
                </tr>
            </table>

            {/* Generated Advice */}
            <Box sx={{ mt: 3, p: 2, backgroundColor: "#f5f5f5", borderRadius: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
                    <TipsAndUpdates sx={{ color: 'warning.main' }} /> Advice
                </Typography>
                <Typography variant="body2">
                    {advice}
                </Typography>
            </Box>
        </Box>
    );
}