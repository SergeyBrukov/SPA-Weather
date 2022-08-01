import React, { FC, ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

// interface ILoyaut {
//   children: ReactNode;
// }

export const Loyaut: FC = () => {
  return (
    <div className="app">
      <Outlet />
    </div>
  );
};
