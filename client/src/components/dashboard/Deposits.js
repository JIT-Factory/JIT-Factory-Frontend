import { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import axios from "axios";

function SalesSection({ title, salesSum, salesDate }) {
    return (
        <div>
            <Fragment>
                <h2>{title}</h2>
                <br />
                <br />
                <br />
                <Typography component="p" variant="h4">
                    {salesSum || 0}원
                </Typography>
                <br />
                <Typography color="text.secondary" sx={{ flex: 1 }}>
                    {salesDate}
                </Typography>
                <br />
                <div style={{ verticalAlign: "bottom", paddingTop: "5vmax" }}>
                    <Link color="primary" href="/sales" onClick={() => {}}>
                        전체 매출보기
                    </Link>
                </div>
            </Fragment>
        </div>
    );
}

function DailySales() {
    const now = new Date();
    const [dailySales, setDailySales] = useState(0);
    //const factoryName = useSelector((state) => state.auth.factoryName);
    const factoryName = localStorage.getItem("factoryName");
    useEffect(() => {
        axios
            .get(
                `api/sales/day/${factoryName}/${now.getFullYear()}-${(
                    now.getMonth() + 1
                )
                    .toString()
                    .padStart(2, "0")}-${now
                    .getDate()
                    .toString()
                    .padStart(2, "0")}`
            )
            .then((response) => {
                if (response.data[0]) {
                    setDailySales(response.data[0].sales);
                }
            });
    }, []);

    return <SalesSection title="금일 매출" salesSum={dailySales} />;
}

function WeeklySales() {
    const [weeklySales, setWeeklySales] = useState(0);
    //const factoryName = useSelector((state) => state.auth.factoryName);
    const factoryName = localStorage.getItem("factoryName");
    useEffect(() => {
        axios.get(`api/sales/week/${factoryName}`).then((response) => {
            const salesSum = response.data.reduce(
                (accumulator, currentValue) => {
                    return accumulator + currentValue.sales;
                },
                0
            );
            setWeeklySales(salesSum);
        });
    }, []);

    return <SalesSection title="주간 매출" salesSum={weeklySales} />;
}

function MonthlySales() {
    const [MonthlySales, setMonthlySales] = useState(0);
    //const factoryName = useSelector((state) => state.auth.factoryName);
    const factoryName = localStorage.getItem("factoryName");
    useEffect(() => {
        axios.get(`api/sales/month/${factoryName}`).then((response) => {
            const salesSum = response.data.reduce(
                (accumulator, currentValue) => {
                    return accumulator + currentValue.sales;
                },
                0
            );
            setMonthlySales(salesSum);
        });
    }, []);

    return <SalesSection title="월간 매출" salesSum={MonthlySales} />;
}

export default function Deposits(props) {
    return (
        <div>
            {props.byDate === "Daily" ? (
                <DailySales />
            ) : props.byDate === "Weekly" ? (
                <WeeklySales />
            ) : (
                <MonthlySales />
            )}
        </div>
    );
}
