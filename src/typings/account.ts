import { AccountStatus } from "./enums";

export type AccountAttributes = {
  id: string;
  balance: number;
  user_id: string;
  status: AccountStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface AccountCreationBody
  extends Omit<AccountAttributes, "id" | "createdAt" | "updatedAt"> {
}


