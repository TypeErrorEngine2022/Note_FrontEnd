import "../ToDoList.css";
import { useContext } from "react";
import { ToDoForm } from "./ToDoForm";
import { ToDoFilter } from "./ToDoFilter";
import { ToDoSearch } from "./ToDoSearch";
import { Divider, Layout, Menu, Skeleton } from "antd";
import { ToDoListCard } from "./ToDoListCard";
import { ItemContext, ItemContextType } from "../context/ItemContext";
import { ToDoListPagination } from "./ToDoListPagination";
import { Content, Header } from "antd/es/layout/layout";
import { CarryOutOutlined } from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";

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
    <Layout className="w-[100vw] min-h-[100vh] bg-white">
      <Header className="bg-white border-b-4 flex items-center">
        <CarryOutOutlined className="text-4xl mr-8" />
        <span className="w-[50vw]">
          <ToDoSearch />
        </span>
      </Header>
      <Layout>
        <Content>
          <div className="mx-16 mt-8">
            <ToDoForm />
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
                <ToDoListCard key={"card" + todo.id} todo={todo} />
              ))}
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
}
