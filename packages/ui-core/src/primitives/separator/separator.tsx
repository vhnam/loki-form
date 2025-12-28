import { Separator as SeparatorPrimitive } from '@base-ui/react/separator';

import { cn } from '@repo/ui-core/utils';

type SeparatorProps = SeparatorPrimitive.Props;

type SeparatorOrientation = SeparatorPrimitive.Props['orientation'];

function Separator({ className, orientation = 'horizontal', ...props }: SeparatorProps) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cn(
        'bg-gray-3 shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch',
        className,
      )}
      {...props}
    />
  );
}

export { Separator, type SeparatorProps, type SeparatorOrientation };
