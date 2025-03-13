import * as React from 'react';
import { Hub } from 'aws-amplify/utils';
import { signOut, getCurrentUser } from "aws-amplify/auth";
import { useEffect, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ConedIconBlue from "../../assets/images/coned-logo-blue.svg"
// import ConedIconWhite from "../../assets/images/coned-logo-white.svg"
import Container from '@mui/material/Container';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import UserIcon from '../../assets/images/user-icon.png'

function HeaderBar() {
  const appTitle = "Retail Choice Angel​";
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [userName, setUserName] = useState("Chan, Jack");
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  useEffect(() => {
    Hub.listen("auth", ({ payload }) => {
      const { event } = payload;
      if (event === "signedIn") {
        loadCurrentUser();
      } if (event === "signedOut") {
        setIsUserAuthenticated(false);
        setAnchorElUser(null);
      }
    });

    loadCurrentUser();
  }, []);

  const loadCurrentUser = async () => {
    try {
      const { signInDetails } = await getCurrentUser();
      const loginId = signInDetails?.loginId;
      const id = loginId?.substring(0, loginId?.indexOf("@")).split(".");
      setUserName(`${id ? `${id[2] || id[1]}, ${id[0]}` : ""}`);
      setIsUserAuthenticated(true);
    } catch (error) {
      console.log("Error loading current user: ", error);
    }
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log("Error signing out: ", error);
    }
  };

  return (
    // <AppBar position="static" sx={isUserAuthenticated ? { backgroundColor: "#0099D8" } : { backgroundColor: "#FFF" }}>
    <AppBar position="static" sx={{ backgroundColor: "#FFF" }}>
      <Container
        sx={{
          maxWidth: "1920px !important",
          height: "95px",
          display: "flex",
          alignItems: "center",
          padding: "0 40px !important"
        }}>
        <Toolbar
          disableGutters
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* <img src={isUserAuthenticated ? ConedIconWhite : ConedIconBlue} alt="conEdison" /> */}
            <img src={ConedIconBlue} alt="conEdison" />
            <span style={{ display: "inline-block", height: "24px", borderLeft: "1px solid #EAEDF1" }}></span>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                // ...(isUserAuthenticated && {
                //   color: "#fff"
                // }),
                // ...(!isUserAuthenticated && {
                  color: "#000",
                // }),
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'var(--main-font-family)',
                fontWeight: 600,
                textDecoration: 'none',
                fontSize: "24px",
                lineHeight: "29px"
              }}
            >
              {appTitle}
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton
              onClick={handleOpenUserMenu}
              sx={{
                p: 0,
                ...(!isUserAuthenticated && {
                  display: "none"
                })
              }}>
              <Avatar 
              src={UserIcon}> {!UserIcon && <AccountCircleIcon fontSize="large" />}
              </Avatar>
              <Typography
                sx={{
                  fontFamily: "var(--main-font-family)",
                  fontWeight: 600,
                  fontSize: "20px",
                  color: "#000",
                  marginLeft: "15px",
                  textTransform: "capitalize"
                }}>
                {userName}
              </Typography>
              <ExpandMoreIcon sx={{
                color: "#fff",
                fontWeight: 600,
                fontSize: "30px",
                marginLeft: "15px"
              }} />
            </IconButton>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key="logout" onClick={handleLogout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default HeaderBar;