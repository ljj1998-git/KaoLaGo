import { deleteDictionaryApi, getDictionaryListApi } from "@/apis/dictionary";
import { useDictionaryStore } from "@/stores";
import { DictionaryList, ISearchDictionary } from "@t/dictionary";

const { searchForm } = storeToRefs(useDictionaryStore());

export const dictionary = ref<{ result: DictionaryList[]; loading: boolean }>({
  result: [],
  loading: false,
});

export const useDictionaryList = async (params: ISearchDictionary) => {
  dictionary.value.loading = true;
  try {
    dictionary.value.result = await getDictionaryListApi(params);
  } catch (error) {
    console.log(error);
  } finally {
    dictionary.value.loading = false;
  }
};

export const useDeletDictionary = async (id: number) => {
  try {
    await deleteDictionaryApi(id);
    window.$message.success("删除成功");
    await useDictionaryList(searchForm.value);
  } catch (error) {
    console.log(error);
  }
};
