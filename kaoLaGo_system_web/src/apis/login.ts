import http from "@/utils/request";

export const getCaptchaApi = () => {
  return http.get("/user/getCaptcha");
};

export const loginApi = (params) => {
  return http.post("/user/login", params);
};
