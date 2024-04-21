import styles from './chat-list-item.module.scss';
import {ChatsListMessage} from "../chat-list/chat-list";
import { motion } from 'framer-motion';
import {getStickerByUUID} from "@messenger/stickers";
import React from "react";

/* eslint-disable-next-line */

export interface ChatListItemProps {
  chat: ChatsListMessage;
  isSelected: boolean;
  delay: number;
  hasAnimated: boolean;
}

export function ChatListItem(props: ChatListItemProps) {
  const { isSelected, delay, chat, hasAnimated } = props;

  const preventContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <motion.div
      initial={{ opacity: hasAnimated ? 1 : 0, y: hasAnimated ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`flex px-4 py-2 rounded-md ring-0 hover:ring-2 cursor-pointer ${isSelected ? "bg-[#4477ec] hover:bg-[#4476ec]" : "bg-transparent hover:bg-[#f7f8fb]"}`}>
      <img className={'h-14 w-14 rounded-full ring-1'} src={ chat.avatar } alt=""/>

      <div className={'ml-4'}>
        <h4 className={'font-bold'}>{ chat.name }</h4>
        {
          (chat.last_message != null) ?
            <p className={'text-gray-400 flex items-center space-x-2'}>
              <span className={'text-black'}>{ chat.last_message?.creatorUUID }:</span>
              { chat.last_message?.type === 'sticker' ?
                <img src={"./stickers/" + (getStickerByUUID(chat.last_message.text)?.identificator || 'Sticker not found') + ".gif"}
                     className={'h-8 w-8 select-none'} draggable={false} onContextMenu={preventContextMenu} alt=""/> :
                <span>{ chat.last_message?.text }</span>
              }
            </p>
            : <p className={'text-gray-400'}>No messages yet</p>
        }
      </div>
    </motion.div>
  );
}

export default ChatListItem;
