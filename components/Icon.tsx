import React from 'react';

const iconPaths: { [key: string]: React.ReactNode } = {
  ngFlag: (
    <>
      <rect width="300" height="200" fill="#fff"/>
      <rect width="100" height="200" fill="#008751"/>
      <rect x="200" width="100" height="200" fill="#008751"/>
    </>
  ),
  search: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
  tradeIn: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />,
  user: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />,
  cart: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />,
  chevronDown: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />,
  filter: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L14 14.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 018 17v-2.586L1.293 6.707A1 1 0 011 6V4z" />,
  check: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />,
  info: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
};

export const Icon: React.FC<{ icon: string; className?: string }> = ({ icon, className }) => {
  if (!iconPaths[icon]) return null;
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200">
      {iconPaths[icon]}
    </svg>
  );
};

export const SvgIcon: React.FC<{ icon: string; className?: string }> = ({ icon, className }) => {
  if (!iconPaths[icon]) return null;
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      {iconPaths[icon]}
    </svg>
  );
};
