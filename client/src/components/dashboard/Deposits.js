import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import {
    fetchDailyProducts,
    fetchWeeklyProducts,
    fetchMonthlyProducts,
} from "../redux/productsSlice";

function preventDefault(event) {
    event.preventDefault();
}

function SalesSection({ title, salesSum, salesDate }) {
    return (
        <div>
            <Fragment>
                <h2>{title}</h2>
                <br />
                <br />
                <br />
                <Typography component="p" variant="h4">
                    {salesSum}원
                </Typography>
                <br />
                <Typography color="text.secondary" sx={{ flex: 1 }}>
                    {salesDate}
                </Typography>
                <br />
                <div style={{ verticalAlign: "bottom", paddingTop: "5vmax" }}>
                    <Link
                        color="primary"
                        href="/sales"
                        onClick={preventDefault}
                    >
                        전체 매출보기
                    </Link>
                </div>
            </Fragment>
        </div>
    );
}

function DailySales() {
    const dispatch = useDispatch();
    const { salesSum, salesDate } = useSelector(
        (state) => state.products.daily
    );

    useEffect(() => {
        dispatch(fetchDailyProducts());
    }, [dispatch]);

    return (
        <SalesSection
            title="일일 매출"
            salesSum={salesSum}
            salesDate={salesDate}
        />
    );
}

function WeeklySales() {
    const dispatch = useDispatch();
    const { salesSum, salesDate } = useSelector(
        (state) => state.products.weekly
    );

    useEffect(() => {
        dispatch(fetchWeeklyProducts());
    }, [dispatch]);

    return (
        <SalesSection
            title="주간 매출"
            salesSum={salesSum}
            salesDate={salesDate}
        />
    );
}

function MonthlySales() {
    const dispatch = useDispatch();
    const { salesSum, salesDate } = useSelector(
        (state) => state.products.monthly
    );

    useEffect(() => {
        dispatch(fetchMonthlyProducts());
    }, [dispatch]);

    return (
        <SalesSection
            title="월간 매출"
            salesSum={salesSum}
            salesDate={salesDate}
        />
    );
}

export default function Deposits(props) {
    return (
        <div>
            {props.byDate == "Daily" ? (
                <DailySales />
            ) : props.byDate == "Weekly" ? (
                <WeeklySales />
            ) : (
                <MonthlySales />
            )}
        </div>
    );
}
