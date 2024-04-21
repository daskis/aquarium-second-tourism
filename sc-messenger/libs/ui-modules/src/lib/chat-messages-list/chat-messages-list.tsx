import styles from './chat-messages-list.module.scss';

/* eslint-disable-next-line */
export interface ChatMessagesListProps {}

export function ChatMessagesList(props: ChatMessagesListProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ChatMessagesList!</h1>
    </div>
  );
}

export default ChatMessagesList;
