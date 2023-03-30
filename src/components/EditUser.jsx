import { React, useEffect, useState } from "react";

import EditForm from "./EditForm";

import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

const theme = createTheme();
const EditUser = () => {
  const { useremail } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState();
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    const getEditData = async () => {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/users/find/${useremail}`
      );
      setUserData(response.data);
      setLoading(false);
    };
    getEditData();
  }, [useremail]);

  return (
    <div>
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
              <Typography component="h1" variant="h5">
                {`Edit Details `}
              </Typography>
              {loading ? (
                <CircularProgress color="success" />
              ) : (
                <EditForm userData={userData} />
              )}
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
};
export default EditUser;
