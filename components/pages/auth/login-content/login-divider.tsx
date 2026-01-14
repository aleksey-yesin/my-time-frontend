import { FC } from 'react';

const LoginDivider: FC = () => {
  return (
    <div className="relative py-3">
      {/* Line */}
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t" />
      </div>
      {/* Text */}
      <div className="relative flex justify-center">
        <p className="bg-card px-3 text-xs font-medium text-muted-foreground uppercase">
          или
        </p>
      </div>
    </div>
  );
};

export default LoginDivider;
