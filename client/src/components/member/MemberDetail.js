import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

// Generate Order Data
function createData(id, role, name, userNumber, hiredate) {
    return { id, role, name, userNumber, hiredate };
}

const rows = [
    createData(0, "ADMIN", "아무개", "S1000", "2023.04.13"),
    createData(1, "ADMIN", "홍길동", "S1101", "2023.04.13"),
    createData(2, "GENERAL", "철수", "S1201", "2023.04.13"),
    createData(3, "GENERAL", "영희", "S1202", "2023.04.13"),
    createData(4, "GENERAL", "짱구", "S1203", "2023.04.13"),
];

function preventDefault(event) {
    event.preventDefault();
}

export default function MemberDetail() {
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
                            <h2>입사일</h2>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.role}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.userNumber}</TableCell>
                            <TableCell>{row.hiredate}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}
