import React, { useState } from 'react'

import If from '@/core/components/conditions/if'
import Tabs, { Tab } from '../tabs'
import BetsTab from './tabs/bets'
import HistoryTab from './tabs/history'
import BestTab from './tabs/best'
import Footer from '@/core/components/footer'

type Props = {
  variant: string
}

export default function TransactionBar({ variant }: Props) {
  const [activeTab, setActiveTab] = useState('bets')

  const tabs: Tab[] = [
    { key: 'bets', title: 'Apostar' },
    { key: 'best', title: 'Jogadores' },
    { key: 'history', title: 'Histórico' },
  ]

  return (
    <div className="h-full py-8">
      <div className="flex flex-col min-h-[400px] flex-1 grow h-full w-full p-3 rounded-md bg-gray-800 border border-gray-600 border-opacity-20 relative bg-opacity-30 dark:bg-opacity-0">
        <section className="w-full flex justify-center ">
          <div className="w-full sm:w-[90%]">
            <Tabs
              tabs={tabs}
              size="w-1/2"
              active={activeTab}
              toggle={setActiveTab}
              variant={variant}
            />
          </div>
        </section>

        <If condition={activeTab == 'bets'}>
          <BestTab />
        </If>

        <If condition={activeTab == 'history'}>
          <HistoryTab />
        </If>

        <If condition={activeTab == 'best'}>
          <BetsTab />
        </If>
      </div>
      <Footer />
    </div>
  )
}
