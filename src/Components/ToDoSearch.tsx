import { SearchOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { useContext } from "react";
import { GetListParams, ItemContext } from "../context/ItemContext";

export function ToDoSearch() {
  const [form] = useForm();
  const { setParams } = useContext(ItemContext);

  async function getSearchItems() {
    const searchContent = form.getFieldValue("searchBar") as string;

    if (searchContent === "") {
      setParams(
        (prevParams) =>
          new GetListParams(
            prevParams.page,
            prevParams.pageSize,
            undefined,
            prevParams.isCompleted
          )
      );
    } else {
      // after search, no.of total items may be different, so got back to default: {page: 1, pageSize: 10}
      setParams(
        (prevParams) =>
          new GetListParams(
            undefined,
            prevParams.pageSize,
            searchContent,
            prevParams.isCompleted
          )
      );
    }
  }

  return (
    <Form key="searchForm" form={form} onChange={getSearchItems}>
      <Form.Item className="my-0" name="searchBar">
        <Input
          key="searchBarInput"
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
