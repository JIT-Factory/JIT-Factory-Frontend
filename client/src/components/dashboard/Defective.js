import * as React from "react";
import { useState, useEffect } from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";

// Generate Order Data
function createData(id, date, category, productId, reason) {
    const formattedDate = new Date(date).toISOString().slice(0, 10);
    return { id, date: formattedDate, category, productId, reason };
}

function preventDefault(event) {
    event.preventDefault();
}

export default function Orders() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        axios
            .get("/api/product/status/fail")
            .then((response) => {
                const data = response.data
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
                    })
                    .slice(-5); // 최근 5개 데이터만 남깁니다.
                setRows(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    return (
        <React.Fragment>
            <h2>최근 불량품 로그</h2>
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
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.date}</TableCell>
                            <TableCell>{row.category}</TableCell>
                            <TableCell>{row.productId}</TableCell>
                            <TableCell>{row.reason}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Link
                color="primary"
                href="/defective"
                onClick={preventDefault}
                sx={{ mt: 3 }}
            >
                불량품 내역 더보기
            </Link>
        </React.Fragment>
    );
}
