import { FC } from 'react';

/******************************************************************************
 * This component needs to be revised to:
 * - use Separator from shadcn (?)
 * - improve semantics
 * - simplify
 */

export interface SeparatorWithTextProps {
  text: string;
}

const SeparatorWithText: FC<SeparatorWithTextProps> = ({ text }) => {
  return (
    <div className="relative py-3">
      {/* Line */}
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t" />
      </div>
      {/* Text */}
      <div className="relative flex justify-center">
        <p className="bg-card px-3 text-xs font-medium text-muted-foreground uppercase">
          {text}
        </p>
      </div>
    </div>
  );
};

export default SeparatorWithText;
