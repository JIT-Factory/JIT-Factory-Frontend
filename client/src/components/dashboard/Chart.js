import * as React from "react";
import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Label,
    ResponsiveContainer,
} from "recharts";

import { useDispatch, useSelector } from "react-redux";
import {
    fetchDailyProducts,
    fetchWeeklyProducts,
    fetchMonthlyProducts,
} from "../redux/productsSlice";
import axios from "axios";

// Generate Sales Data
function createData(time, amount) {
    return { time, amount };
}

// const data = [
//     createData("월", 6),
//     createData("화", 4),
//     createData("수", 6),
//     createData("목", 10),
//     createData("금", 20),
//     createData("토", 5),
//     createData("일", 5),
// ];

export default function Chart() {
    return (
        <>
            {/* <DailyChart /> */}
            <WeeklyChart />
        </>
    );
}

const now = new Date();
const month = now.getMonth();
const day = now.getDate();

function DailyChart() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { productCount } = useSelector((state) => state.products.daily);

    useEffect(() => {
        dispatch(fetchDailyProducts());
        console.log("create 됨");
    }, [dispatch]);
    let data = [createData(`${month + 1}.${day}`, productCount)];
    console.log(data);
    // if (Array.isArray(productCount)) {
    //     data = productCount
    //         .slice(-7)
    //         .map((count, index) => createData(`Day ${index + 1}`, count));
    // }

    return (
        <React.Fragment>
            <h2>일별 상품 판매량</h2>
            <ResponsiveContainer>
                <LineChart
                    data={data}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                >
                    <XAxis
                        dataKey="time"
                        stroke={theme.palette.text.secondary}
                        style={theme.typography.body2}
                    />
                    <YAxis
                        stroke={theme.palette.text.secondary}
                        style={theme.typography.body2}
                    >
                        <Label
                            angle={270}
                            position="left"
                            style={{
                                textAnchor: "middle",
                                fill: theme.palette.text.primary,
                                ...theme.typography.body1,
                            }}
                        >
                            SalesAmount (/EA)
                        </Label>
                    </YAxis>
                    <Line
                        isAnimationActive={false}
                        type="monotone"
                        dataKey="amount"
                        stroke={theme.palette.primary.main}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}

function WeeklyChart() {
    // http://localhost:8080/api/sales/date/2023-04-20
    //let apiUrl = `/api/sales/date/${today.toISOString().slice(0, 10)}`;
    const theme = useTheme();
    //let salesData = [createData(`${month + 1}.${day}`, productCount)];
    let data = [];

    const [salesDates, setSalesDates] = useState([]);
    const [salesCounts, setSalesCounts] = useState([]);

    useEffect(() => {
        axios.get("/api/sales/date").then((response) => {
            const sortedData = response.data.sort((a, b) => {
                return new Date(a.date) - new Date(b.date);
            });
            setSalesCounts(sortedData.map((item) => item.count));
            setSalesDates(sortedData.map((item) => item.date));
        });
    }, []);

    data = salesDates.map((date, index) => {
        return createData(date, salesCounts[index]);
    });

    return (
        <React.Fragment>
            <h2>주간 상품 판매량</h2>
            <ResponsiveContainer>
                <LineChart
                    data={data}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                >
                    <XAxis
                        dataKey="time"
                        stroke={theme.palette.text.secondary}
                        style={theme.typography.body2}
                    />
                    <YAxis
                        stroke={theme.palette.text.secondary}
                        style={theme.typography.body2}
                    >
                        <Label
                            angle={270}
                            position="left"
                            style={{
                                textAnchor: "middle",
                                fill: theme.palette.text.primary,
                                ...theme.typography.body1,
                            }}
                        >
                            Sales ($)
                        </Label>
                    </YAxis>
                    <Line
                        isAnimationActive={false}
                        type="monotone"
                        dataKey="amount"
                        stroke={theme.palette.primary.main}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}

function YearlyChart() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { productCount } = useSelector((state) => state.products.weekly);

    let data = [];

    useEffect(() => {
        dispatch(fetchDailyProducts());
        console.log(productCount);
    }, [dispatch]);
    return (
        <React.Fragment>
            <h2>연간 상품 판매량</h2>
            <ResponsiveContainer>
                <LineChart
                    data={data}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                >
                    <XAxis
                        dataKey="time"
                        stroke={theme.palette.text.secondary}
                        style={theme.typography.body2}
                    />
                    <YAxis
                        stroke={theme.palette.text.secondary}
                        style={theme.typography.body2}
                    >
                        <Label
                            angle={270}
                            position="left"
                            style={{
                                textAnchor: "middle",
                                fill: theme.palette.text.primary,
                                ...theme.typography.body1,
                            }}
                        >
                            Sales ($)
                        </Label>
                    </YAxis>
                    <Line
                        isAnimationActive={false}
                        type="monotone"
                        dataKey="amount"
                        stroke={theme.palette.primary.main}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}

function MonthlyChart() {}