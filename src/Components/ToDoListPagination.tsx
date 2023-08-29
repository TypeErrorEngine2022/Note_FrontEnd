import { Button, Pagination } from "antd";
import { useContext } from "react";
import {
  GetListParams,
  ItemContext,
  ItemContextType,
} from "../context/ItemContext";
import { useTranslation } from "react-i18next";

export const ToDoListPagination = () => {
  const { paginatedListItems, setParams } =
    useContext<ItemContextType>(ItemContext);
  const { t } = useTranslation();

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
      showTotal={(total: number) => `${t("TOTAL")} ${total} ${t("NOTES")}`}
      onChange={(page: number, pageSize: number) => updatePage(page, pageSize)}
      locale={{ jump_to: t("GO TO"), page: t("PAGE") }}
    ></Pagination>
  );
};
