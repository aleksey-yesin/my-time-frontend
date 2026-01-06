import { FC, PropsWithChildren } from 'react';

const AuthLayoutContent: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background">
      {/* Large gradient background shapes */}
      <div className="beauty-gradient-soft animate-pulse-slow absolute top-[-10%] right-[-5%] h-[700px] w-[700px] rounded-full opacity-40 blur-3xl" />
      <div
        className="beauty-gradient-soft animate-pulse-slow absolute bottom-[-15%] left-[-10%] h-[800px] w-[800px] rounded-full opacity-35 blur-3xl"
        style={{ animationDelay: '2s' }}
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
