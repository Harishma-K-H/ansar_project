import React from 'react';
import { Box, ThemeProvider } from '@mui/material';
import theme from '../../../common/theme'
import StaffBottomBar from './StaffBottomBar';
import StaffHeader from './StaffHeader';

function StaffLayout({ children }) {
  return (
      <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: "hidden", paddingBottom: '3rem' }}>
      {/* Header and Sidebar */}
      <StaffHeader/>

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
      <StaffBottomBar/>
    </Box>
    </ThemeProvider>
  );
}

export default StaffLayout;
