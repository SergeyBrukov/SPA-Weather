import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

export const Progres = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}>
      <CircularProgress />
    </Box>
  );
};
