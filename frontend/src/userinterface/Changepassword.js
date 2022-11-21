import React, { Component } from "react";
import AdminDrawer from "../components/AdminDrawer";
import {
  Paper,
  TextField,
  Slide,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Alert,
  Grid,
  Snackbar,
  Button,
} from "@mui/material";
import { Navigate } from "react-router-dom";
import renderIf from "render-if";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { listusers, deleteuser, createuser } from "../apis/user-management";

export default class Changepassword extends Component {
  state = {
    drawerOpen: false,
    navPath: 0,
    passwordone: "",
    passwordtwo: "",
    snackbarVisible: false,
    snackbarMessage: "",
  };
  render() {
    return (
      <div>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={this.state.snackbarVisible}
          onClose={() => this.setState({ snackbarVisible: false })}
          message={this.state.snackbarMessage}
          key={1}
        />
        {renderIf(this.state.navPath == 10)(<Navigate to="/" replace={true} />)}
        <AdminDrawer
          drawerOpen={this.state.drawerOpen}
          drawerToggle={() =>
            this.setState({ drawerOpen: !this.state.drawerOpen })
          }
        />
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            {window.localStorage.getItem("isadmin") && (
              <IconButton
                onClick={() =>
                  this.setState({ drawerOpen: !this.state.drawerOpen })
                }
              >
                <MenuIcon style={{ color: "white" }} />
              </IconButton>
            )}

            <Typography
              variant="h6"
              component="div"
              style={{ marginRight: 25, flexGrow: 1 }}
            >
              Change your password
            </Typography>

            <Button
              onClick={() => this.setState({ navPath: 10 })}
              id="fade-button"
              variant="contained"
              color="secondary"
              endIcon={<LogoutIcon />}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <Paper
          elevation={3}
          style={{
            margin: "auto",
            minHeight: "95vh",
            maxWidth: "95vw",
            marginTop: 20,
          }}
        >
          <div
            style={{
              flexDirection: "column",
              display: "flex",
              width: "40%",
              margin: "auto",
              display: "flex",
              marginTop: 40,
            }}
          >
            <TextField
              label="Enter a new password"
              variant="outlined"
              type="password"
              value={this.state.passwordone}
              onChange={(e) => this.setState({ passwordone: e.target.value })}
            />
            <div style={{ height: 20 }} />
            <TextField
              label="Confirm your new password"
              variant="outlined"
              type="password"
              value={this.state.passwordtwo}
              onChange={(e) => this.setState({ passwordtwo: e.target.value })}
            />
            <div style={{ height: 20 }} />
            <Button
              onClick={() => this.updatePasswordEvent()}
              variant="contained"
            >
              Update password
            </Button>
          </div>
        </Paper>
      </div>
    );
  }

  async updatePasswordEvent() {
    if (
      this.state.passwordone.toString() == this.state.passwordtwo.toString()
    ) {
      //List users
      let listofusers = await listusers();

      listofusers.map(async (user) => {
        if (user.username == window.localStorage.getItem("login")) {
          console.log("detected user : ", user);

          let userDeletionPromise = await deleteuser(user.pkuserid);
          let createUserOperation = await createuser(
            user.username,
            this.state.passwordone.toString(),
            user.isadmin
          );
        }
      });
      this.setState({
        snackbarVisible: true,
        snackbarMessage: "Password has been changed",
        loading: false,
      });
    } else {
      this.setState({
        snackbarVisible: true,
        snackbarMessage: "Passwords do not match !",
      });
    }
  }
}
