import Link from 'next/link';
import { FC } from 'react';
import Container from '@/components/ui-custom/container';
import { Button } from '@/components/ui/button';

interface Props {
  className?: string;
}

const HeroSection: FC<Props> = ({ className }) => {
  return (
    <section className={className}>
      <Container className="grid justify-items-center">
        <h1 className="mb-6 max-w-107 text-center text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:max-w-134 lg:text-6xl">
          Календар записів для{' '}
          <span className="bg-gradient-text-primary bg-clip-text text-transparent">
            ваших послуг
          </span>
        </h1>

        <p className="mb-12 max-w-2xl text-center text-lg text-pretty text-muted-foreground sm:text-xl">
          Керуйте записами клієнтів легко та зручно. Надайте вашим клієнтам
          можливість самостійно обирати зручний час для відвідування.
        </p>

        <Button
          variant="default-gradient"
          size="lg"
          className="h-12 px-8 text-base"
          asChild
        >
          <Link href="/registration">Почати безкоштовно</Link>
        </Button>
      </Container>
    </section>
  );
};

export default HeroSection;
