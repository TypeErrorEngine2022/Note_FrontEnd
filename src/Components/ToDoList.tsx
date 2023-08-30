import { useContext, useState } from "react";
import { Col, Divider, Row, Select, Skeleton } from "antd";
import Layout, { Content, Header } from "antd/lib/layout/layout";
import { ItemContextType, ItemContext } from "../context/ItemContext";
import { ToDoFilter } from "./ToDoFilter";
import { ToDoForm } from "./ToDoForm";
import { ToDoListCard } from "./ToDoListCard";
import { ToDoListPagination } from "./ToDoListPagination";
import { ToDoSearch } from "./ToDoSearch";
import { useTranslation } from "react-i18next";
import { ToolsBar } from "./ToolsBar";
import Sider from "antd/es/layout/Sider";
import { SiderMenu } from "./SiderMenu";
import { useForm } from "antd/es/form/Form";
import { NavBar } from "./NavBar";

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

export const ToDoList = () => {
  const { paginatedListItems, isFetching } =
    useContext<ItemContextType>(ItemContext);
  const { i18n } = useTranslation();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [menuKey, setMenuKey] = useState<string>("Notes");
  const { t } = useTranslation();
  const [createForm] = useForm();

  const handleSelect = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(() =>
        selectedItems.filter((currentId) => currentId !== id)
      );
    } else setSelectedItems(() => [...selectedItems, id]);
  };

  const handleSelectionAfterDelete = (id: string) => {
    setSelectedItems(() =>
      selectedItems.filter((currentId) => currentId !== id)
    );
  };

  return (
    <Layout className="w-[100vw] min-h-[100vh] bg-white">
      <Header className="bg-white border-b-4">
        {selectedItems.length > 0 && (
          <ToolsBar
            selectedItems={selectedItems}
            setSelectedItems={(newSelectedItems: string[]) =>
              setSelectedItems(() => newSelectedItems)
            }
          />
        )}
        {selectedItems.length === 0 && <NavBar menuKey={menuKey} />}
      </Header>
      <Layout hasSider={true}>
        <Sider
          theme="light"
          defaultCollapsed={false}
          collapsible={true}
          collapsedWidth="4em"
        >
          <SiderMenu
            selectedKey={menuKey}
            setMenuKey={(key: string) => setMenuKey(() => key)}
          />
        </Sider>
        <Content>
          <div className="mx-16 mt-8">
            <ToDoForm form={createForm} />
          </div>

          <Divider></Divider>

          <span className="flex justify-center items-center my-4">
            <ToDoFilter />
          </span>

          {isFetching && <Skeleton />}

          {!isFetching && (
            <span className="flex justify-center items-center">
              <ToDoListPagination />
            </span>
          )}

          {!isFetching && (
            <div className="flex flex-wrap justify-center">
              {paginatedListItems.items.map((todo) => (
                <ToDoListCard
                  key={"card" + todo.id}
                  todo={todo}
                  isSelected={selectedItems.includes(todo.id)}
                  updateSelected={handleSelect}
                  afterDelete={handleSelectionAfterDelete}
                />
              ))}
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};
