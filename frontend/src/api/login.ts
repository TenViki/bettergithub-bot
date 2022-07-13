import axios from "axios";

export const sendCode = async (code: string) => {
  return axios.post("/auth", { code });
};
