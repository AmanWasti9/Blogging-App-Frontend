import React from 'react';
import { useMediaQuery } from '@mui/material';
import MobileRegister from './MobileRegister';
import RegisterAndLogin from './RegisterAndLogin';

export default function ResponsiveForm() {
    // Define the breakpoint
  const isMobile = useMediaQuery('(max-width: 760px)');

  return (
    <>
    {isMobile ? <MobileRegister /> : <RegisterAndLogin />}
  </>
  );
}
