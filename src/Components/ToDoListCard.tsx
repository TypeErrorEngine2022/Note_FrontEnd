import { FC } from "react";
import { ToDoListItem } from "./ToDoList";
import { Card, Checkbox } from "antd";

interface ToDoListCardProps {
  todo: ToDoListItem;
}

export const ToDoListCard: FC<ToDoListCardProps> = ({ todo }) => {
  return (
    <Card
      className="w-[30%] my-4 inline-block mx-2"
      size="small"
      title={todo.title}
      extra={<Checkbox value={todo.isCompleted} />}
    >
      {todo.preview + "..."}
    </Card>
  );
};
