import React, { useEffect, useState } from 'react'
import Controls from '@/core/components/controls/crash-control'

export default function BestTab() {
  return (
    <div className="w-full h-full">
      <section className="flex justify-center items-center h-full">
        <div className="px-3 rounded py-2 uppercase text-xs">
          <Controls color="lime" position={'center'} />
        </div>
      </section>
    </div>
  )
}
