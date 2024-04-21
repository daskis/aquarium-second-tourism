import styles from './message-input.module.scss';
import {ChatsListMessage} from "../chat-list/chat-list";
import React, {Component, KeyboardEvent, useRef, useState} from 'react';
import {useEventEmitter} from "@messenger/provider";
import {MessageCreateFormInput, submitCreateMessage} from "@messenger/api";
import { motion } from 'framer-motion';
import Recorder from 'recorder-js';
import {STICKERS} from "@messenger/stickers";


/* eslint-disable-next-line */
export interface MessageInputProps {
  chat: ChatsListMessage,
  MessageType: string;
}

export function MessageInput(props: MessageInputProps) {
  const eventEmitter = useEventEmitter();

  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isOpenSelectAbstractMessageContent, setIsOpenSelectAbstractMessageContent] = useState<boolean>(false);
  const [selectAbstractMessageContentTab, setSelectAbstractMessageContentTab] = useState<string>('emoji'); // emoji, sticker, gif

  const [messageType, setMessageType] = useState<string>(props.MessageType ? props.MessageType : 'text');
  const [message, setMessage] = useState<string>('');

  const sendSticker = (stickerUUID: string) => {
    setMessage(stickerUUID);
    sendMessage('sticker', stickerUUID);
  }

  function successCreated(data:any) {
    setMessage(""); setIsOpenSelectAbstractMessageContent(false);
    setIsCreating(false);
    eventEmitter.emit('created_message', data);
  }

  const sendMessage = (type: string, msg: string) => {
    setIsCreating(true);
    if (msg.length === 0) {
      alert("Message is empty");
      return;
    }
    const data: MessageCreateFormInput = {
      text: msg,
      type: type,
      activityUUID: null,
      messageReplyUUID: null,
      attachments: null,
      chatUUID: props.chat.uuid,
    }
    const result = submitCreateMessage(data);
    console.log(result);
    if (result) successCreated(result);
  }

  const handleKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.currentTarget.value === 'Enter') {
      // event.preventDefault();
      sendMessage('text', message);
      console.log(event.currentTarget.value);
    }
  };

  const handleInpuChange = (event: any) => {
    setMessage(event.currentTarget.value);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={'absolute bottom-0 w-full z-30 bg-transparent md:w-3/4 lg:w-3/4 xl:w-3/4 flex items-center justify-center'}>
      <nav className="bg-white w-full md:w-[40%] lg:w-[40%] xl:w-[40%] max-w-xl dark:bg-gray-700 border-b border-gray-100 dark:border-gray-600 mx-6 md:mx-0 my-4 px-4 rounded-2xl drop-shadow-lg">
        {
          isOpenSelectAbstractMessageContent &&
          <div>
            <div className="grid grid-cols-4 gap-4 h-[250px] overflow-y-scroll pt-4">
              {
                STICKERS.map((sticker, index) => (
                  <div className="p-2 flex items-center justify-center bg-transparent hover:bg-gray-200 rounded-md cursor-pointer" onClick={() => sendSticker(sticker.uuid)} key={index}>
                    <img src={"./stickers/" + sticker.identificator +".gif"} className={'h-24 w-24'} alt=""/>
                  </div>
                ))
              }
            </div>
          </div>
        }

        <div className="flex justify-between h-16 items-center">


          <div className="shrink-0 flex items-center">
            <button type={'button'} className="h-8 w-8 flex text-gray-700 hover:text-gray-500 items-center justify-center bg-transparent hover:bg-blue-50 ring-0 hover:ring-1 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />
              </svg>
            </button>
          </div>


          <div className="max-w-xl mx-1 mt-2 w-full">
            <textarea
              className="bg-white p-4 rounded resize-none rounded-lg border-transparent flex-1 appearance-none w-full bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 hover:ring-blue-300 focus:border-transparent"
              onKeyDown={handleKeyPress}
              onChange={handleInpuChange}
              rows={1}
              placeholder="Message..."
              value={message}
            />
          </div>


          <div className="flex space-x-2">
            <button onClick={() => setIsOpenSelectAbstractMessageContent(!isOpenSelectAbstractMessageContent)} type={'button'} className="h-8 w-8 flex text-gray-700 hover:text-gray-500 items-center justify-center bg-transparent hover:bg-blue-50 ring-0 hover:ring-1 rounded-md">
              <img src="./star.gif" className={'h-6 w-6'} alt=""/>
            </button>
            {
              message.length > 0 ? (
                <button type={'button'} onClick={() => sendMessage('text', message)} className="h-8 w-8 flex text-gray-700 hover:text-gray-500 items-center justify-center bg-transparent hover:bg-blue-50 ring-0 hover:ring-1 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </button>
              ) :
                <button type={'button'} className="h-8 w-8 flex text-gray-700 hover:text-gray-500 items-center justify-center bg-transparent hover:bg-blue-50 ring-0 hover:ring-1 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                  </svg>
                </button>
            }
          </div>


        </div>
      </nav>
    </motion.div>
  );
}

export default MessageInput;
