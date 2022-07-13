import { Document } from "mongoose";

export interface IWebhook extends Document {
  name: string;
}
