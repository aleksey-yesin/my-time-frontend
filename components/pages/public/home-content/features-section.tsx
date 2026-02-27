import { Calendar, CheckCircle2, Clock, Users } from 'lucide-react';
import { FC } from 'react';
import Container from '@/components/ui-custom/container';
import { cn } from '@/lib/utils';

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  text: string;
}
interface Props {
  className?: string;
}

const getFeatureItems = (): FeatureItem[] => {
  return [
    {
      icon: <Calendar />,
      title: 'Онлайн-запис',
      text: 'Клієнти можуть самостійно обирати дату і час запису у зручному календарі',
    },
    {
      icon: <Users />,
      title: 'Для майстрів',
      text: 'Ідеально підходить для перукарів, манікюристів, косметологів та інших спеціалістів',
    },
    {
      icon: <Clock />,
      title: 'Гнучкий розклад',
      text: 'Налаштуйте свій робочий час та тривалість послуг за власним бажанням',
    },
    {
      icon: <CheckCircle2 />,
      title: 'Просто у використанні',
      text: 'Інтуїтивний інтерфейс, який не вимагає навчання або складних налаштувань',
    },
  ];
};

const FeaturesSection: FC<Props> = ({ className }) => {
  const featureItems = getFeatureItems();

  return (
    <section className={cn('relative', className)}>
      <Container>
        <h2 className="sr-only">Переваги та особливості сервісу</h2>

        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featureItems.map((item) => (
            <li
              key={item.title}
              className="rounded-xl border border-border/50 bg-card p-6"
            >
              <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-gradient-primary-soft text-primary">
                {item.icon}
              </div>
              <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-pretty text-muted-foreground">
                {item.text}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};

export default FeaturesSection;
