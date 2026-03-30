import type { ReactNode } from 'react'

export function DeviceFrame({ children }: { children: ReactNode }) {
  return (
    <div className="w-[393px] h-[852px] relative overflow-hidden mx-auto bg-c0 font-['Gotham','-apple-system','BlinkMacSystemFont','SF_Pro_Display','Inter',sans-serif] antialiased">
      {children}
    </div>
  )
}
