import styles from './chat-list.module.scss';
import ChatListItem from "../chat-list-item/chat-list-item";
import {createContext, useContext, useEffect, useState} from "react";
import { useEventEmitter } from '@messenger/provider';
import CreateChatModal from "../create-chat-modal/create-chat-modal";
import {Chat, Prisma} from "@messenger/prisma-clients/chats";
import {fetchGetChats, fetchGetChatsList} from "@messenger/api";
import {Message} from "@messenger/prisma-clients/messages";
import ToastNotification from "../toast-notification/toast-notification";

export type ChatsListMessage = {
  uuid: string,
  avatar: string,
  name: string,
  last_message: Message | null,
}

/* eslint-disable-next-line */
export interface ChatListProps {
}

export function ChatList(props: ChatListProps) {
  const eventEmitter = useEventEmitter();

  const [chats, setChats] = useState<ChatsListMessage[] | null>(null);
  const [selectedChat, setSelectedChat] = useState<ChatsListMessage | null>(null);

  const updateChatsData = async () => {
    const resChats = await fetchGetChatsList({});
    if (resChats !== null) {
      setChats(resChats);
    }
  };

  useEffect(() => {
    updateChatsData();
    const interval = setInterval(updateChatsData, 5000); // every 5 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const eventListener = (data: string) => {
      if (chats == null) return;
      const chat = chats.find((chat) => chat.uuid === data);
      if (chat == null) return;
      console.log('Event received:', setSelectedChat(chat));
    };

    eventEmitter.subscribe('select_chat', eventListener);

    return () => {
      eventEmitter.unsubscribe('select_chat', eventListener);
    };
  }, [eventEmitter]);

  const handleChatClick = (chat: ChatsListMessage) => {
    eventEmitter.emit('select_chat', chat);
  };

  const [hasAnimated, setHasAnimated] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setHasAnimated(true);
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  function ChatsList(props: { chats: ChatsListMessage[] }) {
    const {chats} = props;
    return <>
      {
        chats?.map((chat:ChatsListMessage, key:number) => {
          return (
            <div key={key} onClick={() => handleChatClick(chat)}>
              <ChatListItem hasAnimated={hasAnimated} delay={key * 0.2} chat={chat}
                            isSelected={(selectedChat && (selectedChat.uuid === chat.uuid)) ? true : false}/>
            </div>
          )
        })
      }
    </>
  }

  return (
    <div className={'space-y-2 mt-2 select-none h-full'}>
      <button type={'button'} onClick={() => eventEmitter.emit('open_create_chat_modal', {})}
              className={'w-full bg-transparent hover:bg-gray-200 py-2 text-gray-700 font-bold rounded-md space-x-4 flex items-center justify-center'}>

        <span>Create Chat</span>

      </button>

      {
        (chats == null) ? <EmptyChatsList/> : <ChatsList chats={chats}/>
      }

    </div>
  );
}

function EmptyChatsList() {
  return (
    <div className={'flex flex-col space-y-4 pb-24 items-center justify-center h-full'}>
      <img src="./sleep.gif" className={'h-12 w-12'} alt=""/>
      <span className={'text-gray-400 text-xl'}>No chats yet</span>
    </div>
  )
}

export default ChatList;
