import * as React from "react";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";

// Generate user Data
function createData(id, date, category, productId, reason) {
  const formattedDate = new Date(date).toISOString().slice(0, 10);
  return { id, date: formattedDate, category, productId, reason };
}

export default function DefectiveDetail() {
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
                          product.reason,
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
                setRows(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <React.Fragment>
            <h2 style={{ paddingBottom: "1vmax" }}>JIT Factory 불량품 현황</h2>
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
        </React.Fragment>
    );
}