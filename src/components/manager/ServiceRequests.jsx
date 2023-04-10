import { React, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router";
import axios from "axios";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import { TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import TableHead from "@mui/material/TableHead";
import { tableCellClasses } from "@mui/material/TableCell";
import { Nav } from "react-bootstrap";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
const ServiceRequests = () => {
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const getServiceRequest = async () => {
      const response = await axios.get(
        "https://crm-server-akb.onrender.com/crm/service-requests"
      );
      setRows(response.data);
    };
    getServiceRequest();
  }, []);
  useEffect(() => {
    const getsearchedData = async () => {
      const response = await axios.get(
        "https://crm-server-akb.onrender.com/crm/service-requests"
      );
      const newRows = response.data.filter((row) =>
        row.requestId.toLowerCase().includes(searchTerm)
      );
      setRows(newRows);
    };
    getsearchedData();
  }, [searchTerm]);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  return (
    <div className="service-requests">
      <div className="header-container">
        <h3>Service Requests</h3>
      </div>
      <div className="body-container">
        <div className="data-table">
          <div className="search-div">
            {" "}
            <TextField
              id="filled-search"
              label="Search "
              type="search"
              variant="filled"
              onChange={(event) =>
                setSearchTerm(event.target.value.toLowerCase())
              }
            />
            <div className="add-user">
              <Tooltip title="Add Request" arrow placement="right-start">
                <Button
                  variant="contained"
                  color="success"
                  endIcon={<PersonAddIcon />}
                  onClick={() => {
                    navigate("/:role/servicerequest/add");
                  }}
                >
                  Create New request
                </Button>
              </Tooltip>
            </div>
          </div>
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <TableContainer component={Paper}>
                  <Table
                    sx={{ minWidth: 500 }}
                    aria-label="custom pagination table"
                  >
                    {" "}
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="center">
                          SeviceId
                        </StyledTableCell>
                        <StyledTableCell align="center">Title</StyledTableCell>
                        <StyledTableCell align="center">
                          Customer
                        </StyledTableCell>

                        <StyledTableCell align="center">Status</StyledTableCell>
                        <StyledTableCell align="center">
                          Assigned To
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Piority
                        </StyledTableCell>
                        <StyledTableCell align="center"></StyledTableCell>
                        <StyledTableCell align="center"></StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(rowsPerPage > 0
                        ? rows.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : rows
                      ).map((row) => (
                        <TableRow key={row.requestId}>
                          <TableCell
                            component="th"
                            scope="row"
                            style={{ width: 160 }}
                            align="center"
                          >
                            <Tooltip title="See More" arrow placement="bottom">
                              <Nav.Link
                                className="link-to-seeMore"
                                onClick={() =>
                                  navigate(`/service-requests/${row.requestId}`)
                                }
                              >
                                {row.requestId}
                              </Nav.Link>
                            </Tooltip>
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            style={{ width: 160 }}
                            align="center"
                          >
                            {row.title}
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="center">
                            {row.customer}
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="center">
                            {row.status.toUpperCase()}
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="center">
                            {row.assignedTo}
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="center">
                            {row.priority}
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="center">
                            <Tooltip title="Edit" arrow placement="right-start">
                              <IconButton
                                aria-label="edit"
                                size="large"
                                onClick={() =>
                                  navigate(
                                    `/user/servicerequest/${row.requestId}/edit`
                                  )
                                }
                              >
                                <EditIcon fontSize="inherit" />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="center">
                            <Tooltip
                              title="Delete"
                              arrow
                              placement="right-start"
                            >
                              <IconButton aria-label="delete" size="large">
                                <DeleteIcon
                                  fontSize="inherit"
                                  onClick={() => {
                                    navigate(
                                      `/user/ServiceRequest/${row.requestId}/delete`
                                    );
                                  }}
                                />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}

                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                    <TableFooter className=" table-footer">
                      <TableRow>
                        <TablePagination
                          rowsPerPageOptions={[
                            5,
                            10,
                            15,
                            { label: "All", value: -1 },
                          ]}
                          count={rows.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          SelectProps={{
                            inputProps: {
                              "aria-label": "rows per page",
                            },
                            native: true,
                          }}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                          ActionsComponent={TablePaginationActions}
                        />
                      </TableRow>
                    </TableFooter>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Container>
        </div>
        <div className="chart-data"></div>
      </div>
    </div>
  );
};

export default ServiceRequests;
