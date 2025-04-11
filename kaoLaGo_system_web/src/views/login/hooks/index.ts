import { loginApi, getCaptchaApi } from "@/apis/login";
import { encryptByAes } from "@/utils/encrypt";
import { ILoginForm } from "../types";
import _ from "lodash";

export const useLogin = async (datas: ILoginForm) => {
  const params = _.cloneDeep(datas);
  params.password = encryptByAes(params.password);
  let result = {};
  try {
    result = await loginApi(params);
  } catch (error) {
    console.log(error);
  }
  return result;
};

export const useGetCaptcha = async () => {
  let captchaUrl = "";
  try {
    captchaUrl = await getCaptchaApi();
  } catch (error) {
    console.log(error);
  }
  return { captchaUrl };
};
