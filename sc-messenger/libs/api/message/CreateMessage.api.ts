import axios from "axios";
import {Chat, Prisma} from "@messenger/prisma-clients/chats";
import {MessageCreateCrudInput, MessageCreateFormInput} from "./DTO/MessageCreateCrudInput.dto";
import {MESSAGE_AGW_URL} from "../chat/CONFIG/AGWServicePath.config";

/* eslint-disable-next-line */

export async function submitCreateMessage(params: MessageCreateFormInput) {

  try {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    const dateString = `asc-times3 ${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;


    const data: MessageCreateCrudInput = {
      text: params.text,
      sendedInDate: dateString,
      type: params.type,
      chatUUID: params.chatUUID,
    };

    let responseData = '';
    console.log(MESSAGE_AGW_URL);

    const res = await axios.post(MESSAGE_AGW_URL + 'create', data).then(
      response => responseData = JSON.stringify(response)
    ).catch(error => {
      console.log("ERROR:: ",error.response);
    });

    return responseData;
  } catch(e) {
    console.log(e);
  }
}

export default submitCreateMessage;
