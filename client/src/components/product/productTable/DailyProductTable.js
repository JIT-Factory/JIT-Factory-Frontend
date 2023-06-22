import React, { useEffect, useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";

function DailyProductTable() {
  const factoryName = localStorage.getItem("factoryName");
  const [selectTime, setSelectTime] = useState(null);
  const [rows, setRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(1);

  const handleChange = (date) => {
    const formattedDate = date.format("YYYY-MM-DD");
    setSelectTime(formattedDate);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const displayedProducts = rows.slice((currentPage - 1) * 9, currentPage * 9);

  useEffect(() => {
    if (selectTime === null) {
      axios.get(`/api/product/${factoryName}/2023-06-22`).then((response) => {
        const formattedRows = response.data.map((row, index) => {
          const formattedTime = new Date(row.createTime).toLocaleString([], {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });

          return {
            ...row,
            createTime: formattedTime,
          };
        });

        setRows(formattedRows);
        setCount(Math.ceil(formattedRows.length / 10));
      });
    } else {
      axios
        .get(`/api/product/${factoryName}/${selectTime}`)
        .then((response) => {
          const formattedRows = response.data.map((row, index) => {
            const formattedTime = new Date(row.createTime).toLocaleString([], {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            });

            return {
              ...row,
              createTime: formattedTime,
            };
          });

          setRows(formattedRows);
          setCount(Math.ceil(formattedRows.length / 10));
        });
    }
  }, [selectTime]);
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            label="Select a date"
            value={selectTime}
            onChange={handleChange}
          />
        </DemoContainer>
      </LocalizationProvider>
      <br />
      <TableContainer component={Paper}>
        <Table
          stickyHeader
          sx={{ minWidth: 700 }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Index</StyledTableCell>
              <StyledTableCell align="right">Product Name</StyledTableCell>
              <StyledTableCell align="right">Product Price</StyledTableCell>
              <StyledTableCell align="right">Time Produced</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedProducts.map((row, index) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {(currentPage - 1) * 10 + index + 1}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.productName}
                </StyledTableCell>
                <StyledTableCell align="right">{row.sales}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.createTime}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2} alignItems={"center"}>
        <Pagination
          count={count}
          size="large"
          page={currentPage}
          onChange={handlePageChange}
        />
      </Stack>
    </>
  );
}

export default DailyProductTable;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
