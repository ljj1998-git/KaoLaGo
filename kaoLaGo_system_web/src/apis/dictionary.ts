import http from "@/utils/request";
import { IFormDictionary, IUpdateDictionary } from "@t/dictionary";

export const getDictionaryListApi = (data) => {
  return http.post("/dictionary/search", { data });
};

export const getDictionaryParentApi = () => {
  return http.get("/dictionary/searchParent");
};

export const createDictionaryApi = (data: IFormDictionary) => {
  return http.post("/dictionary/create", { data });
};

export const updateDictionaryApi = (data: IUpdateDictionary) => {
  return http.put("/dictionary/update", { data });
};

export const deleteDictionaryApi = (id: number) => {
  return http.delete("/dictionary/delete", { params: { id } });
};
