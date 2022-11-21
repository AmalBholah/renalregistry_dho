import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import {
  Button,
  CssBaseline,
  Typography,
  Box,
  Container,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  CircularProgress,
  Alert,
  AlertTitle,
} from "@mui/material";
import { authenticateUser } from "../apis/user-management";
const FORGOTPASSWORD_MSG =
  "Please contact DHO for your password recovery procedure";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"V1.0.0 - Mauritius Renal Registry"}
    </Typography>
  );
}
class Login extends Component {
  state = {
    logout: false,
    forgotpwd: false,
    login: "",
    password: "",
    loginerror: false,
    passworderror: false,
    loginerrormsg: "",
    passworderrormsg: "",
    showSnackbar: false,
    snackbarMessage: "",
    snackbartype: "success",
    isLoading: false,
    authSuccess: false,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  async loginUser() {
    const { login, password } = this.state;
    if (login.length == 0) {
      this.setState({
        loginerror: true,
        loginerrormsg: "Please enter your login.",
      });
    }
    if (password.length == 0) {
      this.setState({
        passworderror: true,
        passworderrormsg: "Please enter your password.",
      });
    }
    if (login.length > 0 && password.length > 0) {
      this.setState({ isLoading: true });
      if (!this.state.isLoading) {
        let authResults = await authenticateUser(login, password);

        if (authResults && authResults.data) {
          if (authResults.data.state) {
            window.localStorage.setItem("token", authResults.data.token);
            window.localStorage.setItem("login", login);
            window.localStorage.setItem("isadmin", authResults.data.isadmin);
            window.localStorage.setItem("healthinstitutioncode", authResults.data.healthinstitutioncode);
            this.setState({
              showSnackbar: true,
              snackbartype: "success",
              isLoading: false,
              authSuccess: true,
              snackbarMessage: authResults.data.message,
            });
          } else {
            this.setState({
              showSnackbar: true,
              snackbartype: "error",
              isLoading: false,
              snackbarMessage: authResults.data.message,
            });
          }
        }
      }
    }
  }

  triggerLogin(e) {
    if (e.keyCode == 13) {
      this.loginUser();
    }
  }
  // ssh -i "renaltransplant_demoserver_keypair.cer" ubuntu@ec2-13-244-117-75.af-south-1.compute.amazonaws.com
  render() {
    return (
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        {this.state.authSuccess && (
          <Navigate to="/listpatients" replace={true} />
        )}
        <div
          style={{
            marginTop: 16,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <form
            style={{
              marginTop: 8,
              width: "80%",
              alignSelf: "center",
              margin: "auto",
            }}
            noValidate
          >
            <div
              style={{
                display: "flex",
                margin: "auto",
                alignItems: "center",
                justifyContent: "center",
                padding: 15,
              }}
            >
              <Typography
                variant="h6"
                style={{
                  marginLeft: 10,
                  fontSize: 20,
                  marginTop: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
                noWrap={false}
              >
                Welcome to the Mauritius Renal Registry
              </Typography>
            </div>

            <TextField
              variant="outlined"
              onChange={(e) => this.setState({ login: e.target.value })}
              value={this.state.login}
              margin="normal"
              required
              onKeyDown={(e) => this.triggerLogin(e)}
              error={this.state.loginerror}
              helperText={this.state.loginerrormsg}
              fullWidth
              label="Login"
              autoFocus
            />
            <TextField
              variant="outlined"
              onChange={(e) => this.setState({ password: e.target.value })}
              value={this.state.password}
              margin="normal"
              required
              onKeyDown={(e) => this.triggerLogin(e)}
              error={this.state.passworderror}
              helperText={this.state.passworderrormsg}
              fullWidth
              label="Password"
              type="password"
              autoComplete="current-password"
            />

            {!this.state.isLoading && (
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => this.loginUser()}
                style={{ fontWeight: "bold", marginTop: 20 }}
              >
                Login
              </Button>
            )}

            {this.state.isLoading && (
              <div
                style={{
                  marginTop: 16,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <CircularProgress />
              </div>
            )}

            <Button
              fullWidth
              color="primary"
              style={{ fontWeight: "bold", marginTop: 20 }}
              onClick={() => this.setState({ forgotpwd: true })}
            >
              forgot password ?
            </Button>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>

        <Dialog
          onClose={() => this.setState({ forgotpwd: false })}
          aria-labelledby="customized-dialog-title"
          open={this.state.forgotpwd}
        >
          <DialogTitle
            id="customized-dialog-title"
            onClose={() => this.setState({ forgotpwd: false })}
          >
            Forgot your password ?
          </DialogTitle>
          <DialogContent>
            <Typography gutterBottom>{FORGOTPASSWORD_MSG}</Typography>
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={() => this.setState({ forgotpwd: false })}
              color="primary"
            >
              okay
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={this.state.showSnackbar}
          autoHideDuration={4000}
          onClose={() => this.setState({ showSnackbar: false })}
        >
          <Alert
            onClose={() => this.setState({ showSnackbar: false })}
            severity={this.state.snackbartype}
          >
            <AlertTitle>{this.state.snackbarMessage}</AlertTitle>
          </Alert>
        </Snackbar>
      </Container>
    );
  }
}

export default Login;
