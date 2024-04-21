import styles from './chat-messages.module.scss';
import { useEventEmitter } from '@messenger/provider';
import {useEffect, useState} from "react";
import ChatNavbar from "../chat-navbar/chat-navbar";
import CreateChatForm from "../create-chat-form/create-chat-form";
import MessageInput from "../message-input/message-input";
//import SwipeableViews from 'react-swipeable-views';
import {messages} from "nx/src/utils/ab-testing";
import {ChatsListMessage} from "../chat-list/chat-list";
import {Message} from "@messenger/prisma-clients/messages";
import {fetchGetChatsList, fetchGetMessages} from "@messenger/api";
import {ChatEmpty, ChatMessagesEmpty, ChatMessagesList} from "@messenger/ui";

/* eslint-disable-next-line */
export interface ChatMessagesProps {}

export function ChatMessages(props: ChatMessagesProps) {
  const eventEmitter = useEventEmitter();
  const [chat, setChat] = useState<Message|null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const updateMessagesData = async () => {
    if (chat === null) return;
    const resMessages = await fetchGetMessages({
      where: {
        chatUUID: chat.uuid,
      }
    });
    if (resMessages !== null) {
      console.log(resMessages);
      setMessages(resMessages);
    }
  };

  useEffect(() => {
    updateMessagesData();
    const interval = setInterval(updateMessagesData, 2000);

    return () => clearInterval(interval);
  }, [chat]);

  useEffect(() => {
      const eventSelectChatListener = (chat: Message) => {
        console.log('Event received:', setChat(chat));
      };

      const eventNewMsgListener = (chat: Message) => {
        updateMessagesData();
      };

      eventEmitter.subscribe('select_chat', eventSelectChatListener);
      eventEmitter.subscribe('created_message', eventNewMsgListener);

      return () => {
        eventEmitter.unsubscribe('select_chat', eventSelectChatListener);
        eventEmitter.unsubscribe('created_message', eventNewMsgListener);
      };
    },
    [eventEmitter]);

  return (chat === null) ?
    <ChatEmpty/> :
    <ChatMessagesView messages={messages} chat={chat}/>
}

function ChatMessagesView(props: {chat: ChatsListMessage, messages: Message[]}) {
  const {chat} = props;
  return (
    <div className={'h-screen'}>
      <ChatNavbar chat={chat}/>
      {
        (props.messages.length === 0) ?
          <ChatMessagesEmpty chat={chat}/> :
          <ChatMessagesList messages={props.messages}/>
      }
      <MessageInput chat={chat} MessageType={'text'}/>
    </div>
  )
}

export default ChatMessages;
