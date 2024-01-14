import React, { useContext, useEffect } from 'react'

import If from '../../../../core/components/conditions/if'
import { CrashGameContext } from '@/core/providers/games/crash-game.provider'
type Props = {
  show: boolean
}

export const Message = ({ show }: Props) => {
  const { messages, playerName } = useContext(CrashGameContext)

  return (
    <If condition={show}>
      <div className="chat chat-end w-full bottom-3 right-3 absolute z-50 animate-[wiggle_1s_ease-in-out_infinite]">
        <div className="chat-image avatar">
          <div className="w-5 rounded-full">
            <img src="https://www.fiscalti.com.br/wp-content/uploads/2021/02/default-user-image.png" />
          </div>
        </div>

        <div className="chat-bubble min-h-0 text-xs/[12px] bg-black text-white w-50 bg-opacity-70 truncate">
          Última mensagem --- User{messages[messages.length - 1].userId} :{' '}
          {messages[messages.length - 1].message}
        </div>
      </div>
    </If>
  )
}
