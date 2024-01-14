import React, { useState, useEffect, useRef, useContext } from 'react'
import { CrashGameContext } from '@/core/providers/games/crash-game.provider'

type Props = {
  game: string
  balance: string
  name: string
  executeAction: Function
  openChatHandler?: Function
}

import If from '../conditions/if'
import {
  QuestionMarkCircleIcon,
  Bars3Icon,
  ChatBubbleLeftIcon,
} from '@heroicons/react/24/outline'
import { getGameLogo, getHowToPlay } from '@/core/helpers'
import GameLimitsModal from '../provably-fair/game-limits'
import { Chat } from '../chat'

export default function Navbar({
  game,
  balance,
  executeAction,
}: Props) {
  const HowToPlay = getHowToPlay(game)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showChat, setShowChat] = useState(false)
  const [showGameLimitsModal, setShowGameLimitsModal] =
    useState<boolean>(false)

  const [animationEnabled, setAnimationEnabled] = useState(true)
  const [musicEnabled, setMusicEnabled] = useState(true)
  const [audioContextAllowed, setAudioContextAllowed] = useState(true) //////////////////////////////////////

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const { soundEnabled, setSoundEnabled, soundClick, playerName } =
    useContext(CrashGameContext)

  const handleSoundEnabled = (event) => {
    const { checked } = event.target
    executeAction(checked ? 'soundsOn' : 'soundsOff')
    setSoundEnabled(checked)
  }

  const handleMusicEnabled = (event) => {
    const { checked } = event.target

    executeAction(checked ? 'musicOn' : 'musicOff')
    setMusicEnabled(checked)
  }

  const handleAnimationEnabled = (event) => {
    const { checked } = event.target
    executeAction(checked ? 'animationOff' : 'animationOn')
    setAnimationEnabled(checked)
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
    soundClick()
  }

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick)

    setTimeout(() => {
      if (window.AudioContext == false) {
        setAudioContextAllowed(false)
      }
    }, 2000)
    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  const handleOutsideClick = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setIsDropdownOpen(false)
    }
    setAudioContextAllowed(false)
  }

  const isMobileDevice =
    /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )

  React.useEffect(() => {
    localStorage.dark === 'dark'
      ? document.documentElement.classList.add('dark')
      : undefined
  }, [])

  return (
    <div className="">
      <div className="navbar mx-auto  my-auto sm:px-3 h-12 flex items-center w-full justify-end">
        <h1 className="self-center">
          {getGameLogo(game)}
          <span className="flex  items-center text-black dark:text-white text-sm/[12px] ml-5 before:content-[''] before:rounded-full before:ml-0.5 before:text-red-500 before:w-2 before:block before:h-2 before:mr-2 before:bg-lime-700 block text-sm font-medium text-slate-700 hidden sm:flex">
            100
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 ml-1 text-black dark:text-white hidden sm:block"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </h1>

        <div className="flex items-center ml-auto gap-2">
          <button
            onClick={() => {
              setShowModal(!showModal)
              soundClick()
            }}
            className="btn btn-sm py-1 px-2 flex items-center text-gray-500 btn-black dark:btn-warning text-white gap-1 rounded-md capitalize text-sm font-normal"
          >
            <QuestionMarkCircleIcon className="h-5 w-5" />
            <span className="hidden sm:inline">Como Jogar?</span>
          </button>

          <div className="text-sm text-center text-black dark:text-white font-bold mr-1 border border-black dark:border-white btn-sm py-1 px-2 flex items-center gap-1 rounded-md capitalize text-sm font-normal">
            <span className="player-currency">R$</span>{' '}
            <span className="balance">{balance}</span>
          </div>

          <div className="dropdown dropdown-end" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="btn btn-sm px-1 btn-ghost text-black dark:text-white"
            >
              <Bars3Icon className="w-6 h-6 bg-opacity-50" />
            </button>

            {isDropdownOpen && (
              <div className="mt-2 menu menu-compact bg-opacity-0 rounded py-2 w-[280px] max-w-[300px] absolute top-[30px] right-[30px] z-10 chat-container">
                <div className="flex gap-4 p-4">
                  <img
                    src="https://api.multiavatar.com/NOME.svg"
                    className="h-12 invert rounded-lg"
                  />
                  <div className="mt-1">
                    <p className="font-bold text-xs text-white">
                      {/* Nome do Jogador */}
                      {playerName}
                    </p>
                    <p className="text-xs flex mt-1">
                      <span className="block mt-1 mr-2 rounded-full bg-green-600 h-2 w-2"></span>{' '}
                      <span className="opacity-50">Online agora</span>
                    </p>
                  </div>
                </div>
                <div className="px-2 text-xs item">
                  <div className="form-control">
                    <label className="label hover:font-bold cursor-pointer">
                      <span className="label-text text-xs opacity-90">
                        Sons
                      </span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={soundEnabled}
                          onChange={handleSoundEnabled}
                          className="sr-only peer"
                        />
                        <div className="w-8 h-4 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-transparent rounded-full peer bg-black peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[0px] after:left-[0px] after:bg-gray-300 after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </label>
                  </div>
                </div>
                <div className="px-2 text-xs item">
                  <div className="form-control">
                    <label className="label hover:font-bold cursor-pointer">
                      <span className="label-text text-xs opacity-90">
                        Música
                      </span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={musicEnabled}
                          onChange={handleMusicEnabled}
                          className="sr-only peer"
                        />
                        <div className="w-8 h-4 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-transparent rounded-full peer bg-black peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[0px] after:left-[0px] after:bg-gray-300 after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </label>
                  </div>
                </div>

                <div
                  className="px-3 cursor-pointer py-3 text-sm hover:font-bold text-xs item"
                  onClick={() => {
                    setShowGameLimitsModal(!showGameLimitsModal)
                    soundClick()
                  }}
                >
                  <label className="cursor-pointer text-white text-xs opacity-75">
                    Limites de Jogo
                  </label>
                </div>

                <a
                  className="px-3 cursor-pointer py-3 text-sm hover:font-bold text-xs item"
                  href=""
                >
                  <label className="cursor-pointer text-white text-xs opacity-75">
                    Suporte ao jogador Hypetech
                  </label>
                </a>
              </div>
            )}
          </div>
          <button
            className="btn btn-sm px-1 btn-ghost text-black dark:text-white"
            onClick={() => {
              setShowChat(!showChat)
              soundClick()
            }}
          >
            <ChatBubbleLeftIcon className="w-6 h-6 bg-opacity-50" />
          </button>
          <label className="relative text-black inline-flex items-center cursor-pointer mb-1">
            <input
              onClick={() => {
                if (
                  document.documentElement.classList[0] === 'dark'
                ) {
                  document.documentElement.classList.remove('dark')
                  localStorage.setItem('dark', '')
                } else {
                  document.documentElement.classList.add('dark')
                  localStorage.setItem('dark', 'dark')
                }
              }}
              type="checkbox"
              value=""
              className="sr-only peer"
            />
            <div className="w-10 h-5">
              {document.documentElement.classList[0] == 'dark' ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="white"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                  />
                </svg>
              )}
            </div>
          </label>
        </div>
      </div>

      <HowToPlay show={showModal} toggle={setShowModal} />

      <GameLimitsModal
        show={showGameLimitsModal}
        toggle={setShowGameLimitsModal}
      />

      <Chat show={showChat} />
    </div>
  )
}
