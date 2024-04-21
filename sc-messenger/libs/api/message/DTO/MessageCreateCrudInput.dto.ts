import {Prisma} from "@messenger/prisma-clients/messages";

export type MessageCreateCrudInput = {
  sendedInDate?: string | null
  activityUUID?: string | null
  messageReplyUUID?: string | null
  attachments?: Prisma.AttachmentCreateNestedManyWithoutMessageInput | null
  text: string
  type: string,
  chatUUID: string,
}

export default MessageCreateCrudInput;

export type MessageCreateFormInput = {
  activityUUID?: string | null
  messageReplyUUID?: string | null
  attachments?: Prisma.AttachmentCreateNestedManyWithoutMessageInput | null
  text: string
  type: string
  chatUUID: string
}
