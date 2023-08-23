import "../ToDoList.css";
import { useState } from "react";
import { ToDoItemBox } from "./ToDoItemBox";
import { ToDoForm } from "./ToDoForm";
import { ToDoFilter } from "./ToDoFilter";
import { ToDoSearch } from "./ToDoSearch";

export interface ToDoItem {
  id: string;
  content: string;
  isCompleted: boolean;
}

export enum Scope {
  All = 1,
  Complete,
  Incomplete,
}

export function ToDoList() {
  const [itemArr, setItemArr] = useState<ToDoItem[]>([]);
  const [scope, setScope] = useState<Scope>(Scope.All);
  const [searchText, setSearchText] = useState("");

  function updateItemArr(helper: (prevArr: ToDoItem[]) => ToDoItem[]) {
    setItemArr(helper(itemArr));
  }

  function updateScope(sc: Scope) {
    setScope(sc);
  }

  function updateSearchText(helper: () => string) {
    setSearchText(helper());
  }

  function searchFilter() {
    if (searchText != "") {
      return itemArr.filter((item) =>
        item.content.toLowerCase().includes(searchText.toLowerCase())
      );
    } else return itemArr;
  }

  // Display mode: return items arr with corresponding status
  function scopeFilter(filteredItem: ToDoItem[]) {
    switch (scope) {
      case Scope.All:
        return filteredItem;
      case Scope.Complete:
        return filteredItem.filter((item) => item.isCompleted === true);
      case Scope.Incomplete:
        return filteredItem.filter((item) => item.isCompleted === false);
      default:
        return filteredItem;
    }
  }

  return (
    <>
      <h1>To Do List</h1>

      <ToDoSearch searchText={searchText} updateSearchText={updateSearchText} />

      <br />

      <ToDoForm />

      <br></br>

      <ToDoFilter sc={scope} updateScope={updateScope} />

      <>
        {scopeFilter(searchFilter()).map((todos) => (
          <ul key={todos.id}>
            <ToDoItemBox todo={todos} updateItemArr={updateItemArr} />
          </ul>
        ))}
      </>
    </>
  );
}
