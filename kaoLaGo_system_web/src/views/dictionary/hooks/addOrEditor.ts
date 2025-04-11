import {
  createDictionaryApi,
  getDictionaryParentApi,
  updateDictionaryApi,
} from "@/apis/dictionary";
import {
  DictionaryList,
  IFormDictionary,
  IUpdateDictionary,
} from "@t/dictionary";
import { useDictionaryStore } from "@/stores";
import { useMessage } from "naive-ui";
import { useDictionaryList } from "./index";

const { reset } = useDictionaryStore();
const { type, searchForm } = storeToRefs(useDictionaryStore());

const useDictionaryOptionsDatas = ref<{ result: DictionaryList[] }>({
  result: [],
});

export const useDictionaryOptions = async () => {
  try {
    useDictionaryOptionsDatas.value.result = await getDictionaryParentApi();
  } catch (error) {
    console.log(error);
  }
  return useDictionaryOptionsDatas.value;
};

const useOKData = ref<{
  handleOK: Function;
  loading: boolean;
}>({
  handleOK: () => {},
  loading: false,
});

export const useOK = async () => {
  const EDrawerTitleType = getCurrentInstance()?.proxy?.$enums.EDrawerTitleType;
  const message = useMessage();

  useOKData.value.handleOK = async (
    params: IFormDictionary | IUpdateDictionary
  ) => {
    useOKData.value.loading = true;
    try {
      if (type.value == EDrawerTitleType?.add) {
        await createDictionaryApi(params);
        message.success("新增成功");
        reset();
        await useDictionaryList(searchForm.value);
      } else if (type.value == EDrawerTitleType?.edit) {
        await updateDictionaryApi(params);
        message.success("编辑成功");
        reset();
        await useDictionaryList(searchForm.value);
      }
    } catch (error) {
      console.log(error);
    } finally {
      useOKData.value.loading = false;
    }
  };
  return useOKData.value;
};
