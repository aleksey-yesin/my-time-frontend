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
          '--width': '384px',
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          '--border-radius': 'calc(var(--radius) + 4px)',
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast:
            'font-sans *:data-button:h-8! *:data-button:cursor-default! *:data-button:rounded-xl! *:data-button:px-3! *:data-button:text-sm! *:data-button:transition-colors! *:data-button:duration-300!',
          title: 'text-sm',
          description: 'text-muted-foreground!',
          closeButton:
            'cursor-default! border-border! bg-popover! text-muted-foreground! transition-colors! duration-300! hover:text-popover-foreground!',

          actionButton:
            'bg-primary! text-primary-foreground! hover:bg-primary/80!',
          cancelButton: 'bg-muted! text-muted-foreground! hover:bg-muted/60!',

          success: 'border-success-border! text-success-soft-foreground!',
          error: 'border-error-border! text-error-soft-foreground!',
          warning: 'border-warning-border! text-warning-soft-foreground!',
          info: 'border-info-border! text-info-soft-foreground!',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
