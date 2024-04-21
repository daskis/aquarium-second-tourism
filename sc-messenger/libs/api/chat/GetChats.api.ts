import axios from "axios";
import {Chat, Prisma} from "@messenger/prisma-clients/chats";
import {MESSENGER_AGW_URL} from "./CONFIG/AGWServicePath.config";

/* eslint-disable-next-line */

export const fetchGetChats = async (params: Prisma.ChatFindManyArgs = {}) => {
  try {
    const response = await axios.post(MESSENGER_AGW_URL + 'get', params);
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export const fetchGetChatsList = async (params: Prisma.ChatFindManyArgs = {}) => {
  try {
    const response = await axios.post(MESSENGER_AGW_URL + 'get-list', params);
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};
