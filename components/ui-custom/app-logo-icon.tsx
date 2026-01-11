import { ComponentProps, FC } from 'react';

const AppLogoIcon: FC<ComponentProps<'svg'>> = (props) => {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={2}
      {...props}
    >
      <circle cx="13" cy="13" r="9" strokeWidth={2.5} />
      <path
        d="M8 13l3 3 6-6"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M2 4h6M2 8h4M2 12h3" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
};

export default AppLogoIcon;
