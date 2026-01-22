'use client'
// This component is used to display the total number of items in a list.
interface TotalItemsProps {
  total: number
}

export function TotalItems({ total }: TotalItemsProps) {
  return (
    <div className="flex items-center justify-end pb-4">
      <p className="pr-3">
        Total: <span className="font-bold text-primary">{total}</span>
      </p>
    </div>
  )
}
