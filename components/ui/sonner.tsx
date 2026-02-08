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
      position="top-center"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
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
          title: "text-[15px] font-medium",
          description: "text-[13px] text-muted-foreground",
          actionButton:
            "bg-primary text-primary-foreground rounded-xl text-sm font-medium px-3 h-8 hover:opacity-90 transition-opacity duration-300",
          cancelButton:
            "bg-muted text-muted-foreground rounded-xl text-sm font-medium px-3 h-8 hover:bg-muted/80 transition-colors duration-300",
          closeButton:
            "bg-popover text-muted-foreground border-border hover:text-foreground hover:border-border transition-colors duration-300",
          success: "border-success-border [&>[data-icon]]:text-success-foreground",
          error: "border-error-border [&>[data-icon]]:text-error-foreground",
          warning: "border-warning-border [&>[data-icon]]:text-warning-foreground",
          info: "border-info-border [&>[data-icon]]:text-info-foreground",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
