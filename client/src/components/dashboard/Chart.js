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
    Tooltip,
} from "recharts";
import axios from "axios";

// Generate Sales Data
function createData(date, count) {
    return { time: date.slice(5, 10), amount: count };
}

export default function Chart(props) {
    return (
        <>
            {props.byDate === "Daily" ? (
                <WeeklyChart />
            ) : props.byDate === "Weekly" ? (
                <WeeklyChart />
            ) : (
                <MonthlyChart />
            )}
        </>
    );
}

function TimeChart(props) {
    const theme = useTheme();
    return (
        <React.Fragment>
            <h2>{props.title}</h2>
            <ResponsiveContainer>
                <LineChart
                    data={props.data}
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
                            Amount (/EA)
                        </Label>
                    </YAxis>
                    <Line
                        isAnimationActive={false}
                        type="monotone"
                        dataKey="amount"
                        stroke={theme.palette.primary.main}
                        dot={true}
                    />
                    <Tooltip
                        formatter={(value, name, props) => [value, "Sales"]}
                        labelFormatter={(label) => label}
                    />
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}

function useChartData(dateRange, storageKey, chartTitle) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const today = new Date();
        const startDate = new Date(today);
        startDate.setDate(startDate.getDate() - dateRange); // 날짜 범위 계산

        const cacheData = JSON.parse(localStorage.getItem(storageKey));
        if (cacheData) {
            setData(cacheData);
            return;
        }

        axios.get("/api/sales/date").then((response) => {
            const sortedData = response.data
                .filter(
                    (item) =>
                        new Date(item.date) >= startDate &&
                        new Date(item.date) <= today
                ) // 주어진 날짜 범위 내의 데이터만 선택
                .sort((a, b) => new Date(a.date) - new Date(b.date));

            const salesData = [];
            if (dateRange === 6) {
                // 주간 차트의 경우, 누락된 날짜가 있는지 확인
                const missingDates = getMissingDates(
                    sortedData,
                    startDate,
                    today
                );
                const completeData = [...sortedData, ...missingDates].sort(
                    (a, b) => new Date(a.date) - new Date(b.date)
                );
                salesData = completeData.map((item) => ({
                    time: item.date,
                    amount: item.count,
                }));
            } else if (dateRange === 27) {
                // 월간 차트의 경우, 7일 단위로 그룹화하여 데이터 생성
                let groupStartDate = new Date(startDate);
                while (groupStartDate <= today) {
                    const groupEndDate = new Date(groupStartDate);
                    groupEndDate.setDate(groupEndDate.getDate() + 6); // 7일 후 날짜 계산
                    const groupData = sortedData.filter(
                        (item) =>
                            new Date(item.date) >= groupStartDate &&
                            new Date(item.date) <= groupEndDate
                    ); // 그룹에 해당하는 데이터만 선택
                    const salesCount = groupData.reduce(
                        (sum, item) => sum + item.count,
                        0
                    );
                    salesData.push({
                        time: groupStartDate.toISOString().slice(0, 10),
                        endDate: groupEndDate.toISOString().slice(0, 10),
                        amount: salesCount,
                    });
                    groupStartDate.setDate(groupStartDate.getDate() + 7); // 7일 후 날짜 계산
                }
            }

            localStorage.setItem(storageKey, JSON.stringify(salesData));
            setData(salesData);
        });
    }, []);

    return <TimeChart data={data} title={chartTitle} />;
}

function WeeklyChart() {
    return useChartData(6, "weeklySalesData", "최근 7일간 상품 판매량");
}

function MonthlyChart() {
    return useChartData(27, "monthlySalesData", "최근 28일간 상품 판매량");
}

function AllTimeChart() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("/api/sales/date").then((response) => {
            const sortedData = response.data.sort(
                (a, b) => new Date(a.date) - new Date(b.date)
            );
            const newData = sortedData.map((item) =>
                createData(item.date, item.count)
            );
            setData(newData);
        });
    }, []);

    return <TimeChart data={data} title="모든 기간 상품 판매량" />;
}

function getMissingDates(data, startDate, endDate) {
    const missingDates = [];
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        const currentDateStr = currentDate.toISOString().slice(0, 10);
        if (!data.some((item) => item.date === currentDateStr)) {
            missingDates.push({ date: currentDateStr, count: 0 });
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return missingDates;
}