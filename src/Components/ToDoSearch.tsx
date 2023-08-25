import { SearchOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useContext } from "react";
import { ItemContext } from "../context/ItemContext";
import { ToDoListItem } from "./ToDoList";

type GetListResponse = {
  items: ToDoListItem[];
  page: number;
  pageSize: number;
  total: number;
};

export function ToDoSearch() {
  const [form] = useForm();
  const { getItems, setListItems } = useContext(ItemContext);

  async function getSearchItems() {
    const searchContent = form.getFieldValue("searchBar") as string;
    if (searchContent === "") {
      await getItems();
    }

    try {
      const response = (
        await axios.get("http://localhost:3333/to-do-item", {
          params: { searchContent: searchContent },
        })
      ).data as GetListResponse;
      setListItems(() => response.items);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Form form={form} onChange={getSearchItems}>
      <Form.Item name="searchBar">
        <Input
          className="bg-gray-100 outline outline-[1px]"
          size="large"
          bordered={false}
          prefix={<SearchOutlined />}
          placeholder="Search"
        />
      </Form.Item>
    </Form>
  );
}
