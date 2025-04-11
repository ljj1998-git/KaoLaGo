import http from "@/utils/request";

export const createUserApi = (data) => {
  return http.post("/user/register", data);
};
