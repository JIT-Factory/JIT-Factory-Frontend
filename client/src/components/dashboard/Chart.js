import * as React from "react";
import { useEffect } from "react";
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
            <DailyChart />
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

    // if (Array.isArray(productCount)) {
    //     data = productCount
    //         .slice(-7)
    //         .map((count, index) => createData(`Day ${index + 1}`, count));
    // }

    return (
        <React.Fragment>
            <h2>일별 상품 배송량</h2>
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

function WeeklyChart() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { productCount } = useSelector((state) => state.products.weekly);

    useEffect(() => {
        dispatch(fetchWeeklyProducts());
    }, [dispatch]);

    if (!Array.isArray(productCount)) {
        console.log(productCount);
        return null; // productCount가 배열이 아니면 렌더링하지 않음
    }

    let data = [];

    if (productCount) {
        // 최근 7일의 데이터만 가져오기 위해 slice() 메소드를 사용함
        const lastSevenDays = productCount.slice(-7);
        data = lastSevenDays
            .filter((count) => count !== null)
            .map((count, index) => createData(`Day ${index + 1}`, count));
    }

    return (
        <React.Fragment>
            <h2>주간 상품 배송량</h2>
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
            <h2>연간 상품 배송량</h2>
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