import { FC, useState } from "react";
import { ToDoListItem } from "./ToDoList";
import { Card, Checkbox, Modal } from "antd";
import axios from "axios";
import { ToDoForm } from "./ToDoForm";

interface ToDoListCardProps {
  todo: ToDoListItem;
}

export class ToDoListDetailItem {
  id: string;
  title: string;
  content: string;
  isCompleted: boolean;
  lastModificationTime: Date;
}

export const ToDoListCard: FC<ToDoListCardProps> = ({ todo }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [detailItem, setDetailItem] = useState<ToDoListDetailItem>();

  const getDetailItem = async () => {
    const res = await axios.get(
      "http://localhost:3333/to-do-item/" + todo.id + "/detail"
    );
    setDetailItem(() => res.data as ToDoListDetailItem);
  };

  const cardOnClick = async () => {
    getDetailItem();
    setShowModal(() => true);
  };

  return (
    <>
      <Card
        className="w-[30%] my-4 inline-block mx-2"
        size="small"
        title={todo.title}
        extra={<Checkbox checked={todo.isCompleted} />}
        onClick={cardOnClick}
      >
        {todo.preview + "..."}
      </Card>

      {detailItem && (
        <Modal
          key={"modal" + todo.id}
          open={showModal}
          onCancel={() => setShowModal(() => false)}
          footer={null}
        >
          <div className="m-4">
            <ToDoForm
              todo={detailItem}
              afterFinish={() => setShowModal(() => false)}
            />
          </div>
        </Modal>
      )}
    </>
  );
};
