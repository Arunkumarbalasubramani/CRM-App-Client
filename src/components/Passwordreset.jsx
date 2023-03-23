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
const passwordValidationSchema = yup.object({
  email: yup.string().required("Email Id is Mandatory").email(),
});
const Passwordreset = () => {
  const navigate = useNavigate();
  const passwordResetFunction = (emailData) => {
    console.log(emailData);
  };
  const { handleSubmit, handleBlur, handleChange, touched, errors, values } =
    useFormik({
      initialValues: {
        email: "",
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Reset Password
              </Button>
              <div className="further-actions">
                <Nav.Link
                  variant="body2"
                  onClick={() => navigate("/user/register")}
                  className="further-link"
                >
                  New User ?
                </Nav.Link>
                <Nav.Link
                  variant="body2"
                  onClick={() => navigate("/login")}
                  className="further-link"
                >
                  {" Login Here"}
                </Nav.Link>
              </div>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Passwordreset;
