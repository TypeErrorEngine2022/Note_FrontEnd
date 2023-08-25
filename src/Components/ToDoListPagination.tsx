import { Pagination } from "antd";
import { useContext } from "react";
import {
  GetListParams,
  ItemContext,
  ItemContextType,
} from "../context/ItemContext";

export const ToDoListPagination = () => {
  const { paginatedListItems, setParams } =
    useContext<ItemContextType>(ItemContext);

  async function updatePage(page: number, pageSize: number) {
    setParams(
      (prevParams) =>
        new GetListParams(
          page,
          pageSize,
          prevParams.searchContent,
          prevParams.isCompleted
        )
    );
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
