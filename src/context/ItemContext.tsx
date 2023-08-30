import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { ToDoListItem } from "../Components/ToDoList";
import axios from "axios";

export class PaginatedList<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
}

export enum Scope {
  All = 1,
  Complete,
  Incomplete,
}

export class GetListParams {
  page? = 1;
  pageSize? = 10;
  searchContent?: string;
  isCompleted?: boolean;
  isDeleted?: boolean;

  constructor(
    page?: number,
    pageSize?: number,
    searchContent?: string,
    isCompleted?: boolean,
    isDeleted?: boolean
  ) {
    this.page = page || 1;
    this.pageSize = pageSize || 1;
    this.searchContent = searchContent;
    this.isCompleted = isCompleted;
    this.isDeleted = isDeleted;
  }
}

export type ItemContextType = {
  paginatedListItems: PaginatedList<ToDoListItem>;
  setPaginatedListItems: React.Dispatch<
    React.SetStateAction<PaginatedList<ToDoListItem>>
  >;
  getItems: () => Promise<void>;
  isFetching: boolean;
  params: GetListParams;
  setParams: React.Dispatch<React.SetStateAction<GetListParams>>;
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
  isFetching: false,
  params: new GetListParams(1, 10),
  setParams: () => {},
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

  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [params, setParams] = useState<GetListParams>({
    page: 1,
    pageSize: 10,
  });

  async function getItems() {
    try {
      setIsFetching(() => true);
      console.log("fetching using");
      console.log(params);
      const data = (
        await axios.get("http://localhost:3333/to-do-item", {
          params: params,
        })
      ).data as PaginatedList<ToDoListItem>;
      setPaginatedListItems(() => data);
      setIsFetching(() => false);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getItems();
    console.log(paginatedListItems);
  }, [params]);

  return (
    <ItemContext.Provider
      value={{
        paginatedListItems,
        setPaginatedListItems,
        getItems,
        isFetching,
        params,
        setParams,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};
