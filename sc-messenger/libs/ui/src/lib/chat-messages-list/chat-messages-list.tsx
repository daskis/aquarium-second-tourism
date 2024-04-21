import styles from './chat-messages-list.module.scss';
import {Message} from "@messenger/prisma-clients/messages";
import ChatMessagesListItem from "../chat-messages-list-item/chat-messages-list-item";

/* eslint-disable-next-line */
export interface ChatMessagesListProps {
  messages: Message[];
}

export function ChatMessagesList(props: ChatMessagesListProps) {
  return (
    <div className={'h-[92%] mx-6 space-y-4  overflow-y-scroll pb-24'}>
      {
        props.messages.map((message: Message, key: number) => {
          const nextMessage = props.messages[key + 1];
          const shouldDisplayImage =
            !nextMessage || nextMessage.creatorUUID !== message.creatorUUID;

          const currentMessageTime = new Date(message.createdAt).getTime();
          const nextMessageTime = nextMessage ? new Date(nextMessage.createdAt).getTime() : 0;
          const timeDifference = (nextMessageTime - currentMessageTime) / 1000; // in seconds

          const shouldDisplayTime =
            timeDifference >= 60 || (!nextMessage && key === props.messages.length - 1); // Display time for the last message


          console.log("time: " + currentMessageTime + " " + nextMessageTime + " " + timeDifference);

          return (
            <div key={key}>
              <ChatMessagesListItem
                shouldDisplayImage={shouldDisplayImage} shouldDisplayTime={shouldDisplayTime}
                delay={key * 0.2}
                message={message} />
            </div>
          );
        })
      }
    </div>
  );
}

export default ChatMessagesList;
