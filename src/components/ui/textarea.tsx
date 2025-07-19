import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border-2 border-[#e30f28]/30 bg-white px-3 py-2 text-base text-[#00246a] placeholder:text-gray-400 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e30f28] focus-visible:ring-offset-2 transition-all duration-200 shadow-md disabled:cursor-not-allowed disabled:opacity-50 md:text-sm hover:border-[#e30f28]/50 hover:bg-[#e30f28]/5",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
