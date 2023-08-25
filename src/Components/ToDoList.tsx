import "../ToDoList.css";
import { useContext, useEffect, useState } from "react";
import { ToDoForm } from "./ToDoForm";
import { ToDoFilter } from "./ToDoFilter";
import { ToDoSearch } from "./ToDoSearch";
import axios from "axios";
import { Divider, Skeleton } from "antd";
import { ToDoListCard } from "./ToDoListCard";
import {
  ItemContext,
  ItemContextType,
  PaginatedList,
} from "../context/ItemContext";
import { ToDoListPagination } from "./ToDoListPagination";

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
  const { paginatedListItems, setPaginatedListItems, getItems } =
    useContext<ItemContextType>(ItemContext);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  function updateScope(sc: Scope) {
    setScope(sc);
  }

  // Display mode: return items arr with corresponding status
  async function scopeFilter() {
    if (scope === Scope.All) {
      await getItems();
      return;
    }
    try {
      setIsFetching(() => true);
      const data = (
        await axios.get("http://localhost:3333/to-do-item/complete", {
          params: { isCompleted: scope === Scope.Complete },
        })
      ).data as PaginatedList<ToDoListItem>;
      setPaginatedListItems(() => data);
      setIsFetching(() => false);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    scopeFilter();
  }, [scope]);

  return (
    <>
      <h1>Note</h1>

      <ToDoSearch />

      <Divider></Divider>

      <ToDoForm />

      <Divider></Divider>

      <ToDoFilter sc={scope} updateScope={updateScope} />

      {isFetching && <Skeleton />}

      {!isFetching && <ToDoListPagination />}

      {!isFetching && (
        <div className="flex flex-wrap">
          {paginatedListItems.items.map((todo) => (
            <ToDoListCard key={"card" + todo.id} todo={todo} />
          ))}
        </div>
      )}
    </>
  );
}
