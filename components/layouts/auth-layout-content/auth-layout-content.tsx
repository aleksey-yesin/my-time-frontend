import { FC, PropsWithChildren } from 'react';

const backgroundShapesGradient = `
  linear-gradient(
    135deg,
    oklch(from var(--primary) l c h / 0.15) 0%,
    oklch(from var(--secondary) l c h / 0.12) 50%,
    oklch(from var(--accent) l c h / 0.1) 100%
  )
`;

const AuthLayoutContent: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Large background shapes */}
      <div
        className="animate-pulse-slow absolute top-[-10%] right-[-5%] h-175 w-175 rounded-full blur-3xl"
        style={{
          background: backgroundShapesGradient,
        }}
      />
      <div
        className="animate-pulse-slow absolute bottom-[-15%] left-[-10%] h-200 w-200 rounded-full blur-3xl"
        style={{
          background: backgroundShapesGradient,
          animationDelay: '2s',
        }}
      />

      {/* Floating geometric shapes */}
      <div className="animate-float absolute top-[15%] left-[10%] h-24 w-24 rotate-45 rounded-2xl border-4 border-primary/30" />
      <div
        className="animate-float absolute right-[8%] bottom-[20%] h-32 w-32 rotate-12 rounded-3xl border-4 border-secondary/30"
        style={{ animationDelay: '1.5s' }}
      />
      <div
        className="animate-float absolute top-[50%] left-[5%] h-16 w-16 rounded-full bg-gradient-to-br from-accent/30 to-primary/30"
        style={{ animationDelay: '3s' }}
      />
      <div
        className="animate-float absolute top-[30%] right-[15%] h-20 w-20 rotate-45 rounded-2xl bg-gradient-to-br from-secondary/25 to-accent/25"
        style={{ animationDelay: '0.5s' }}
      />

      <main>{children}</main>
    </div>
  );
};

export default AuthLayoutContent;
