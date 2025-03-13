import * as React from 'react';
import { signOut } from "aws-amplify/auth";
import { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import CalstrsLogo from "../../assets/images/calstrs-logo.svg"
import Container from '@mui/material/Container';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import FeedbackDialog from '../Dialogs/FeedbackDialog';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../services/redux/store';
import { updateSessionId } from '../../services/redux/app.slice';

function HeaderBar({userName, isUserAuthenticated}) {
  const dispatch = useDispatch<AppDispatch>();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDialogClose = () => {
    setFeedbackDialogOpen(false);
    logout();
  };

  const handleLogout = () => {
    setFeedbackDialogOpen(true);
  };

  const logout = async () => {
    try {
      await signOut();
      dispatch(updateSessionId(null));
      setAnchorElUser(null);
    } catch (error) {
      console.log("Error signing out: ", error);
    }
  }

  return (
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
            <img src={CalstrsLogo} alt="conEdison" />
            <span style={{ display: "inline-block", height: "24px", borderLeft: "1px solid #EAEDF1" }}></span>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                ...(isUserAuthenticated && {
                  color: "#000"
                }),
                ...(!isUserAuthenticated && {
                  color: "#000"
                }),
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'var(--main-font-family)',
                fontWeight: 600,
                textDecoration: 'none',
                fontSize: "24px",
                lineHeight: "29px"
              }}
            >
              CalSTRS Prototype Chatbot
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
              <Avatar>
                <AccountCircleIcon fontSize="large" />
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
                color: "#000",
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
      <FeedbackDialog
        open={feedbackDialogOpen}
        setOpen={setFeedbackDialogOpen}
        onClose={handleDialogClose}
      />
    </AppBar>
  );
}
export default HeaderBar;