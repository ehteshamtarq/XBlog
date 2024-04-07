import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Button from '@mui/material/Button';


export default function MenuAppBar() {
  const [auth, setAuth] = React.useState(false);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  return (
    <Box sx={{ flexGrow: 1, width: "100vh"}}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            XBlog
          </Typography>
          <Button color="inherit">Login</Button>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
          )}
          
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}
