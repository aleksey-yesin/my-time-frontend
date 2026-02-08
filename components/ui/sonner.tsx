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
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "font-sans !rounded-lg !border !border-border/60 !shadow-md !bg-card !text-card-foreground",
          title: "!text-sm !font-medium",
          description: "!text-xs !text-muted-foreground",
          actionButton:
            "!bg-primary !text-primary-foreground !rounded-md !text-xs !font-medium !px-2.5 !h-7 hover:!opacity-90 !transition-opacity !duration-300 !border-0",
          cancelButton:
            "!bg-muted !text-muted-foreground !rounded-md !text-xs !font-medium !px-2.5 !h-7 hover:!bg-muted/80 !transition-colors !duration-300 !border-0",
          closeButton:
            "!bg-card !text-muted-foreground !border-border/60 hover:!text-foreground hover:!border-border !transition-colors !duration-300",
          success: "!border-emerald-500/30 [&>[data-icon]]:!text-emerald-600",
          error:
            "!border-destructive/30 [&>[data-icon]]:!text-destructive",
          warning:
            "!border-amber-500/30 [&>[data-icon]]:!text-amber-600",
          info: "!border-blue-500/30 [&>[data-icon]]:!text-blue-600",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
