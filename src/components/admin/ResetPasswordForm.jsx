import { React, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Alert from "react-bootstrap/Alert";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router";
import * as yup from "yup";
import { useFormik } from "formik";
import CircularProgress from "@mui/material/CircularProgress";
import HomeIcon from "@mui/icons-material/Home";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";

const theme = createTheme();

const passwordValidationSchema = yup.object({
  password: yup
    .string()
    .required("Password is Mandatory")
    .min(8, "Minimum 8 Characters Only")
    .max(12, "Maximum 12 Characters only"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Both password need to be the same"),
});
const ResetPasswordForm = () => {
  const { id, token } = useParams();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const resetFunction = async (passwordData) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:5000/users/passwordreset/${id}/${token}`,
        passwordData
      );
      setSuccess(true);
      setLoading(false);
    } catch (error) {
      if (!error?.response) {
        setErrorMsg("No Server Response");
        setLoading(false);
      } else if (error?.response.status === 404) {
        setErrorMsg("User Not Found");
        setLoading(false);
      } else if (error?.response.status === 403) {
        setErrorMsg("Invalid Token / Token Expired");
        setLoading(false);
      } else {
        setErrorMsg(`${error?.response.data.Error}`);
        setLoading(false);
      }
    }
  };
  const { handleSubmit, handleBlur, handleChange, touched, errors, values } =
    useFormik({
      initialValues: {
        password: "",
        confirmPassword: "",
      },
      validationSchema: passwordValidationSchema,
      onSubmit: (passwordData) => {
        resetFunction(passwordData);
      },
    });
  return (
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
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
              Reset Password
            </Typography>
            {loading ? <CircularProgress color="success" /> : null}
            {errorMsg ? (
              <div className="error-container">
                <Alert variant="danger">{errorMsg}</Alert>
              </div>
            ) : null}
            {success ? (
              <div className="success-container">
                <h1>Password Changed Successfully</h1>
                <Tooltip title="Go to Home">
                  <IconButton size="large">
                    <HomeIcon onClick={() => navigate("/login")} />
                  </IconButton>
                </Tooltip>
              </div>
            ) : (
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={values.password}
                  error={touched.password && errors.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.password && errors.password ? (
                  <Alert variant="danger">{errors.password}</Alert>
                ) : null}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="confirm-password"
                  value={values.confirmPassword}
                  error={touched.confirmPassword && errors.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.confirmPassword && errors.confirmPassword ? (
                  <Alert variant="danger">{errors.confirmPassword}</Alert>
                ) : null}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Reset Password
                </Button>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default ResetPasswordForm;
