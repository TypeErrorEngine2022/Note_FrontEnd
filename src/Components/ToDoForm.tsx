import axios from "axios";
import { Form, Input, Button, Card } from "antd";

type FieldType = {
  title: string;
  content: string;
};

export function ToDoForm() {
  // submit form to add new item
  async function handleSubmit(vals: FieldType) {
    if (vals.title === "" && vals.content === "") {
      return;
    }

    const data = {
      title: vals.title,
      content: vals.content,
    };
    await axios.post("http://localhost:3333/to-do-item", data);
  }

  return (
    <Card>
      <Form
        onFinish={(vals: FieldType) => handleSubmit(vals)}
        labelCol={{ span: 4 }}
      >
        <Form.Item<FieldType> label="title" name="title">
          <Input />
        </Form.Item>

        <Form.Item<FieldType> label="content" name="content">
          <Input />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" shape="round">
            Add
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
