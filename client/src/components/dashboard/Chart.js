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

import { useSelector } from "react-redux";

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
// Generate Sales Data
function createData(date, count) {
    return { time: date.slice(5, 10), amount: count };
}

export function WeeklyChart() {
    const [salesDates, setSalesDates] = useState([]);
    const [salesCounts, setSalesCounts] = useState([]);
    const factoryName = localStorage.getItem("factoryName");
    //const factoryName = useSelector((state) => state.auth.factoryName);

    useEffect(() => {
        const today = new Date();
        today.setHours(23, 59, 59); // 시간 정보를 0시 0분 0초로 설정
        const startDate = new Date(today);
        startDate.setDate(startDate.getDate() - 6); // 최근 7일간의 날짜 범위 계산

        axios.get(`/api/sales/name/${factoryName}`).then((response) => {
            // 4월 25일 데이터가 들어있다.

            // 여기서부터 문제 오늘날을 포함한 데이터가 안들어가있음
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

    return <TimeChart data={data} title={"최근 7일간 상품 판매량"} />;
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

export function MonthlyChart() {
    const [data, setData] = useState([]);
    //const factoryName = useSelector((state) => state.auth.factoryName);
    const factoryName = localStorage.getItem("factoryName");
    useEffect(() => {
        const today = new Date();
        today.setHours(23, 59, 59); // 시간 정보를 0시 0분 0초로 설정
        const time = new Date(today);
        time.setDate(time.getDate() - 27); // 최근 28일간의 날짜 범위 계산

        axios.get(`/api/sales/name/${factoryName}`).then((response) => {
            const sortedData = response.data
                .filter(
                    (item) =>
                        new Date(item.date) >= time &&
                        new Date(item.date) <= today
                ) // 최근 28일간의 데이터만 선택
                .sort((a, b) => new Date(a.date) - new Date(b.date));

            const salesData = [];
            let groupStartDate = new Date(time);
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

            // 7일 단위로 묶인 판매량 데이터 저장
            setData(salesData);
        });
    }, []);

    return <TimeChart data={data} title={"최근 28일간 상품 판매량"} />;
}

export function AllTimeChart() {
    let data = [];
    const [salesDates, setSalesDates] = useState([]);
    const [salesCounts, setSalesCounts] = useState([]);
    //const factoryName = useSelector((state) => state.auth.factoryName);
    const factoryName = localStorage.getItem("factoryName");
    useEffect(() => {
        axios.get(`/api/sales/name/${factoryName}`).then((response) => {
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

    return <TimeChart data={data} title={"모든 기간 상품 판매량"} />;
}

