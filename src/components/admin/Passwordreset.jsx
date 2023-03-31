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
import { useNavigate, useParams } from "react-router";
import { Nav } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import * as yup from "yup";
import { useFormik } from "formik";
import CircularProgress from "@mui/material/CircularProgress";
import LoginIcon from "@mui/icons-material/Login";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Form from "react-bootstrap/Form";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const theme = createTheme();
const passwordValidationSchema = yup.object({
  email: yup.string().required("Email Id is Mandatory").email(),
});
const Passwordreset = () => {
  const { useremail } = useParams();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const passwordResetFunction = async (emailData) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/users/resetpassword",
        emailData
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
        email: useremail,
      },
      validationSchema: passwordValidationSchema,
      onSubmit: (emailData) => {
        passwordResetFunction(emailData);
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
              Reset User Password
            </Typography>
            {loading ? <CircularProgress color="success" /> : null}
            {errorMsg ? (
              <div className="error-container">
                <Alert variant="danger">{errorMsg}</Alert>
              </div>
            ) : null}
            {success ? (
              <div className="success-container">
                <h1>We Have Sent A Verification Mail to the User .</h1>
                <Tooltip title="Back">
                  <IconButton size="large">
                    <LoginIcon onClick={() => navigate("/login")} />
                  </IconButton>
                </Tooltip>
              </div>
            ) : (
              <>
                <div className="form-container">
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.email && errors.email}
                      />
                      {touched.email && errors.email ? (
                        <Alert variant="danger">{errors.email}</Alert>
                      ) : null}
                    </Form.Group>
                    <Button variant="contained" size="large" type="submit">
                      Submit
                    </Button>
                  </Form>
                </div>
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
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Passwordreset;
