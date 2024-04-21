import styles from './create-chat-modal.module.scss';
import {useEffect, useState} from "react";
import {Dialog} from "@headlessui/react";
import CreateChatForm from "../create-chat-form/create-chat-form";
import {useEventEmitter} from "@messenger/provider";

/* eslint-disable-next-line */
export interface CreateChatModalProps {}

export function CreateChatModal(props: CreateChatModalProps) {
  const eventEmitter = useEventEmitter();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  function closeModal() {
    setIsOpenModal(false);
  }

  useEffect(() => {
    const eventListenerChatCreated = (data: string) => {
      setIsOpenModal(false);
    };

    const eventListenerOpenModal = (data: string) => {
      setIsOpenModal(true);
    }

    eventEmitter.subscribe('created_chat', eventListenerChatCreated);
    eventEmitter.subscribe('open_create_chat_modal', eventListenerOpenModal);

    return () => {
      eventEmitter.unsubscribe('created_chat', eventListenerChatCreated);
      eventEmitter.unsubscribe('open_create_chat_modal', eventListenerOpenModal);
    };
  }, [eventEmitter]);

  return (
    <Dialog open={isOpenModal} onClose={() => closeModal()} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto rounded-2xl bg-white w-[450px] p-4 rounded-2xl opacity-1 text-white">
          <Dialog.Title
            as="h3"
            className="text-lg font-medium leading-6 text-gray-900"
          >
            Create Chat
          </Dialog.Title>

          <Dialog.Description>
            <div className="mt-2 flex items-center justify-center">
              <img src="./unicorn.gif" className={'w-32 h-32 ring-1 ring-gray-200 rounded-full shadow-lg'} alt=""/>
            </div>
          </Dialog.Description>

          <CreateChatForm ChatType={'group'}/>

        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default CreateChatModal;
