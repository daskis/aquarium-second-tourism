import {ChatCreateCrudInput, submitCreateChat} from "@messenger/api";
import {useCallback, useState} from "react";
import {useEventEmitter} from "@messenger/provider";

/* eslint-disable-next-line */
export interface CreateChatFormProps {
  ChatType: string;
}

export function CreateChatForm(props: CreateChatFormProps) {
  const eventEmitter = useEventEmitter();

  const [isCreating, setIsCreating] = useState<boolean>(false);

  const [inputName, setInputName] = useState<string>("");

  function successCreated(data:any) {
    setInputName("");
    setIsCreating(false);
    eventEmitter.emit('created_chat', data);
  }

  const handleNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputName(event.target.value);
    },
    []
  );


  function EnterChatName() {
    return (
      <input
        value={inputName}
        onChange={handleNameChange}
        className="w-full mt-2 block border placeholder-gray-500 px-3 py-2 leading-6 rounded-lg border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:bg-gray-800 dark:border-gray-600 dark:focus:border-blue-500 dark:placeholder-gray-400 text-gray-700"
        type="text"
        id="chat_name_input"
        name="chat_name_input"
        placeholder="Enter chat name..."
        required={true} autoFocus={true}
      />
    )
  }


  function submitCreate() {
    setIsCreating(true);
    const data: ChatCreateCrudInput = {
      name: inputName,
      type: props.ChatType,
    }
    const result = submitCreateChat(data);
    if (result) successCreated(result);
  }



  return (
    <>

      {
        !isCreating ?

          <div className="space-y-6 dark:text-gray-100 pt-8">

            <div className=" relative ">
              <label htmlFor="chat_name_input" className="text-gray-700">
                Name
              </label>
              <EnterChatName/>
            </div>

            <div className={'flex justify-between'}>
              <button type="button" onClick={() => submitCreate()} className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 w-full">
                Create
              </button>
            </div>
          </div>
          : ""
      }

      {
        isCreating ?
          <div className="w-full h-full items-center justify-center select-none">
            <div className={'p-12 bg-white rounded-full w-48 h-48 justify-center items-center flex flex-col shadow-lg'}>
              <img src="./magic.gif" alt="" className={'h-24 w-24'}/>
              <span className="text-gray-400">creating...</span>
            </div>
          </div>
          : ""
      }
    </>
  );
}

export default CreateChatForm;
