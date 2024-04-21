import styles from './chat-messages-empty.module.scss';
import {ChatsListMessage} from "@messenger/ui-modules";

/* eslint-disable-next-line */
export interface ChatMessagesEmptyProps {
  chat: ChatsListMessage
}

export function ChatMessagesEmpty(props: ChatMessagesEmptyProps) {
  const {chat} = props;

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <img src={chat.avatar} className={'h-24 w-24 rounded-full ring-1 ring-gray-200 shadow-lg'} alt=""/>
      <h1 className={'text-2xl font-bold'}>{chat.name}</h1>
      <p className={'text-gray-500'}>Send first message right now!</p>
    </div>
  );
}

export default ChatMessagesEmpty;
