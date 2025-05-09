import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
import { Box, Typography } from "@mui/material";

const COLORS = ["#2196f3", "#ff9800"]; // Fuel, Maintenance

export const ExpenseBreakdownChart = ({ fuel, maintenance }) => {
    const data = [
        { name: "Fuel", value: fuel },
        { name: "Maintenance", value: maintenance },
    ];

    return (
        <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Expense Breakdown
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="45%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                    >
                        {data.map((_, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </Box>
    );
};
