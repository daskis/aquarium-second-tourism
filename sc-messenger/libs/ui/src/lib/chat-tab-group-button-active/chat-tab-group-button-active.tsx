import styles from './chat-tab-group-button-active.module.scss';

/* eslint-disable-next-line */
export interface ChatTabGroupButtonActiveProps {
  onClick: () => void;
  text: string;
}

export function ChatTabGroupButtonActive(props: ChatTabGroupButtonActiveProps) {
  return (
    <li className="mr-2">
      <button type={'button'} onClick={() => props.onClick} className="inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active "
         aria-current="page">
        {props.text}
      </button>
    </li>
  );
}

export default ChatTabGroupButtonActive;
