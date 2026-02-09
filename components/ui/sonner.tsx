'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner, type ToasterProps } from 'sonner';
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from 'lucide-react';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      position="top-center"
      icons={{
        success: <CircleCheckIcon className="size-5" />,
        info: <InfoIcon className="size-5" />,
        warning: <TriangleAlertIcon className="size-5" />,
        error: <OctagonXIcon className="size-5" />,
        loading: <Loader2Icon className="size-5 animate-spin" />,
      }}
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          '--border-radius': 'calc(var(--radius) + 4px)',
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: 'font-sans',
          title: 'text-sm',
          description: '!text-muted-foreground',
          actionButton:
            '!bg-primary !text-primary-foreground !rounded-xl !text-sm !px-3 !h-8 hover:!bg-primary/80 !transition-colors !duration-300 !cursor-default',
          cancelButton:
            '!bg-muted !text-muted-foreground !rounded-xl !text-sm !px-3 !h-8 hover:!bg-muted/60 !transition-colors !duration-300 !cursor-default',
          closeButton:
            '!bg-popover !text-muted-foreground !border-border hover:!text-foreground !transition-colors !duration-300 !cursor-default',
          success:
            '!border-success-border [&>[data-icon]]:text-success-foreground',
          error: '!border-error-border [&>[data-icon]]:text-error-foreground',
          warning:
            '!border-warning-border [&>[data-icon]]:text-warning-foreground',
          info: '!border-info-border [&>[data-icon]]:text-info-foreground',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
