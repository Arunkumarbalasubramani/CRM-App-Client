import { React, useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const theme = createTheme();
const DeleteUser = () => {
  const navigate = useNavigate();
  const { useremail } = useParams();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const deleteUser = async () => {
      try {
        setLoading(true);
        await axios.post(
          `https://crm-server-akb.onrender.com/users/delete/${useremail}`,
          useremail
        );
        setSuccess(true);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    deleteUser();
  }, []);

  return (
    <div>
      {" "}
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                "url(https://wallpapers.com/images/featured/0tybboag2sq3qa95.jpg)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>

              {loading ? <CircularProgress color="success" /> : null}
              {success ? (
                <div className="success-container">
                  <h1>User Deleted Successfully</h1>
                </div>
              ) : null}
              <Tooltip title="Go Back">
                <IconButton aria-label="delete" size="large">
                  <ArrowBackIcon
                    fontSize="inherit"
                    onClick={() => {
                      navigate(-1);
                    }}
                  />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
};

export default DeleteUser;
