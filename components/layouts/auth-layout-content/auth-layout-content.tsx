import { FC, PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

const twLargeShapesGradient =
  'bg-[linear-gradient(135deg,oklch(from_var(--primary)_l_c_h_/_0.15)_0%,oklch(from_var(--secondary)_l_c_h_/_0.12)_50%,oklch(from_var(--accent)_l_c_h_/_0.1)_100%)]';
const twLargeShapesAnimation =
  'animate-[large-shapes-pulse_4s_ease-in-out_infinite_backwards]';
const twGeometricShapesAnimation =
  'animate-[geometric-shapes-float_6s_ease-in-out_infinite]';

const AuthLayoutContent: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* One-time animations, kept it here */}
      <style>
        {`
          @keyframes large-shapes-pulse {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; }
          }
          @keyframes geometric-shapes-float {
            0%, 100% { transform: translateY(0px) scale(1); }
            50% { transform: translateY(-20px) scale(1.05); }
          }
        `}
      </style>
      {/* Large background shapes */}
      <div
        className={cn(
          twLargeShapesGradient,
          twLargeShapesAnimation,
          'absolute top-[-10%] right-[-5%] h-175 w-175 rounded-full blur-3xl',
        )}
      />
      <div
        className={cn(
          twLargeShapesGradient,
          twLargeShapesAnimation,
          'absolute bottom-[-15%] left-[-10%] h-200 w-200 rounded-full blur-3xl delay-2000',
        )}
      />
      {/* Floating geometric shapes */}
      <div
        className={cn(
          twGeometricShapesAnimation,
          'absolute top-[15%] left-[10%] h-24 w-24 rotate-45 rounded-2xl border-4 border-primary/30',
        )}
      />
      <div
        className={cn(
          twGeometricShapesAnimation,
          'absolute right-[8%] bottom-[20%] h-32 w-32 rotate-12 rounded-3xl border-4 border-secondary/30 delay-1500',
        )}
      />
      <div
        className={cn(
          twGeometricShapesAnimation,
          'absolute top-[50%] left-[5%] h-16 w-16 rounded-full bg-linear-to-br from-accent/30 to-primary/30 delay-3000',
        )}
      />
      <div
        className={cn(
          twGeometricShapesAnimation,
          'absolute top-[30%] right-[15%] h-20 w-20 rotate-45 rounded-2xl bg-linear-to-br from-secondary/25 to-accent/25 delay-500',
        )}
      />
      {/* Page content */}
      <main className="mx-4 w-full max-w-md">{children}</main>
    </div>
  );
};

export default AuthLayoutContent;
