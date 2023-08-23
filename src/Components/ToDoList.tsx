import "../ToDoList.css";
import { useEffect, useState } from "react";
import { ToDoItemBox } from "./ToDoItemBox";
import { ToDoForm } from "./ToDoForm";
import { ToDoFilter } from "./ToDoFilter";
import { ToDoSearch } from "./ToDoSearch";
import axios from "axios";
import { Skeleton } from "antd";

export interface ToDoItem {
  id: string;
  content: string;
  isCompleted: boolean;
}

export class ToDoListItem {
  id: string;
  title: string;
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
  const [listItem, setListItem] = useState<ToDoListItem[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  async function getItems() {
    try {
      setIsFetching(() => true);
      const data = (await axios.get("http://localhost:3333/to-do-item")).data
        .items as ToDoListItem[];
      setListItem(() => data);
      setIsFetching(() => false);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getItems();
  }, []);

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
  function scopeFilter(filteredItem: ToDoListItem[]) {
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
      {console.log(listItem)}
      {isFetching && <Skeleton />}
      {!isFetching &&
        scopeFilter(listItem).map((todos) => (
          <ul key={todos.id}>
            <ToDoItemBox todo={todos} />
          </ul>
        ))}
    </>
  );
}
