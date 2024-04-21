import axios from "axios";
import {Chat, Prisma} from "@messenger/prisma-clients/chats";
import {ChatCreateCrudInput} from "./DTO/ChatCreateCrudInput.dto";
import {MESSENGER_AGW_URL} from "./CONFIG/AGWServicePath.config";

/* eslint-disable-next-line */

export async function submitCreateChat(params: ChatCreateCrudInput) {

  try {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    const dateString = `asc-times3 ${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;


    const data = {
      name: params.name,
      sendedInDate: dateString,
      type: params.type,
    };

    let responseData = '';
    console.log(MESSENGER_AGW_URL);

    const res = await axios.post(MESSENGER_AGW_URL + 'create', data).then(
      response => responseData = JSON.stringify(response)
    ).catch(error => {
      console.log("ERROR:: ",error.response);
    });

    return responseData;
  } catch(e) {
    console.log(e);
  }
}

export default submitCreateChat;
