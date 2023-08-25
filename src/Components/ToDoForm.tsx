import axios from "axios";
import { Form, Input, Button, Divider, Tooltip, message } from "antd";
import { ToDoListDetailItem } from "./ToDoListCard";
import { FC, useContext } from "react";
import TextArea from "antd/es/input/TextArea";
import { ItemContext } from "../context/ItemContext";
import { useForm } from "antd/es/form/Form";
import { DeleteOutlined } from "@ant-design/icons";

type FieldType = {
  title: string;
  content: string;
};

interface ToDoFormProps {
  todo?: ToDoListDetailItem;
  afterFinish?: () => void;
}

export const ToDoForm: FC<ToDoFormProps> = ({ todo, afterFinish }) => {
  const { getItems } = useContext(ItemContext);
  const [form] = useForm();

  // submit form to add new item
  async function handleSubmit(vals: FieldType) {
    if (!vals.title && !vals.content) {
      if (afterFinish) afterFinish();
      return;
    }

    const data = {
      title: vals.title,
      content: vals.content,
    };

    try {
      if (todo) {
        await axios.put("http://localhost:3333/to-do-item/" + todo.id, data);
      } else {
        await axios.post("http://localhost:3333/to-do-item", data);
      }

      await getItems();
    } catch (err) {
      console.error(err);
    }

    form.resetFields();
    if (afterFinish) afterFinish();
  }

  async function onFormBlur() {
    await handleSubmit(form.getFieldsValue(true));
  }

  async function deleteItem() {
    if (!todo) return;

    try {
      await axios.delete("http://localhost:3333/to-do-item/" + todo.id);
      await getItems();
      message.success("Item deleted");
    } catch (err) {
      console.error(err);
    }

    if (afterFinish) afterFinish();
  }

  return (
    <>
      <Form
        form={form}
        initialValues={{
          ["title"]: todo?.title || "",
          ["content"]: todo?.content || "",
        }}
        onBlur={() => onFormBlur()}
        onFinish={(vals: FieldType) => handleSubmit(vals)}
      >
        <Form.Item<FieldType> name="title">
          <Input
            key={todo?.id || "CreateForm" + "TitleInput"}
            placeholder="title (Optional)"
            bordered={false}
          />
        </Form.Item>

        <Divider className="my-2"></Divider>

        <Form.Item<FieldType> name="content">
          <TextArea
            key={todo?.id || "CreateForm" + "ContentInput"}
            placeholder="content"
            bordered={false}
          ></TextArea>
        </Form.Item>

        <div className="flex" id="formFooter">
          <span className="inline-flex flex-grow items-baseline">
            {todo && (
              <>
                <Tooltip title="delete">
                  <DeleteOutlined
                    key={todo.id + "deleteBtn"}
                    className="formFooterBtn"
                    onClick={deleteItem}
                  />
                </Tooltip>
              </>
            )}
          </span>

          <Button
            key={todo?.id || "CreateForm" + "SubmitBtn"}
            htmlType="submit"
            shape="round"
          >
            {todo ? "Done" : "Add"}
          </Button>
        </div>
      </Form>
    </>
  );
};
