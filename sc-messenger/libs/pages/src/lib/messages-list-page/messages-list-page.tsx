import styles from './messages-list-page.module.scss';
import {
  ChatList,
  ChatMessages,
  ChatMessagesList,
  ChatTabGroups,
  CreateChatModal,
  ToastNotification
} from "@messenger/ui-modules";
import {useEffect, useState} from "react";
import {useEventEmitter} from "@messenger/provider";
import {Message} from "@messenger/prisma-clients/messages";

/* eslint-disable-next-line */
export interface MessagesListPageProps {}

export function MessagesListPage(props: MessagesListPageProps) {
  const eventEmitter = useEventEmitter();
  const [isChatSelected, setIsChatSelected] = useState(false);
  useEffect(() => {
      const eventSelectChatListener = (chat: Message) => {
        setIsChatSelected(true);
      };
      const eventUnelectChatListener = (chat: Message) => {
        setIsChatSelected(false);
      };
      eventEmitter.subscribe('select_chat', eventSelectChatListener);
      eventEmitter.subscribe('unselect_chat', eventUnelectChatListener);
      return () => {
        eventEmitter.unsubscribe('select_chat', eventSelectChatListener);
        eventEmitter.unsubscribe('unselect_chat', eventUnelectChatListener);
      };
    },
    [eventEmitter]);

  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  const updateScreenWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', updateScreenWidth);

    return () => {
      window.removeEventListener('resize', updateScreenWidth);
    };
  }, []);


  return (
    <>

      <div className="flex h-screen w-screen">
        {
          (!isChatSelected && screenWidth <= 576 || screenWidth > 576) &&
          <section className={'w-screen sm:w-screen md:w-1/2 lg:w-1/3 xl:w-1/3 ring-1 px-4 py-2'}>
            <div className="flex space-x-2">
              <button type={'button'} className={'px-2 py-1 bg-transparent hover:bg-gray-100 rounded-md ring-0 hover:ring-1 text-gray-700'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
                </svg>
              </button>
              <div className=" relative w-full ">
                <input type="text"
                       className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 ring-1 ring-gray-300 hover:ring-blue-300 focus:border-transparent"
                       placeholder="Search..."/>
              </div>
            </div>

            <ChatTabGroups/>


            <ChatList/>
          </section>
        }
        <section className={`w-full bg-gray-100 ${(screenWidth <= 576 && isChatSelected) ? '' : 'hidden sm:block md:block lg:block xl:block'}`}>
          <ChatMessages/>
        </section>
    </div>
    <CreateChatModal/>
    </>
  );
}

export default MessagesListPage;
