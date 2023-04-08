import { React, useEffect, useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router";
import axios from "axios";
import Card from "react-bootstrap/Card";
import AppBar from "@mui/material/AppBar";
import Menu from "@mui/material/Menu";

import Avatar from "@mui/material/Avatar";

import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Nav } from "react-bootstrap";

const mdTheme = createTheme();

const settings = ["Logout"];

function DashboardContent() {
  const navigate = useNavigate();
  const [hasRights, sethasRights] = useState(false);
  const [dashBoardData, setDashBoardData] = useState("");
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  useEffect(() => {
    const getDashBoardData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/crm/dashboard");

        setDashBoardData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getDashBoardData();
  }, []);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters className="nav-bar">
              <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
              <h4>User Dashboard</h4>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="User" src="/static/images/avatar/2.jpg" />
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
              <Card.Title className="user-card">
                <Nav.Link
                  onClick={() => navigate("/manager/service-requests")}
                  disabled={!hasRights}
                >
                  Service Requests
                </Nav.Link>{" "}
                {dashBoardData ? (
                  <div> Count:{dashBoardData.serviceRequestCount}</div>
                ) : (
                  "Loading ..."
                )}
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
              <Card.Title className="user-card">
                <Nav.Link
                  onClick={() => navigate("/manager/leads")}
                  disabled={!hasRights}
                >
                  Leads
                </Nav.Link>
                {dashBoardData ? (
                  <div> Count:{dashBoardData.leadCount}</div>
                ) : (
                  "Loading ..."
                )}
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
              <Card.Title className="user-card">
                <Nav.Link
                  onClick={() => navigate("/manager/contacts")}
                  disabled={!hasRights}
                >
                  Contacts
                </Nav.Link>
                {dashBoardData ? (
                  <div> Count:{dashBoardData.contactCount}</div>
                ) : (
                  "Loading ..."
                )}
              </Card.Title>
            </Card.Body>
          </Card>
        </div>
      </Box>
    </ThemeProvider>
  );
}

export default function UserDashboard() {
  return <DashboardContent />;
}
