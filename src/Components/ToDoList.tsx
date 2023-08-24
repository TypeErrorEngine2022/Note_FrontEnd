import "../ToDoList.css";
import { useContext, useEffect, useState } from "react";
import { ToDoForm } from "./ToDoForm";
import { ToDoFilter } from "./ToDoFilter";
import { ToDoSearch } from "./ToDoSearch";
import axios from "axios";
import { Divider, Skeleton } from "antd";
import { ToDoListCard } from "./ToDoListCard";
import { ItemContext, ItemContextType } from "../context/ItemContext";

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
  const [scope, setScope] = useState<Scope>(Scope.All);
  const [searchText, setSearchText] = useState("");
  const { listItems, setListItems, getItems } =
    useContext<ItemContextType>(ItemContext);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  function updateScope(sc: Scope) {
    setScope(sc);
  }

  function updateSearchText(helper: () => string) {
    setSearchText(helper());
  }

  // function searchFilter() {
  //   if (searchText != "") {
  //     return itemArr.filter((item) =>
  //       item.content.toLowerCase().includes(searchText.toLowerCase())
  //     );
  //   } else return itemArr;
  // }

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
    setListItems(() => data);
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

      <Divider></Divider>

      <ToDoForm />

      <Divider></Divider>

      <ToDoFilter sc={scope} updateScope={updateScope} />

      {isFetching && <Skeleton />}

      {!isFetching && (
        <div className="flex flex-wrap">
          {listItems.map((todo) => (
            <ToDoListCard key={"card" + todo.id} todo={todo} />
          ))}
        </div>
      )}
    </>
  );
}
