import axios from "axios";
import {Message, Prisma} from "@messenger/prisma-clients/messages";
import {MESSAGE_AGW_URL} from "../chat/CONFIG/AGWServicePath.config";

/* eslint-disable-next-line */

export const fetchGetMessages = async (params: Prisma.MessageFindManyArgs = {}): Promise<any | null> => {
  try {
    const response = await axios.post(MESSAGE_AGW_URL + 'get', params);
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};
