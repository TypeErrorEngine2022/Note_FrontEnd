import "../ToDoList.css";
import { useContext } from "react";
import { ToDoForm } from "./ToDoForm";
import { ToDoFilter } from "./ToDoFilter";
import { ToDoSearch } from "./ToDoSearch";
import { Divider, Skeleton } from "antd";
import { ToDoListCard } from "./ToDoListCard";
import { ItemContext, ItemContextType } from "../context/ItemContext";
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

export function ToDoList() {
  const { paginatedListItems, isFetching } =
    useContext<ItemContextType>(ItemContext);

  return (
    <>
      <h1>Note</h1>

      <ToDoSearch />

      <Divider></Divider>

      <ToDoForm />

      <Divider></Divider>

      <ToDoFilter />

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
