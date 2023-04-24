import * as React from "react";
import { useEffect, useState } from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";

function preventDefault(event) {
    event.preventDefault();
}

// Generate user Data
function createData(id, date, category, productId, reason) {
    const formattedDate = new Date(date).toISOString().slice(0, 10);
    return { id, date: formattedDate, category, productId, reason };
}

function fetchDefectiveProducts() {
    return axios
        .get("/api/product/status/fail")
        .then((response) => response.data);
}

function useDefectiveProductData() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        fetchDefectiveProducts()
            .then((data) => {
                const formattedData = data
                    .map((product) =>
                        createData(
                            product.id,
                            product.createTime,
                            product.productName,
                            product.id,
                            product.reason
                        )
                    )
                    .sort((a, b) => {
                        if (a.role === "ADMIN" && b.role !== "ADMIN") {
                            return -1;
                        } else if (a.role !== "ADMIN" && b.role === "ADMIN") {
                            return 1;
                        } else {
                            return 0;
                        }
                    });
                setRows(formattedData);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return rows;
}

function DefectiveTable(props) {
    return (
        <React.Fragment>
            <h2>{props.title}</h2>
            <Table size="medium">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <h2>날짜</h2>
                        </TableCell>
                        <TableCell>
                            <h2>카테고리</h2>
                        </TableCell>
                        <TableCell>
                            <h2>상품 ID</h2>
                        </TableCell>
                        <TableCell>
                            <h2>내용</h2>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.date}</TableCell>
                            <TableCell>{row.category}</TableCell>
                            <TableCell>{row.productId}</TableCell>
                            <TableCell>{row.reason}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {props.title === "최근 불량품 로그" ? (
                <Link color="primary" href="/defective" sx={{ mt: 3 }}>
                    불량품 내역 더보기
                </Link>
            ) : (
                void 0
            )}
        </React.Fragment>
    );
}

export function SummaryDefective() {
    const rows = useDefectiveProductData().slice(-5);
    return <DefectiveTable rows={rows} title={"최근 불량품 로그"} />;
}

export default function DefectiveDetail() {
    const rows = useDefectiveProductData();

    return <DefectiveTable rows={rows} title={"불량품 로그"} />;
}