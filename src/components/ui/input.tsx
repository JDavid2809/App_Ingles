import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border-2 border-[#e30f28]/30 bg-white px-3 py-2 text-base text-[#00246a] placeholder:text-gray-400 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e30f28] focus-visible:ring-offset-2 transition-all duration-200 shadow-md file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[#00246a] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm hover:border-[#e30f28]/50 hover:bg-[#e30f28]/5",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
