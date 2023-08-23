import { ChangeEvent } from "react";

interface ToDoSearchProps {
  updateSearchText: (helper: () => string) => void;
  searchText: string;
}

export function ToDoSearch({ searchText, updateSearchText }: ToDoSearchProps) {
  function onSearchTextChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const newText = e.target.value;
    updateSearchText(() => newText);
  }

  return (
    <div>
      <form role="search" className="searchForm">
        Search:
        <input
          className="searchInput"
          type="search"
          placeholder=" Search"
          value={searchText}
          onChange={(e) => onSearchTextChange(e)}
        />
      </form>
    </div>
  );
}
