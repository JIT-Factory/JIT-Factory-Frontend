import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
    return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
    createData(0, "2023년 1월 1일", "작물", "1", "곰팡이"),
    createData(1, "2023년 1월 1일", "작물", "2", "유통기한"),
    createData(2, "2023년 1월 1일", "작물", "3", "잘못된 상품 이름"),
    createData(3, "2023년 1월 1일", "작물", "4", "등"),
    createData(4, "2023년 1월 1일", "작물", "5", "등"),
];

function preventDefault(event) {
    event.preventDefault();
}

export default function Orders() {
    return (
        <React.Fragment>
            <Title>불량품</Title>
            <Table size="small">
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
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.shipTo}</TableCell>
                            <TableCell>{row.paymentMethod}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Link
                color="primary"
                href="#defective"
                onClick={preventDefault}
                sx={{ mt: 3 }}
            >
                불량품 내역 더보기
            </Link>
        </React.Fragment>
    );
}
