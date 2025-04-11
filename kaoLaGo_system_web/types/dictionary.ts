import { IResponse } from "./common";

export interface ISearchDictionary {
  name?: string;
}

export interface IFormDictionary {
  parentId?: string;
  name?: string;
  description?: string;
  status?: number;
  key?: string;
  value?: string;
}

export interface IUpdateDictionary extends IFormDictionary {
  id?: string;
}

export interface DictionaryList extends IResponse {
  id?: string;
  parentId?: string;
  name?: string;
  description?: string;
  status?: number;
  key?: string;
  value?: string;
  children?: DictionaryList[];
}
