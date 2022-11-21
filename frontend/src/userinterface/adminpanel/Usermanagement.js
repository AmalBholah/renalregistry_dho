import React, { Component } from "react";
import AdminDrawer from "../../components/AdminDrawer";
import { Navigate } from "react-router-dom";
import renderIf from "render-if";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  listhealthinstitutions
} from "../../apis/master-lists";
import {
  Paper,
  TextField,
  Checkbox,
  ButtonGroup,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Table,
  Button,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody, FormControl, InputLabel, Select, MenuItem,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import { createuser, deleteuser, listusers } from "../../apis/user-management";
import Loader from "../../components/Loader";
var currentUser = {};
export default class Usermanagement extends Component {
  state = {
    drawerOpen: false,
    navPath: 0,
    users: [],
    loading: false,
    dialogOpen: false,
    username: "",
    isadmin: false,
    deleteDialog: false,
    usertodelete: "",
    resetDialog: false,
    usertoreset: "",

    //health institution mapping
    healthinstitutions: [],
    healthinstitution:'',
    healthinstitutioncode:'',
    healthinstitutiondescription:'',
  };

  async componentDidMount() {
    this.setState({ loading: true });
    let users = await listusers();
    let _listhealthinstitutions = await listhealthinstitutions();
    if (users) {
      this.setState({ users: users, loading: false });
    }
    if (_listhealthinstitutions.length > 0) {
      this.setState({
        healthinstitutions: _listhealthinstitutions,
        healthinstitution: _listhealthinstitutions[0].code + ' - ' + _listhealthinstitutions[0].description,
        healthinstitution_object:_listhealthinstitutions[0]
      });
    }
  }
  render() {
    return (
      <div>
        <Dialog
          open={this.state.dialogOpen}
          onClose={() => this.setState({ dialogOpen: false })}
        >
          <DialogTitle>Create a User</DialogTitle>
          <DialogContent>
            <DialogContentText>
              The user will be automatically created with the password 1234, the
              user once logged in will have the possibility to change his/her
              password.
            </DialogContentText>

            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Enter username"
              fullWidth
              value={this.state.username}
              onChange={(e) => this.setState({ username: e.target.value })}
              variant="outlined"
            />

            <div
              style={{
                flexDirection: "row",
                display: "flex",
                marginTop: 20,
                marginBottom: 20,
              }}
            >
              <Typography variant="h6">Create as Administrator?</Typography>
              <Checkbox
                style={{ marginTop: -5 }}
                checked={this.state.isadmin}
                onChange={() => this.setState({ isadmin: !this.state.isadmin })}
              />


            </div>

            {!this.state.isadmin &&
                <FormControl fullWidth>
                  <InputLabel id="choose-healthinstitution-select-label">
                    Health Institution *
                  </InputLabel>
                  <Select
                      labelId="choose-healthinstitution-select-label"
                      label="Health Institution *"
                      value={this.state.healthinstitution}
                      onChange={(val) =>
                          this.setState({
                            healthinstitution: val.target.value,
                          })
                      }
                  >
                    {this.state.healthinstitutions.map((institution) => {
                      let resultant = institution.code + ' - ' + institution.description;
                      return (
                          <MenuItem
                              key={institution.pkhealthinstitutionid}
                              value={resultant}
                          >
                            {resultant}
                          </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.setState({ dialogOpen: false })}>
              Cancel
            </Button>
            <Button variant="contained" onClick={() => this.createUser()}>
              Create User
            </Button>
          </DialogActions>
        </Dialog>
        <Loader visible={this.state.loading} />
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
              User Management
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
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead style={{ backgroundColor: "black" }}>
                <TableRow>
                  <TableCell style={{ fontWeight: "bold", color: "white" }}>
                    Username
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "white" }}>
                    Administrator
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "white" }}>
                    Options
                  </TableCell>
                  <TableCell>
                    <Button
                      startIcon={<AddIcon />}
                      variant="contained"
                      onClick={() => this.setState({ dialogOpen: true })}
                    >
                      Add a User
                    </Button>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.users.map((row) => (
                  <TableRow
                    key={row.pkuserid}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    style={{ cursor: "pointer" }}
                  >
                    <TableCell component="th" scope="row">
                      {row.username}
                    </TableCell>
                    <TableCell>{row.isadmin ? "YES" : "NO"}</TableCell>
                    <TableCell>
                      <ButtonGroup
                        variant="contained"
                        aria-label="outlined primary button group"
                      >
                        <Button onClick={() => this.removeUserDialog(row)}>
                          Delete
                        </Button>
                        <Button
                          onClick={() => this.resetUserDialog(row)}
                          color="secondary"
                        >
                          reset password
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* USER DELETION DIALOG  */}
        <Dialog
          open={this.state.deleteDialog}
          onClose={() => this.setState({ deleteDialog: false })}
        >
          <DialogTitle>Delete user</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this user :{" "}
              {this.state.usertodelete}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.setState({ deleteDialog: false })}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => this.removeUser()}
            >
              Remove user
            </Button>
          </DialogActions>
        </Dialog>
        {/* USER DELETION DIALOG  */}

        {/* USER PASSWORD RESET DIALOG  */}
        <Dialog
          open={this.state.resetDialog}
          onClose={() => this.setState({ resetDialog: false })}
        >
          <DialogTitle>Reset user password to 1234</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to reset the password for the user :
              {this.state.usertoreset}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.setState({ resetDialog: false })}>
              Cancel
            </Button>
            <Button variant="contained" onClick={() => this.resetUser()}>
              Reset password
            </Button>
          </DialogActions>
        </Dialog>
        {/* USER PASSWORD RESET DIALOG  */}
      </div>
    );
  }
  removeUserDialog(user) {
    currentUser = user;
    this.setState({ deleteDialog: true, usertodelete: user.username });
  }
  resetUserDialog(user) {
    currentUser = user;
    this.setState({ resetDialog: true, usertoreset: user.username });
  }
  async removeUser() {
    this.setState({ loading: true });
    let userDeletionPromise = await deleteuser(currentUser.pkuserid);

    let users = await listusers();
    if (users) {
      this.setState({
        dialogOpen: false,
        users: users,
        loading: false,
        deleteDialog: false,
      });
    }
  }

  async createUser() {
    this.setState({ loading: true });
    if (this.state.username.toString().length > 1) {
      let createUserOperation = await createuser(
        this.state.username,
        "1234",
        this.state.isadmin,
        this.state.healthinstitution.toString().split(" - ")[0]
      );
      let users = await listusers();
      if (users) {
        this.setState({ dialogOpen: false, users: users, loading: false });
      }
    }
  }

  async resetUser(user) {
    this.setState({ loading: true });
    let userDeletionPromise = await deleteuser(currentUser.pkuserid);
    let createUserOperation = await createuser(
      this.state.usertoreset,
      "1234",
      currentUser.isadmin
    );
    let users = await listusers();
    if (users) {
      this.setState({ resetDialog: false, users: users, loading: false });
    }
  }
}
