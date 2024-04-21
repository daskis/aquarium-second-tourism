import styles from './chat-empty.module.scss';

/* eslint-disable-next-line */
export interface ChatEmptyProps {}

export function ChatEmpty(props: ChatEmptyProps) {
  return (
    <div className={'flex flex-col items-center justify-center h-full'}>
      <img src="./telescoupe.gif" alt=""/>
      <h1 className={'text-2xl font-bold'}>Select a chat to start messaging</h1>
    </div>
  );
}

export default ChatEmpty;
