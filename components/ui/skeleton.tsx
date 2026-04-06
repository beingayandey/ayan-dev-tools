import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "bg-accent rounded-md animate-shimmer bg-[linear-gradient(90deg,transparent,rgba(99,102,241,0.1),transparent)] bg-[length:200%_100%] bg-[-200%_0] motion-safe:animate-[shimmer_2s_linear_infinite]",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
