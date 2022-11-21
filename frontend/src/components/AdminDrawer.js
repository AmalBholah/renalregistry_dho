import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";
const AdminDrawer = ({ drawerOpen, drawerToggle }) => {
  let anchor = "left";
  return (
    <Drawer anchor={"left"} open={drawerOpen} onClose={() => drawerToggle()}>
      <Box
        sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
        role="presentation"
      >
        <List>
          <ListItem key={1} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <Link to="/listpatients">Renal Registry</Link>
            </ListItemButton>
          </ListItem>
          <Divider />

          {window.localStorage.getItem("isadmin") == "true" && (
            <ListItem key={2} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <Link to="/usermanagement">User Management</Link>
              </ListItemButton>
            </ListItem>
          )}
          {window.localStorage.getItem("isadmin") == "true" && <Divider />}
          {window.localStorage.getItem("isadmin") == "true" && (
            <ListItem key={3} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <Link to="/hemodialysisunits">Hemodialysis Units</Link>
              </ListItemButton>
            </ListItem>
          )}
          {window.localStorage.getItem("isadmin") == "true" && <Divider />}

          <ListItem key={10} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <Link to="/changepassword">Change your password</Link>
            </ListItemButton>
          </ListItem>
          <Divider />

          {window.localStorage.getItem("isadmin") == "true" && (
            <ListItem key={4} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <Link to="/healthinstitutions">Health Institutions</Link>
              </ListItemButton>
            </ListItem>
          )}
          {window.localStorage.getItem("isadmin") == "true" && <Divider />}
          {window.localStorage.getItem("isadmin") == "true" && (
            <ListItem key={5} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <Link to="/comorbidities">Comorbidities</Link>
              </ListItemButton>
            </ListItem>
          )}
          {window.localStorage.getItem("isadmin") == "true" && <Divider />}
          {window.localStorage.getItem("isadmin") == "true" && (
            <ListItem key={6} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <Link to="/disabilities">Disabilities</Link>
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Box>
    </Drawer>
  );
};

export default AdminDrawer;
