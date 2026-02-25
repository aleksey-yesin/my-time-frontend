import Container from '@/components/ui-custom/container';
import { Calendar, CheckCircle2, Clock, Users } from 'lucide-react';
import { FC } from 'react';

interface Props {
  className?: string;
}

const FeaturesSection: FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <Container className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {/* Feature 1 */}
        <div className="rounded-xl border border-border/50 bg-card p-6 transition-shadow hover:shadow-lg">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary-soft">
            <Calendar className="h-6 w-6 text-primary" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-foreground">
            Онлайн-запис
          </h3>
          <p className="text-sm text-pretty text-muted-foreground">
            Клієнти можуть самостійно обирати дату і час запису у зручному
            календарі
          </p>
        </div>

        {/* Feature 2 */}
        <div className="rounded-xl border border-border/50 bg-card p-6 transition-shadow hover:shadow-lg">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary-soft">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-foreground">
            Для майстрів
          </h3>
          <p className="text-sm text-pretty text-muted-foreground">
            Ідеально підходить для перукарів, манікюристів, косметологів та
            інших спеціалістів
          </p>
        </div>

        {/* Feature 3 */}
        <div className="rounded-xl border border-border/50 bg-card p-6 transition-shadow hover:shadow-lg">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary-soft">
            <Clock className="h-6 w-6 text-primary" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-foreground">
            Гнучкий розклад
          </h3>
          <p className="text-sm text-pretty text-muted-foreground">
            Налаштуйте свій робочий час та тривалість послуг за власним бажанням
          </p>
        </div>

        {/* Feature 4 */}
        <div className="rounded-xl border border-border/50 bg-card p-6 transition-shadow hover:shadow-lg">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary-soft">
            <CheckCircle2 className="h-6 w-6 text-primary" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-foreground">
            Просто у використанні
          </h3>
          <p className="text-sm text-pretty text-muted-foreground">
            Інтуїтивний інтерфейс, який не вимагає навчання або складних
            налаштувань
          </p>
        </div>
      </Container>
    </div>
  );
};

export default FeaturesSection;
