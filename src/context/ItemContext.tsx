import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { ToDoListItem } from "../Components/ToDoList";
import axios from "axios";

export class PaginatedList<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
}

export type ItemContextType = {
  paginatedListItems: PaginatedList<ToDoListItem>;
  setPaginatedListItems: React.Dispatch<
    React.SetStateAction<PaginatedList<ToDoListItem>>
  >;
  getItems: () => Promise<void>;
};

export const ItemContext = createContext<ItemContextType>({
  paginatedListItems: {
    items: [],
    page: 1,
    pageSize: 10,
    total: 0,
  },
  setPaginatedListItems: () => [],
  getItems: () => {
    return new Promise(() => {});
  },
});

export const ItemContextProvider = ({
  children,
}: PropsWithChildren<unknown>) => {
  const [paginatedListItems, setPaginatedListItems] = useState<
    PaginatedList<ToDoListItem>
  >({
    items: [],
    page: 1,
    pageSize: 10,
    total: 0,
  });

  async function getItems() {
    try {
      const data = (await axios.get("http://localhost:3333/to-do-item"))
        .data as PaginatedList<ToDoListItem>;
      setPaginatedListItems(() => data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getItems();
    console.log(paginatedListItems);
  }, []);

  return (
    <ItemContext.Provider
      value={{ paginatedListItems, setPaginatedListItems, getItems }}
    >
      {children}
    </ItemContext.Provider>
  );
};
