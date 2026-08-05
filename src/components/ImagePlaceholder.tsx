import { cn } from '@/lib/utils'

type ImagePlaceholderProps = {
  className?: string
  label?: string
}

export function ImagePlaceholder({
  className,
  label = 'Image placeholder',
}: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        'bg-[color-mix(in_srgb,var(--beige)_45%,var(--muted))]',
        className,
      )}
    />
  )
}
