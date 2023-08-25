import { Pagination } from "antd";
import { useContext } from "react";
import {
  ItemContext,
  ItemContextType,
  PaginatedList,
} from "../context/ItemContext";
import axios from "axios";
import { ToDoListItem } from "./ToDoList";

export const ToDoListPagination = () => {
  const { paginatedListItems, setPaginatedListItems } =
    useContext<ItemContextType>(ItemContext);

  async function updatePage(page: number, pageSize: number) {
    try {
      const options = {
        page: page,
        pageSize: pageSize,
      };
      const response = (
        await axios.get("http://localhost:3333/to-do-item", {
          params: options,
        })
      ).data as PaginatedList<ToDoListItem>;
      setPaginatedListItems(() => response);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Pagination
      current={paginatedListItems.page}
      pageSize={paginatedListItems.pageSize}
      total={paginatedListItems.total}
      showQuickJumper={true}
      showTotal={(total: number) => `Total ${total} notes`}
      onChange={(page: number, pageSize: number) => updatePage(page, pageSize)}
    ></Pagination>
  );
};
