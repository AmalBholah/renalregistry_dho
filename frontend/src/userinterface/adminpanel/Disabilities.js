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
  Paper,
  TextField,
  Checkbox,
  ButtonGroup,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Alert,
  Table,
  Button,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import Loader from "../../components/Loader";
import {
  listdisabilitiesmaster,
  deletedisabilitiesmaster,
  createdisabilitiesmaster,
} from "../../apis/master-lists";
var currentItem = {};
export default class Disabilities extends Component {
  state = {
    drawerOpen: false,
    navPath: 0,
    items: [],
    loading: false,
    dialogOpen: false,
    newname: "",
    deleteDialog: false,
    todelete: "",
  };

  async componentDidMount() {
    this.setState({ loading: true });
    let items = await listdisabilitiesmaster();
    if (items) {
      this.setState({ items: items, loading: false });
    }
  }
  render() {
    return (
      <div>
        <Dialog
          open={this.state.dialogOpen}
          onClose={() => this.setState({ dialogOpen: false })}
        >
          <DialogTitle>Create a Disability</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Enter name"
              fullWidth
              value={this.state.newname}
              onChange={(e) => this.setState({ newname: e.target.value })}
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.setState({ dialogOpen: false })}>
              Cancel
            </Button>
            <Button variant="contained" onClick={() => this.createItem()}>
              Create
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
              Manage Disabilities
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
                    Name
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
                      Add
                    </Button>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.items.map((row) => (
                  <TableRow
                    key={row.pkdisabilityid}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    style={{ cursor: "pointer" }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>

                    <TableCell>
                      <ButtonGroup
                        variant="contained"
                        aria-label="outlined primary button group"
                      >
                        <Button onClick={() => this.removeDialog(row)}>
                          Delete
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

        {/* DELETION DIALOG  */}
        <Dialog
          open={this.state.deleteDialog}
          onClose={() => this.setState({ deleteDialog: false })}
        >
          <DialogTitle>Delete a Disability</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete : {this.state.todelete}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.setState({ deleteDialog: false })}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => this.removeItem()}
            >
              Remove
            </Button>
          </DialogActions>
        </Dialog>
        {/* DELETION DIALOG  */}
      </div>
    );
  }
  removeDialog(item) {
    currentItem = item;
    this.setState({ deleteDialog: true, todelete: item.name });
  }

  async removeItem() {
    this.setState({ loading: true });
    let DeletionPromise = await deletedisabilitiesmaster(
      currentItem.pkdisabilityid
    );

    let items = await listdisabilitiesmaster();
    if (items) {
      this.setState({
        dialogOpen: false,
        items: items,
        loading: false,
        deleteDialog: false,
      });
    }
  }

  async createItem() {
    this.setState({ loading: true });
    if (this.state.newname.toString().length > 1) {
      let objectToSend = { name: this.state.newname };
      let createUserOperation = await createdisabilitiesmaster(objectToSend);
      let items = await listdisabilitiesmaster();
      if (items) {
        this.setState({ dialogOpen: false, items: items, loading: false });
      }
    }
  }
}
