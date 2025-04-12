import { Box, Typography, Grid, Card, CardContent, CircularProgress } from "@mui/material";
import theme from "../components/theme";

export function FinanceOverview({ revenueValue, expenseValue, profitValue }) {
    return (
        <Box>
            <Typography variant="h5" sx={{ color: theme.palette.lightgreen.main, mb: 3, }}>
                Finance Overview
            </Typography>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                    <Card sx={{ boxShadow: 2, borderRadius: 2, height: "140px" }}>
                        <CardContent>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                Total Revenue <br /><i>(Citizen Payments)</i>
                            </Typography>
                            <Typography variant="h6" sx={{ mt: 1, color: theme.palette.primary.main }}>
                                Rs. {revenueValue.toFixed(2)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Card sx={{ boxShadow: 2, borderRadius: 2, height: "140px" }}>
                        <CardContent>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                Total Expenses <br /><i>(Fuel + Maintenance)</i>
                            </Typography>
                            <Typography variant="h6" sx={{ mt: 1, color: theme.palette.error.main }}>
                                Rs. {expenseValue.toFixed(2)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Card sx={{ boxShadow: 2, borderRadius: 2, height: "140px" }}>
                        <CardContent>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                {profitValue >= 0 ? `Net Profit` : `Net Loss`}
                            </Typography>
                            <Typography variant="h6" sx={{ mt: 1, color: theme.palette.success.main }}>
                                Rs. {profitValue.toFixed(2)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}

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

export function MonthlyComparison({ revenueCurrent, revenuePrevious, maintenanceCurrent, maintenancePrevious, fuelCurrent, fuelPrevious }) {
    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h5" sx={{ color: theme.palette.lightgreen.main, mb: 3 }}>
                Monthly Comparison
            </Typography>
        </Box>
    );
}
