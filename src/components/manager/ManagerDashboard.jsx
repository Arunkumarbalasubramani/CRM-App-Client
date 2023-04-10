import { React, useEffect, useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Card from "react-bootstrap/Card";
import AppBar from "@mui/material/AppBar";
import Menu from "@mui/material/Menu";

import Avatar from "@mui/material/Avatar";

import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Nav } from "react-bootstrap";
import Paper from "@mui/material/Paper";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";

import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import TableHead from "@mui/material/TableHead";
import { tableCellClasses } from "@mui/material/TableCell";

const mdTheme = createTheme();
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

const settings = ["Logout"];

function DashboardContent() {
  const navigate = useNavigate();
  const { role } = useParams();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [roles, setRoles] = useState({});

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(
          "https://crm-server-akb.onrender.com/users"
        );
        const filteredRows = response.data.filter(
          (user) => user.role !== "manager" && user.role !== "admin"
        );
        setRows(filteredRows);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, [roles]);

  const updateUserRoles = async (userId, updatedRoles) => {
    const request = { userId: userId, updatedRoles: updatedRoles };
    setRoles(request);
    await axios.post(
      "https://crm-server-akb.onrender.com/users/change-roles",
      request
    );
  };
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
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
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters className="nav-bar">
              <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
              <h4> {role.toUpperCase()} DASHBOARD</h4>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Manager" src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <h1>Welcome Back !!!</h1>
        <div className="dashboard-cards-container">
          <Card
            bg="primary"
            key="dark"
            text="light"
            style={{ width: "18rem" }}
            className="mb-2 cards "
          >
            <Card.Body>
              <Card.Title>
                <Nav.Link onClick={() => navigate("/manager/service-requests")}>
                  Service Requests
                </Nav.Link>{" "}
              </Card.Title>
            </Card.Body>
          </Card>
          <Card
            bg="dark"
            key="dark"
            text="light"
            style={{ width: "18rem" }}
            className="mb-2 cards"
          >
            <Card.Body>
              <Card.Title>
                <Nav.Link onClick={() => navigate("/manager/leads")}>
                  Leads
                </Nav.Link>
              </Card.Title>
            </Card.Body>
          </Card>
          <Card
            bg="success"
            key="dark"
            text="light"
            style={{ width: "18rem" }}
            className="mb-2 cards"
          >
            <Card.Body>
              <Card.Title>
                <Nav.Link onClick={() => navigate("/manager/contacts")}>
                  Contacts
                </Nav.Link>
              </Card.Title>
            </Card.Body>
          </Card>
        </div>
      </Box>
      {role === "manager" ? (
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
                        First Name
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        Last Name
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        Email Name
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        Existing Role
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        Change Role
                      </StyledTableCell>
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
                      <TableRow key={row.name}>
                        <TableCell
                          component="th"
                          scope="row"
                          style={{ width: 160 }}
                          align="center"
                        >
                          {row.fname}
                        </TableCell>
                        <TableCell style={{ width: 160 }} align="center">
                          {row.lname}
                        </TableCell>
                        <TableCell style={{ width: 160 }} align="center">
                          {row.email}
                        </TableCell>
                        <TableCell style={{ width: 160 }} align="center">
                          {row.role}
                        </TableCell>
                        <TableCell style={{ width: 160 }} align="center">
                          <select
                            id="rights"
                            onChange={(event) =>
                              updateUserRoles(row._id, event.target.value)
                            }
                            value={row.rights}
                          >
                            <option value="none">None</option>
                            <option value="creator">Creator</option>
                            <option value="editor">Editor</option>
                          </select>
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
      ) : null}
    </ThemeProvider>
  );
}

export default function ManagerDashboard() {
  return <DashboardContent />;
}
