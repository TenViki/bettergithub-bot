import { server } from "../config/backend";

export const sendCode = async (code: string) => {
  return server.post("/auth", { code });
};
