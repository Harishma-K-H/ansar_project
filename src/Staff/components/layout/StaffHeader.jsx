import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  CssBaseline,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Menu } from '@mui/icons-material';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

function StaffHeader() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 
  const navigate = useNavigate()

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };


  const Logout = () =>
  {
    localStorage.removeItem("staff_access_token")
    localStorage.removeItem("staff_id")
    toast.success('Logout Successfully')
    navigate('/staff/staff-login')
  }

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      {/* Sidebar */}
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
        variant={isMobile ? 'temporary' : 'persistent'}
        anchor="left"
        open={openSidebar}
        onClose={() => setOpenSidebar(false)}
        ModalProps={{
          keepMounted: true, 
        }}
      >
        <List>
          <ListItem >
            <ListItemText primary="Developer" />
          </ListItem>
          <ListItem >
            <ListItemText primary="About" />
          </ListItem>
          <ListItem >
            <ListItemText primary="Logout"  onClick={Logout}/>
          </ListItem>
        </List>
      </Drawer>

      {/* Header */}
      <CssBaseline />
      <AppBar position="sticky" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1,backgroundColor:'white',boxShadow:'none' }}>
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="purple"
              aria-label="menu"
              onClick={toggleSidebar}
              sx={{ mr: 1 }}
            >
              <Menu />
            </IconButton>
          )}
          <Typography variant="h6" noWrap sx={{color:'black' }}>
            Ansar
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default StaffHeader;
