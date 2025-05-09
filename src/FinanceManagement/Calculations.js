import { useEffect, useState } from "react";
import axios from "axios";

const useFetchTotal = (url, amountKey, dateKey, statusKey = null, filterMonth = null, filterYear = null) => {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [pendingCount, setPendingCount] = useState(0);
    const [currentMonthTotal, setCurrentMonthTotal] = useState(0);
    const [previousMonthTotal, setPreviousMonthTotal] = useState(0);
    const [filteredTotal, setFilteredTotal] = useState(0);
    const [filteredPending, setFilteredPending] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                const items = response.data;

                if (!Array.isArray(items)) {
                    console.error(`Expected array but got:`, items);
                    setData([]);
                    return;
                }

                setData(items);

                const now = new Date();
                const currentMonth = now.getMonth();
                const currentYear = now.getFullYear();
                const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
                const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

                let totalAmount = 0;
                let currentMonthAmount = 0;
                let previousMonthAmount = 0;
                let pendingApprovals = 0;
                let monthFilteredAmount = 0;
                let monthFilteredPending = 0;

                items.forEach((item) => {
                    let itemDate = item[dateKey];
                    if (!itemDate) return;

                    if (typeof itemDate === "string") {
                        const parts = itemDate.split("-");
                        if (parts[0].length === 4) {
                            itemDate = new Date(itemDate); // yyyy-mm-dd
                        } else {
                            const [day, month, year] = parts.map(Number);
                            itemDate = new Date(year, month - 1, day); // dd-mm-yyyy
                        }
                    } else {
                        itemDate = new Date(itemDate);
                    }

                    if (isNaN(itemDate.getTime())) return;

                    const itemMonth = itemDate.getMonth();
                    const itemYear = itemDate.getFullYear();
                    const amount = Number(item[amountKey]) || 0;
                    const status = item[statusKey];

                    const matchMonth = filterMonth === null || itemMonth === filterMonth;
                    const matchYear = filterYear === null || itemYear === filterYear;

                    // Only count approved items for all totals
                    if (!statusKey || status === "Approved") {
                        totalAmount += amount;

                        if (itemMonth === currentMonth && itemYear === currentYear) {
                            currentMonthAmount += amount;
                        }

                        if (itemMonth === lastMonth && itemYear === lastMonthYear) {
                            previousMonthAmount += amount;
                        }

                        if (matchMonth && matchYear) {
                            monthFilteredAmount += amount;
                        }
                    }

                    if (statusKey && status === "Pending") {
                        pendingApprovals += 1;
                    
                        if (matchMonth && matchYear) {
                            monthFilteredPending += 1;
                        }
                    }

                    // const matchMonth = filterMonth === null || itemMonth === filterMonth;
                    // const matchYear = filterYear === null || itemYear === filterYear;

                });

                setTotal(totalAmount);
                setCurrentMonthTotal(currentMonthAmount);
                setPreviousMonthTotal(previousMonthAmount);
                setPendingCount(pendingApprovals);
                setFilteredTotal(monthFilteredAmount);
                setFilteredPending(monthFilteredPending);
            } catch (error) {
                console.error(`Error fetching data from ${url}:`, error);
                setData([]);
            }
        };

        fetchData();
    }, [url, amountKey, dateKey, statusKey, filterMonth, filterYear]);

    return {
        data,
        total,
        pendingCount,
        currentMonthTotal,
        previousMonthTotal,
        filteredTotal,
        filteredPending,
    };
};

export default useFetchTotal;
