import * as React from "react";
import { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Generate Order Data
function createData(id, role, name, userNumber, email) {
    return { id, role, name, userNumber, email };
}

function preventDefault(event) {
    event.preventDefault();
}

let rows = [];
export default function MemberDetail() {
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);
    useEffect(() => {
        axios
            .get("/api/admin/users", {
                headers: {
                    Authorization: `${token}`,
                },
            })
            .catch((error) => {
                console.error(error);
                alert("관리자 전용 페이지입니다.");
                navigate("/");
            })
            .then((response) => {
                rows = response.data
                    .map((user) =>
                        createData(
                            user.id,
                            user.role,
                            user.name,
                            user.id,
                            user.email
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
            });
    }, []);

    return (
        <React.Fragment>
            <h2 style={{ paddingBottom: "1vmax" }}>JIT Factory 사원 현황</h2>
            <Table size="medium">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <h2>직책</h2>
                        </TableCell>
                        <TableCell>
                            <h2>이름</h2>
                        </TableCell>
                        <TableCell>
                            <h2>사원번호</h2>
                        </TableCell>
                        <TableCell>
                            <h2>이메일</h2>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.role}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.userNumber}</TableCell>
                            <TableCell>{row.email}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}
