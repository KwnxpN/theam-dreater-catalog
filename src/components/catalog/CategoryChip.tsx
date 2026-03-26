import type { ButtonHTMLAttributes } from "react"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"

type CategoryChipProps = {
  name: string
  isSelected?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

const CategoryChip = ({ name, isSelected = false, className, ...props }: CategoryChipProps) => {
  return (
    <Button
      className={cn(
        "rounded-full px-6 h-10 text-sm font-semibold transition-colors duration-200 focus:outline-none",
        isSelected
          ? "bg-primary text-primary-foreground"
          : "bg-[#f6e8df] text-[#1f2d42] hover:bg-[#ddd1c6] dark:bg-[#1c1411] dark:text-primary-foreground dark:hover:bg-[#2c1f1a] dark:border dark:border-[#261f1c]",
        className,
      )}
      {...props}
    >
      {name}
    </Button>
  )
}

export default CategoryChip