import * as React from "react";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";

// Generate user Data
function createData(id, userNumber, role, name, email, factoryName) {
    return { id, userNumber, role, name, email, factoryName };
}

export default function MemberDetail() {
    const [rows, setRows] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        axios
            .get("/api/admin/users", {
                headers: {
                    Authorization: `${token}`,
                },
            })
            .then((response) => {
                const data = response.data
                    .map((user) =>
                        createData(
                            user.id,
                            user.id,
                            user.role,
                            user.name,
                            user.email,
                            user.factoryName
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
            <h2 style={{ paddingBottom: "1vmax" }}>JIT Factory 사원 현황</h2>
            <Table size="medium">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <h2>사원번호</h2>
                        </TableCell>
                        <TableCell>
                            <h2>직책</h2>
                        </TableCell>
                        <TableCell>
                            <h2>이름</h2>
                        </TableCell>
                        <TableCell>
                            <h2>이메일</h2>
                        </TableCell>
                        <TableCell>
                            <h2>공장</h2>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.userNumber}</TableCell>
                            <TableCell>{row.role}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>{row.factoryName}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}