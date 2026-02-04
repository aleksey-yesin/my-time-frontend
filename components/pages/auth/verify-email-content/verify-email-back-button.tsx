import { FC } from 'react';
import { ArrowLeftIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  onClick: () => void;
}

const VerifyEmailBackButton: FC<Props> = ({ onClick }) => {
  return (
    <Button
      variant="ghost"
      className="h-12 w-full text-base text-muted-foreground"
      type="button"
      onClick={onClick}
    >
      <ArrowLeftIcon className="mr-2 h-4 w-4" />
      Змінити email
    </Button>
  );
};

export default VerifyEmailBackButton;
