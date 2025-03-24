import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { Home,  AccountCircle,  FormatListBulleted, HistoryRounded } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function StaffBottomBar() {
  const [value, setValue] = useState(0);

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        borderRadius: '13px 13px 0px 0px',  
        overflow: 'hidden',
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        sx={{
          backgroundColor: '#ffffff',
        }}
      >
        <BottomNavigationAction label="Home" icon={<Home />} component={Link} to="/tech-support/tech-support-home" />
        <BottomNavigationAction label="Complaints" icon={<FormatListBulleted />} component={Link} to="/tech-support/tech-support-tasks" />
        <BottomNavigationAction label="Requests" icon={<HistoryRounded />} component={Link} to="/tech-support/tech-support-request" />
        <BottomNavigationAction label="Profile" icon={<AccountCircle />} component={Link} to="/tech-support/tech-support-profile" />
      </BottomNavigation>
    </Paper>
  );
}

export default StaffBottomBar;
