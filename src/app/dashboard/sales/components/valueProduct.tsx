'use client'
interface ValueProductProps {
  title: string,
  value: number | string,
}

export function ValueProduct({ title, value }: ValueProductProps) {
  return (
    <div className="grid grid-cols-1 w-full rounded-xl bg-backgroundFields relative h-full">

      {/* Header */}
      <header
        className="flex items-center justify-center w-full shadow-lg rounded-t-xl bg-backgroundSecundary absolute top-0 default:h-6 lg:h-10">
        <h1 className="font-medium">{title}</h1>
      </header>
      <div className="flex items-center justify-end pr-4 text-2xl font-medium default:mt-3 lg:mt-6">
        <span>{value}</span>
      </div>
    </div>
  )
}