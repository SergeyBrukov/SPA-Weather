import { Alert } from '@mui/material';
import React, { FC } from 'react';

interface ICustomAlert {
  severityType?: any;
  message: string;
}

export const CustomAlert: FC<ICustomAlert> = ({ severityType = 'warning', message }) => {
  return (
    <Alert
      className="custom-alert"
      severity={severityType}
      sx={{ textTransform: 'capitalize', margin: '15px auto', maxWidth: '400px' }}>
      {message}
    </Alert>
  );
};
