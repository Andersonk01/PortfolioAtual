import React, { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

export const Wrapper: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="container py-4 border-b border-b-[#ff013c]">{children}</div>
  );
};
