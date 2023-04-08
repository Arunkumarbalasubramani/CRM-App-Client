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
import { useNavigate } from "react-router";
import { Nav } from "react-bootstrap";
import * as yup from "yup";
import { useFormik } from "formik";
import Form from "react-bootstrap/Form";
import CircularProgress from "@mui/material/CircularProgress";
import HomeIcon from "@mui/icons-material/Home";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import jwt_decode from "jwt-decode";

const theme = createTheme();

const loginValidationSchema = yup.object({
  email: yup.string().required("Email Id is Mandatory").email(),
  password: yup.string().required("Password is Mandatory"),
});
const Login = () => {
  const navigate = useNavigate();

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const loginFunction = async (loginData) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/users/login",
        loginData
      );
      const data = response.data.accessToken;

      const decodedData = jwt_decode(data);
      console.log(decodedData);
      const { userName, roles } = decodedData;
      navigate(`/${userName}/${roles}/dashboard`);
      setSuccess(true);
      setLoading(false);
    } catch (error) {
      if (!error?.response) {
        setErrorMsg("No Server Response");
        setLoading(false);
      } else if (error?.response.status === 404) {
        setErrorMsg("User Not Found. Please Contact Admin");
        setLoading(false);
      } else if (error?.response.status === 403) {
        setErrorMsg("Wrong Credentials");
        setLoading(false);
      } else {
        setErrorMsg(error?.response.data.Error);
        setLoading(false);
      }
    }
  };
  const { handleSubmit, handleBlur, handleChange, touched, errors, values } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginValidationSchema,
      onSubmit: (loginData) => {
        loginFunction(loginData);
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
              Sign in
            </Typography>
            {loading ? <CircularProgress color="success" /> : null}
            {errorMsg ? (
              <div className="error-container">
                <Alert variant="danger">{errorMsg}</Alert>
              </div>
            ) : null}
            {success ? (
              <div className="success-container">
                <h1>User Logged In Successfully</h1>
                <Tooltip title="Go to Home">
                  <IconButton size="large">
                    <HomeIcon onClick={() => navigate("/:userType/homepage")} />
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

                  <Button variant="contained" size="large" type="submit">
                    Submit
                  </Button>
                </Form>
                <div className="further-actions">
                  <Nav.Link variant="body2" className="further-link">
                    Not Registered? Contact Your Admin
                  </Nav.Link>
                  <Nav.Link variant="body2" className="further-link">
                    {"Forgot Password. Contact Your Admin"}
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

export default Login;
