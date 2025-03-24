import React from 'react';
import BottomNavbar from './BottomNavbar';
import HeaderSidebar from './HeaderSidebar';
import { Box, ThemeProvider } from '@mui/material';
import theme from '../../common/theme'

function UserLayout({ children }) {
  return (
      <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh',overflow: "hidden", paddingBottom: '3rem' }}>
      {/* Header and Sidebar */}
      <HeaderSidebar />

      {/* Main Content Area */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: 1,
          backgroundColor: '#fbfbfb',
        }}
      >
        {children}
      </Box>

      {/* Bottom Navbar */}
      <BottomNavbar />
    </Box>
    </ThemeProvider>
  );
}

export default UserLayout;
