import Link from 'next/link';
import { FC } from 'react';
import Container from '@/components/ui-custom/container';
import { Button } from '@/components/ui/button';

interface Props {
  className?: string;
}

const SecondaryCtaBlock: FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <Container className="text-center">
        <p className="mb-4 text-muted-foreground">Вже маєте аккаунт?</p>

        <Button variant="outline" size="lg" asChild>
          <Link href="/login">Увійти в систему</Link>
        </Button>
      </Container>
    </div>
  );
};

export default SecondaryCtaBlock;
