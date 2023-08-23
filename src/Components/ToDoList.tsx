import "../ToDoList.css";
import { useEffect, useState } from "react";
import { ToDoForm } from "./ToDoForm";
import { ToDoFilter } from "./ToDoFilter";
import { ToDoSearch } from "./ToDoSearch";
import axios from "axios";
import { Skeleton } from "antd";
import { ToDoListCard } from "./ToDoListCard";

export interface ToDoItem {
  id: string;
  content: string;
  isCompleted: boolean;
}

export class ToDoListItem {
  id: string;
  title: string;
  preview: string;
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
  async function scopeFilter() {
    if (scope === Scope.All) {
      getItems();
      return;
    }
    setIsFetching(() => true);
    const data = (
      await axios.get("http://localhost:3333/to-do-item/complete", {
        params: { isCompleted: scope === Scope.Complete },
      })
    ).data.items as ToDoListItem[];
    setListItem(() => data);
    setIsFetching(() => false);
  }

  useEffect(() => {
    scopeFilter();
  }, [scope]);

  return (
    <>
      <h1>Note</h1>

      <ToDoSearch searchText={searchText} updateSearchText={updateSearchText} />

      <br />

      <ToDoForm />

      <br></br>

      <ToDoFilter sc={scope} updateScope={updateScope} />

      {isFetching && <Skeleton />}
      {!isFetching && (
        <div className="flex flex-wrap">
          {listItem.map((todo) => (
            <ToDoListCard todo={todo} />
          ))}
        </div>
      )}
    </>
  );
}
