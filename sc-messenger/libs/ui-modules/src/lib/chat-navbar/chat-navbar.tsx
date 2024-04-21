import styles from './chat-navbar.module.scss';
import {Message} from "../chat-list/chat-list";
import { motion } from 'framer-motion';
import {useEventEmitter} from "@messenger/provider";
import {useEffect, useState} from "react";

/* eslint-disable-next-line */
export interface ChatNavbarProps {
  chat: Message | null
}

export function ChatNavbar(props: ChatNavbarProps) {
  const eventEmitter = useEventEmitter();
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  const updateScreenWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', updateScreenWidth);

    return () => {
      window.removeEventListener('resize', updateScreenWidth);
    };
  }, []);


  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex w-full justify-center">
      <nav className="sticky top-0 z-30 bg-white w-[90%] dark:bg-gray-700 border-b border-gray-100 dark:border-gray-600 mx-6 my-4 px-4 rounded-2xl drop-shadow-lg">
        <div className="flex justify-between h-16 items-center">
          <div className="shrink-0 flex items-center">
            { (screenWidth <= 576) &&
              <button type={'button'} onClick={() => eventEmitter.emit('unselect_chat', {})} className="flex bg-transparent hover:bg-gray-200 rounded-md w-10 h-10 items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
            }
            <button type={'button'} className="flex space-x-2 items-center">
              <img src={props.chat?.avatar} className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 cursor-pointer"/>
              <span className="font-bold text-gray-400">{ props.chat?.name }</span>
            </button>
          </div>

          <button className={'h-8 w-8 flex text-gray-700 hover:text-gray-500 items-center justify-center bg-transparent hover:bg-blue-100 ring-0 hover:ring-1 rounded-md'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </nav>
    </motion.div>
  )
}

export default ChatNavbar;
