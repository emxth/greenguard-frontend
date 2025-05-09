// src/components/MonthlyProfitLossChart.js
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Typography, Box } from "@mui/material";

const MonthlyProfitLossChart = ({ data }) => {
    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Monthly Profit/Loss Overview
            </Typography>
            <ResponsiveContainer width="100%" height={350}>
                <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="profit" stroke="#4caf50" name="Profit" />
                    <Line type="monotone" dataKey="loss" stroke="#f44336" name="Loss" />
                </LineChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default MonthlyProfitLossChart;
