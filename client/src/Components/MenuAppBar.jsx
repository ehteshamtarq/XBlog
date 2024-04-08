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
    <Box sx={{ flexGrow: 1, width: "100vh", height: "10px"}}>
      <AppBar position="static" sx={{backgroundColor:"black"}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color:"white" }}>
            XBlog
          </Typography>
          
          {!auth && <Button  sx={{color:"white"}}>Login</Button>}
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
