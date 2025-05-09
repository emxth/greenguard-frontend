// FuturePrediction.jsx
import { Box, Typography } from "@mui/material";
import theme from "../theme"; // if you have theme imported

export function FuturePrediction({ revenueCurrent, revenuePrevious, maintenanceCurrent, maintenancePrevious, fuelCurrent, fuelPrevious }) {
    // Calculate predicted values
    const predictedRevenue = revenueCurrent + (revenueCurrent - revenuePrevious);
    const predictedMaintenance = maintenanceCurrent + (maintenanceCurrent - maintenancePrevious);
    const predictedFuel = fuelCurrent + (fuelCurrent - fuelPrevious);

    const predictedProfit = predictedRevenue - (predictedMaintenance + predictedFuel);

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h5" sx={{ color: theme.palette.lightgreen.main, mb: 3 }}>
                Future Prediction (Next Month)
            </Typography>

            <Typography variant="body1" sx={{ mb: 1 }}>
                Predicted Revenue: <strong>${predictedRevenue.toFixed(2)}</strong>
            </Typography>

            <Typography variant="body1" sx={{ mb: 1 }}>
                Predicted Maintenance Cost: <strong>${predictedMaintenance.toFixed(2)}</strong>
            </Typography>

            <Typography variant="body1" sx={{ mb: 1 }}>
                Predicted Fuel Cost: <strong>${predictedFuel.toFixed(2)}</strong>
            </Typography>

            <Typography variant="body1" sx={{ mb: 1 }}>
                Predicted Profit/Loss: <strong style={{ color: predictedProfit >= 0 ? "green" : "red" }}>
                    ${predictedProfit.toFixed(2)}
                </strong>
            </Typography>
        </Box>
    );
}
