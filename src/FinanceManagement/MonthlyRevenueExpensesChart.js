import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Box, Typography } from "@mui/material";

export const MonthlyRevenueExpensesChart = ({ currentRevenue, previousRevenue, currentExpenses, previousExpenses }) => {
    const data = [
        {
            name: "Previous Month",
            Revenue: previousRevenue,
            Expenses: previousExpenses,
        },
        {
            name: "Current Month",
            Revenue: currentRevenue,
            Expenses: currentExpenses,
        },
    ];

    return (
        <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Revenue vs Expenses (Monthly)
            </Typography>
            <ResponsiveContainer width="90%" height={300}>
                <BarChart data={data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Revenue" fill="#4caf50" />
                    <Bar dataKey="Expenses" fill="#f44336" />
                </BarChart>
            </ResponsiveContainer>
        </Box>
    );
};
