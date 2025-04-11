export const useShowSearch = () => {
  const showSearch = ref(true);
  const toggleSearch = () => {
    showSearch.value = !showSearch.value;
  };
  return { showSearch, toggleSearch };
};
