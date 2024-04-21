import styles from './chat-page.module.scss';

/* eslint-disable-next-line */
export interface ChatPageProps {}

export function ChatPage(props: ChatPageProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ChatPage!</h1>
    </div>
  );
}

export default ChatPage;
