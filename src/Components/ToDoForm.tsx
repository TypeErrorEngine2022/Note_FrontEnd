import axios from "axios";
import { Form, Input, Button, Card, Divider } from "antd";
import { ToDoListDetailItem } from "./ToDoListCard";
import { FC, useContext } from "react";
import TextArea from "antd/es/input/TextArea";
import { ItemContext } from "../context/ItemContext";
import { useForm } from "antd/es/form/Form";

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

  const isFalsy = (val: string | null | undefined) => {
    return val == null || val == "";
  };

  // submit form to add new item
  async function handleSubmit(vals: FieldType) {
    if (isFalsy(vals.title) && isFalsy(vals.content)) {
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

    if (afterFinish) afterFinish();
  }

  async function onFormBlur() {
    await handleSubmit(form.getFieldsValue(true));
  }

  console.log(todo ? todo : "no todo");
  return (
    <Card>
      <Form
        form={form}
        onBlur={() => onFormBlur()}
        onFinish={(vals: FieldType) => handleSubmit(vals)}
      >
        <Form.Item<FieldType> name="title">
          <Input
            key={todo?.id || "CreateForm" + "TitleInput"}
            defaultValue={todo?.title || ""}
            placeholder="title"
            bordered={false}
          />
        </Form.Item>

        <Divider className="my-2"></Divider>

        <Form.Item<FieldType> name="content">
          <TextArea
            key={todo?.id || "CreateForm" + "ContentInput"}
            defaultValue={todo?.content || ""}
            placeholder="content"
            bordered={false}
          ></TextArea>
        </Form.Item>

        <Form.Item className="flex justify-end">
          <Button
            key={todo?.id || "CreateForm" + "SubmitBtn"}
            htmlType="submit"
            shape="round"
          >
            {todo ? "Done" : "Add"}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
