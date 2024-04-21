import styles from './toast-notification.module.scss';

/* eslint-disable-next-line */
export interface ToastNotificationProps {}

export function ToastNotification(props: ToastNotificationProps) {
  return (
    <figure className="notification bg-red-500 text-white p-4 rounded-lg">
      <div className="notification__body flex items-center">
        <div className="icon__wrapper h-8 w-8 bg-green-500 flex justify-center items-center rounded-full mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 stroke-current"
          >
            <path d="M5 12l5 5l10 -10"></path>
          </svg>
        </div>
        Report is saved!
      </div>
      <button className="notification__button text-blue-500 mt-2 hover:underline">
        Edit report
      </button>
      <div className="notification__progress mt-2 h-2 bg-gradient-to-r from-red-500 to-green-500"></div>
    </figure>
  );
}

export default ToastNotification;
