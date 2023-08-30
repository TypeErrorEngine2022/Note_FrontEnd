import { Divider, Skeleton } from "antd";
import { ToDoFilter } from "./ToDoFilter";
import { ToDoForm } from "./ToDoForm";
import { ToDoListCard } from "./ToDoListCard";
import { ToDoListPagination } from "./ToDoListPagination";
import { useForm } from "antd/es/form/Form";
import { FC, useContext } from "react";
import { ItemContextType, ItemContext } from "../context/ItemContext";

interface ToDoListContentProps {
  selectedItems: string[];
  setSelectedItems: (newSelectedItems: string[]) => void;
  handleSelect: (id: string) => void;
}

export const ToDoListContent: FC<ToDoListContentProps> = ({
  selectedItems,
  setSelectedItems,
  handleSelect,
}) => {
  const { paginatedListItems, isFetching } =
    useContext<ItemContextType>(ItemContext);
  const [createForm] = useForm();

  const handleSelectionAfterDelete = (id: string) => {
    setSelectedItems(selectedItems.filter((currentId) => currentId !== id));
  };

  return (
    <>
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
    </>
  );
};
