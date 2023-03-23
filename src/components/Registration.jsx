import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router";
import { Nav } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import * as yup from "yup";
import { useFormik } from "formik";

const theme = createTheme();
const userValidationSchema = yup.object({
  email: yup
    .string()
    .email("Should be a Valid Email")
    .required("Email is Mandatory"),
  fname: yup.string().required("Please Enter Your First Name"),
  lname: yup.string().required("Please Enter Your Last Name"),
  password: yup
    .string()
    .required("Password is Mandatory")
    .min(8, "Must be atleast 8 Characters Long")
    .max(12, "Not More than 12 Characters"),
  userType: yup.string().required(),
});
const Registration = () => {
  const navigate = useNavigate();
  const registerUserFunction = (userData) => {
    console.log(userData);
  };
  const { handleSubmit, handleChange, handleBlur, touched, errors, values } =
    useFormik({
      initialValues: {
        email: "",
        fname: "",
        lname: "",
        password: "",
        userType: "",
      },
      validationSchema: userValidationSchema,
      onSubmit: (userData) => {
        registerUserFunction(userData);
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
              Register a New User
            </Typography>
            <Box
              component="form"
              noValidate
              sx={{ mt: 1 }}
              onSubmit={handleSubmit}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.email && errors.email}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              {touched.email && errors.email ? (
                <Alert variant="danger">{errors.email}</Alert>
              ) : null}
              <TextField
                margin="normal"
                required
                fullWidth
                name="fname"
                label="First Name"
                type="text"
                id="fname"
                value={values.fname}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.fname && errors.fname}
              />
              {touched.fname && errors.fname ? (
                <Alert variant="danger">{errors.fname}</Alert>
              ) : null}
              <TextField
                margin="normal"
                required
                fullWidth
                name="lname"
                label="Last Name"
                type="text"
                id="lname"
                value={values.lname}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.lname && errors.lname}
              />
              {touched.lname && errors.lname ? (
                <Alert variant="danger">{errors.lname}</Alert>
              ) : null}
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
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.password && errors.password}
              />
              {touched.password && errors.password ? (
                <Alert variant="danger">{errors.password}</Alert>
              ) : null}
              <TextField
                margin="normal"
                required
                fullWidth
                name="userType"
                label="User Type"
                type="text"
                id="userType"
                value={values.userType}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.userType && errors.userType}
              />
              {touched.userType && errors.userType ? (
                <Alert variant="danger">{errors.userType}</Alert>
              ) : null}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register the User
              </Button>
              <div className="further-actions">
                <Nav.Link
                  variant="body2"
                  onClick={() => navigate("/login")}
                  className="further-link"
                >
                  Already Registered?
                </Nav.Link>
                <Nav.Link
                  variant="body2"
                  onClick={() => navigate("/user/resetpassword")}
                  className="further-link"
                >
                  {"Forgot Password"}
                </Nav.Link>
              </div>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Registration;
