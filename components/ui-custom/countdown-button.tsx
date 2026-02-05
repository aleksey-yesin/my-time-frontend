import { FC, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

type CountdownUpdater = (seconds: number) => number;

type CountdownButtonProps = {
  countdown: number;
  onCountdownChange: (updater: CountdownUpdater) => void;
  text: string;
  isPending?: boolean;
} & React.ComponentProps<typeof Button>;

const CountdownButton: FC<CountdownButtonProps> = ({
  countdown,
  onCountdownChange,
  text,
  isPending,
  ...buttonProps
}) => {
  useEffect(() => {
    if (countdown <= 0) return;

    const timeout = setTimeout(() => {
      onCountdownChange((seconds) => seconds - 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [countdown, onCountdownChange]);

  return (
    <Button
      type="button"
      disabled={countdown > 0 || isPending}
      {...buttonProps}
    >
      {isPending && <Spinner />}
      {countdown > 0 ? `${text} (${countdown}с)` : text}
    </Button>
  );
};

export default CountdownButton;
