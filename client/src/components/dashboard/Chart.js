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
            {props.byDate == "Daily" ? (
                <WeeklyChart />
            ) : props.byDate == "Weekly" ? (
                <WeeklyChart />
            ) : (
                <MonthlyChart />
            )}
        </>
    );
}

function WeeklyChart() {
    const theme = useTheme();
    const [salesDates, setSalesDates] = useState([]);
    const [salesCounts, setSalesCounts] = useState([]);

    useEffect(() => {
        const today = new Date();
        const startDate = new Date(today);
        startDate.setDate(startDate.getDate() - 6); // 최근 7일간의 날짜 범위 계산

        axios.get("/api/sales/date").then((response) => {
            const sortedData = response.data
                .filter(
                    (item) =>
                        new Date(item.date) >= startDate &&
                        new Date(item.date) <= today
                ) // 최근 7일간의 데이터만 선택
                .sort((a, b) => new Date(a.date) - new Date(b.date));

            const missingDates = getMissingDates(sortedData, startDate, today);
            const completeData = [...sortedData, ...missingDates].sort(
                (a, b) => new Date(a.date) - new Date(b.date)
            );

            // 최근 7일간의 판매량 데이터와 날짜 데이터 분리하여 저장
            setSalesCounts(completeData.map((item) => item.count));
            setSalesDates(completeData.map((item) => item.date));
        });
    }, []);

    // 최근 7일간의 판매량 데이터와 날짜 데이터를 이용하여 차트 데이터 생성
    const data = salesDates.map((date, index) => {
        return createData(date, salesCounts[index] || 0); // 최근 7일간의 데이터가 없다면 0으로 표시
    });

    return (
        <React.Fragment>
            <h2>최근 7일간 상품 판매량</h2>
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

function MonthlyChart() {
    const theme = useTheme();
    const [salesData, setSalesData] = useState([]);

    useEffect(() => {
        const today = new Date();
        const startDate = new Date(today);
        startDate.setDate(startDate.getDate() - 27); // 최근 28일간의 날짜 범위 계산

        axios.get("/api/sales/date").then((response) => {
            const sortedData = response.data
                .filter(
                    (item) =>
                        new Date(item.date) >= startDate &&
                        new Date(item.date) <= today
                ) // 최근 28일간의 데이터만 선택
                .sort((a, b) => new Date(a.date) - new Date(b.date));

            const salesData = [];
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
                    startDate: groupStartDate.toISOString().slice(0, 10),
                    endDate: groupEndDate.toISOString().slice(0, 10),
                    count: salesCount,
                });
                groupStartDate.setDate(groupStartDate.getDate() + 7); // 7일 후 날짜 계산
            }

            // 7일 단위로 묶인 판매량 데이터 저장
            setSalesData(salesData);
        });
    }, []);

    return (
        <React.Fragment>
            <h2>최근 한달간 상품 판매량</h2>
            <ResponsiveContainer>
                <LineChart
                    data={salesData}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                >
                    <XAxis
                        dataKey="startDate" // salesData의 키 값과 일치해야 함
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
                        dataKey="count" // salesData의 키 값과 일치해야 함
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

function AllTimeChart() {
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
    console.log(salesDates, salesCounts);
    data = salesDates.map((date, index) => {
        return createData(date, salesCounts[index]);
    });

    return (
        <React.Fragment>
            <h2>모든기간 상품 판매량</h2>
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
                            Amount (/EA)
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