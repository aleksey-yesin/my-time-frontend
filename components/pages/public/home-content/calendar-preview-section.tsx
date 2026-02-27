import Image from 'next/image';
import { FC } from 'react';
import calendarPreviewImg from '@/public/images/calendar-preview.png';

interface Props {
  className?: string;
}

const CalendarPreviewSection: FC<Props> = ({ className }) => {
  return (
    <section className={className}>
      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-border/50 shadow-2xl">
        <Image
          src={calendarPreviewImg}
          alt="Приклад календаря записів з вибором дати та часу"
          className="h-auto w-full"
          sizes="(max-width: 1024px) 100vw, 1024px"
          priority
        />
      </div>
    </section>
  );
};

export default CalendarPreviewSection;
