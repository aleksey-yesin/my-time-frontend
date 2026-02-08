"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
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
          '--border-radius': 'var(--radius)',
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast:
            "rounded-xl border border-border shadow-md backdrop-blur-sm",
          title: "text-sm font-medium",
          description: "text-xs text-muted-foreground",
          actionButton:
            "bg-primary text-primary-foreground rounded-lg text-xs font-medium px-3 h-8 hover:opacity-90 transition-opacity duration-300",
          cancelButton:
            "bg-muted text-muted-foreground rounded-lg text-xs font-medium px-3 h-8 hover:bg-muted/80 transition-colors duration-300",
          closeButton:
            "bg-popover text-muted-foreground border-border hover:text-foreground hover:border-border transition-colors duration-300",
          success: "[&>[data-icon]]:text-toast-success",
          error: "[&>[data-icon]]:text-toast-error",
          warning: "[&>[data-icon]]:text-toast-warning",
          info: "[&>[data-icon]]:text-toast-info",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
