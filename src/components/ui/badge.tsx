import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#e30f28]/30 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#e30f28] text-white shadow hover:bg-[#e30f28]/90",
        secondary:
          "border-transparent bg-[#00246a] text-white shadow hover:bg-[#00246a]/90",
        destructive:
          "border-transparent bg-red-600 text-white shadow hover:bg-red-700",
        outline: "border-[#e30f28] text-[#e30f28] bg-white hover:bg-[#e30f28]/10 hover:border-[#e30f28]",
        rainbow: "border-transparent bg-[#e30f28] text-white shadow hover:bg-[#e30f28]/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
