export interface DropdownType {
  dropdownRef: React.RefObject<HTMLUListElement>;
  searchListData: string[];
  inputText: string;
  handleAddTodoClick: (todo: string) => void;
}

export interface HighlightType {
  text: string;
  highlight: string;
}
