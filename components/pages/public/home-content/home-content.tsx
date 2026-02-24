import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar, Users, Clock, CheckCircle2 } from 'lucide-react';

const HomeContent: FC = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-background via-muted/20 to-background">
      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main Heading */}
          <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Календар записів для{' '}
            <span className="bg-gradient-text-primary bg-clip-text text-transparent">
              ваших послуг
            </span>
          </h1>

          {/* Subheading */}
          <p className="mx-auto mb-12 max-w-2xl text-pretty text-lg text-muted-foreground sm:text-xl">
            Керуйте записами клієнтів легко та зручно. Надайте вашим клієнтам можливість
            самостійно обирати зручний час для відвідування.
          </p>

          {/* CTA Button */}
          <Button asChild variant="default-gradient" size="lg" className="mb-16 h-12 px-8 text-base">
            <Link href="/registration">Почати безкоштовно</Link>
          </Button>
        </div>

        {/* Calendar Preview Image */}
        <div className="mx-auto mb-20 max-w-5xl">
          <div className="overflow-hidden rounded-2xl border border-border/50 bg-card shadow-2xl">
            <Image
              src="/images/calendar-preview.jpg"
              alt="Приклад календаря записів з вибором дати та часу"
              width={1200}
              height={700}
              className="h-auto w-full"
              priority
            />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Feature 1 */}
          <div className="rounded-xl border border-border/50 bg-card p-6 transition-shadow hover:shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary-soft">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-foreground">Онлайн-запис</h3>
            <p className="text-pretty text-sm text-muted-foreground">
              Клієнти можуть самостійно обирати дату і час запису у зручному календарі
            </p>
          </div>

          {/* Feature 2 */}
          <div className="rounded-xl border border-border/50 bg-card p-6 transition-shadow hover:shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary-soft">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-foreground">Для майстрів</h3>
            <p className="text-pretty text-sm text-muted-foreground">
              Ідеально підходить для перукарів, манікюристів, косметологів та інших
              спеціалістів
            </p>
          </div>

          {/* Feature 3 */}
          <div className="rounded-xl border border-border/50 bg-card p-6 transition-shadow hover:shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary-soft">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-foreground">Гнучкий розклад</h3>
            <p className="text-pretty text-sm text-muted-foreground">
              Налаштуйте свій робочий час та тривалість послуг за власним бажанням
            </p>
          </div>

          {/* Feature 4 */}
          <div className="rounded-xl border border-border/50 bg-card p-6 transition-shadow hover:shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary-soft">
              <CheckCircle2 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-foreground">Просто у використанні</h3>
            <p className="text-pretty text-sm text-muted-foreground">
              Інтуїтивний інтерфейс, який не вимагає навчання або складних налаштувань
            </p>
          </div>
        </div>

        {/* Secondary CTA */}
        <div className="mt-20 text-center">
          <p className="mb-4 text-muted-foreground">Вже маєте аккаунт?</p>
          <Button asChild variant="outline" size="lg">
            <Link href="/login">Увійти в систему</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
