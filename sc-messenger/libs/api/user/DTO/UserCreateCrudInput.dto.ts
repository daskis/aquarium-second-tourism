import {Prisma} from "@messenger/prisma-clients/UserProfile";

export type UserCreateCrudInput = {
  sendedInDate?: string | null
  invitorUUID?: string | null
  email: Prisma.EmailCreateInput | null;
  phoneNumber: Prisma.PhoneNumberCreateInput | null;
  extendedData: Prisma.JsonArray | null;
}

export default UserCreateCrudInput;

export type UserCreateFormInput = {
  sendedInDate?: string | null
  email: EmailCreateFormInput | null;
  phoneNumber: PhoneNumberCreateFormInput | null;
}

export type EmailCreateFormInput = {
  email: string;
}

export type PhoneNumberCreateFormInput = {
  phoneNumber: string;
}
