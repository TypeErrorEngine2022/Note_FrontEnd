import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { ToDoListItem } from "../Components/ToDoList";
import axios from "axios";

export type ItemContextType = {
  listItems: ToDoListItem[];
  setListItems: React.Dispatch<React.SetStateAction<ToDoListItem[]>>;
  getItems: () => Promise<void>;
};

export const ItemContext = createContext<ItemContextType>({
  listItems: [],
  setListItems: () => [],
  getItems: () => {
    return new Promise(() => {});
  },
});

export const ItemContextProvider = ({
  children,
}: PropsWithChildren<unknown>) => {
  const [listItems, setListItems] = useState<ToDoListItem[]>([]);

  async function getItems() {
    try {
      const data = (await axios.get("http://localhost:3333/to-do-item")).data
        .items as ToDoListItem[];
      setListItems(() => data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getItems();
  }, []);

  return (
    <ItemContext.Provider value={{ listItems, setListItems, getItems }}>
      {children}
    </ItemContext.Provider>
  );
};
