import { FC } from 'react';
import { Button } from '@/components/ui/button';
import GoogleIcon from './google-icon';

const GoogleButton: FC = () => {
  return (
    <Button variant="outline" className="h-12 w-full gap-2.5" type="button">
      <GoogleIcon className="size-5" />
      Продовжити з Google
    </Button>
  );
};

export default GoogleButton;
