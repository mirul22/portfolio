import React, { FC } from 'react';

export const Layout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="min-h-screen bg-lightTheme font-sans transition-colors dark:bg-darkTheme">{children}</div>;
};
