import styles from './chat-messages-list-item.module.scss';
import {Message} from "@messenger/prisma-clients/messages";
import { motion } from 'framer-motion';
import React from "react";
import {getStickerByUUID} from "@messenger/stickers";

/* eslint-disable-next-line */
export interface ChatMessagesListItemProps {
  shouldDisplayImage: boolean;
  shouldDisplayTime: boolean;
  message: Message;
  delay?: number;
}

function extractDateTime(str:any) {
  const dateTime = new Date(str);
  const day = dateTime.getDate();
  const month = dateTime.toLocaleString('default', { month: 'short' });
  const time = dateTime.toLocaleTimeString('en-US', { timeStyle: 'short' });

  return `${day} ${month} ${time}`;
}

export function ChatMessagesListItem(props: ChatMessagesListItemProps) {
  const { shouldDisplayImage, message, delay } = props;

  function linkify(text:string) {
    return text.replace(
      /(https?:\/\/[^\s]+)/g,
      (url) => `<a href="${url}" class="font-medium text-blue-600 dark:text-blue-500 hover:underline" target="_blank">${url}</a>`
    );
  }


  const preventContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={'flex space-x-4'}>
      <div className={'w-8'}>
        {shouldDisplayImage && (
          <img
            src={'./unicorn.gif'}
            className={'h-8 w-8 rounded-full ring-1 ring-gray-200 shadow-lg'}
            alt=""
          />
        )}
      </div>
      <div className={'w-full'}>
        {props.shouldDisplayTime && (
          <MsgInfo message={message}/>
        )}
        <div className={`text-gray-800 inline-block min-w-20 px-4 py-2 rounded-2xl ${ (message.type !== 'sticker') && 'bg-blue-200' }`}>
          {message.type === 'text' ? (
            <p className="whitespace-normal" dangerouslySetInnerHTML={{ __html: linkify(message.text) }}></p>
          ) : ""}
          { message.type === 'standard' ? <p className="whitespace-normal">{message.text}</p> : "" }
          { message.type === 'sticker' ? <img src={"./stickers/" + (getStickerByUUID(message.text)?.identificator || 'Sticker not found') + ".gif"} className={'h-24 w-24 select-none'} draggable={false} onContextMenu={preventContextMenu} alt=""/> : "" }
        </div>
      </div>
    </motion.div>
  );
}

function MsgInfo(props: {message: Message}) {
  const { message } = props;
  return (
    <p className={'text-gray-400 select-none'}>
      <span className={'text-[#40E0D0]'}>{message.creatorUUID}: </span>
      {extractDateTime(message.createdAt)}
    </p>
  )
}

export default ChatMessagesListItem;
