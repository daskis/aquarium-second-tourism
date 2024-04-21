import styles from './chat-tab-group-button-disactive.module.scss';

/* eslint-disable-next-line */
export interface ChatTabGroupButtonDisactiveProps {
  onClick: () => void;
  text: string;
}

export function ChatTabGroupButtonDisactive(
  props: ChatTabGroupButtonDisactiveProps
) {
  return (
    <li className="mr-2">
      <button type={'button'} onClick={() => props.onClick}
         className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 ">
        {props.text}
      </button>
    </li>
  );
}

export default ChatTabGroupButtonDisactive;
