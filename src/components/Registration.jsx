import { React, useState } from "react";
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
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import LoginIcon from "@mui/icons-material/Login";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";

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
  role: yup.string().required(),
});

const Registration = () => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const registerUserFunction = async (userData) => {
    try {
      setLoading(true);
      await axios.post("http://localhost:5000/users/register_user", userData);
      setSuccess(true);
      setLoading(false);
    } catch (error) {
      if (!error?.response) {
        setErrorMsg("No Server Response");
        setLoading(false);
      } else if (error?.response.status === 404) {
        setErrorMsg("User Already Found");
        setLoading(false);
      } else {
        setErrorMsg(error.response.data.Error);
        setLoading(false);
      }
    }
  };

  const { handleSubmit, handleChange, handleBlur, touched, errors, values } =
    useFormik({
      initialValues: {
        email: "",
        fname: "",
        lname: "",
        password: "",
        role: "",
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
            {loading ? <CircularProgress color="success" /> : null}
            {errorMsg ? (
              <div className="error-container">
                <Alert variant="danger">{errorMsg}</Alert>
              </div>
            ) : null}
            {success ? (
              <div className="success-container">
                <h1>User Registered Successfully</h1>
                <Tooltip title="Back">
                  <IconButton size="large">
                    <LoginIcon onClick={() => navigate("/admin/dashboard")} />
                  </IconButton>
                </Tooltip>
              </div>
            ) : (
              <div className="form-container">
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <TextField
                      id="outlined-basic"
                      label="Email"
                      variant="outlined"
                      className="form-input"
                      value={values.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="email"
                      error={touched.email && errors.email}
                    />
                    {touched.email && errors.email ? (
                      <Alert variant="danger">{errors.email}</Alert>
                    ) : null}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <TextField
                      id="outlined-basic"
                      label="First Name"
                      variant="outlined"
                      className="form-input"
                      name="fname"
                      type="text"
                      value={values.fname}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={touched.fname && errors.fname}
                    />
                    {touched.fname && errors.fname ? (
                      <Alert variant="danger">{errors.fname}</Alert>
                    ) : null}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <TextField
                      id="outlined-basic"
                      label="Last Name"
                      variant="outlined"
                      className="form-input"
                      name="lname"
                      type="text"
                      value={values.lname}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={touched.lname && errors.lname}
                    />
                    {touched.lname && errors.lname ? (
                      <Alert variant="danger">{errors.lname}</Alert>
                    ) : null}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <TextField
                      id="outlined-basic"
                      name="password"
                      label="Password"
                      type="password"
                      value={values.password}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={touched.password && errors.password}
                      variant="outlined"
                      className="form-input"
                    />
                    {touched.password && errors.password ? (
                      <Alert variant="danger">{errors.password}</Alert>
                    ) : null}
                  </Form.Group>
                  <Form.Group
                    className="mb-3 drop-down"
                    value={values.role}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  >
                    <label for="role">Choose a Role:</label>
                    <select name="role" id="role">
                      <option value="employee"></option>
                      <option value="employee">Employee</option>
                      <option value="manager">Manager</option>
                      <option value="admin">Admin</option>
                    </select>
                  </Form.Group>

                  <Button variant="contained" size="large" type="submit">
                    Submit
                  </Button>
                </Form>
                <div className="further-actions">
                  <Nav.Link
                    variant="body2"
                    onClick={() => navigate("/user/resetpassword")}
                    className="further-link"
                  >
                    {"Forgot Password"}
                  </Nav.Link>
                </div>
              </div>
            )}
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
export default Registration;
