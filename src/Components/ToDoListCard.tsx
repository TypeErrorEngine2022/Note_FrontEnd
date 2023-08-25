import { FC, useContext, useState } from "react";
import { ToDoListItem } from "./ToDoList";
import { Button, Card, Modal, Skeleton } from "antd";
import axios from "axios";
import { ToDoForm } from "./ToDoForm";
import { ItemContext } from "../context/ItemContext";

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
  const { getItems } = useContext(ItemContext);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [detailItem, setDetailItem] = useState<ToDoListDetailItem>();

  const getDetailItem = async () => {
    const res = await axios.get(
      "http://localhost:3333/to-do-item/" + todo.id + "/detail"
    );
    setDetailItem(() => res.data as ToDoListDetailItem);
  };

  const cardOnClick = async () => {
    setIsLoading(() => true);
    getDetailItem();
    setIsLoading(() => false);

    setShowModal(() => true);
  };

  async function updateIsComplete() {
    if (!todo) return;
    try {
      setIsLoading(() => true);
      await axios.put(
        "http://localhost:3333/to-do-item/" + todo.id + "/complete",
        { isCompleted: !todo.isCompleted }
      );
      await getItems();
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <Card
        key={todo.id + "Card"}
        className="w-[30%] my-4 inline-block mx-2"
        size="small"
        title={todo.title || ""}
        hoverable={true}
        actions={[
          <Button
            className="w-fit h-fit"
            shape="round"
            key={todo.id + "DoneBtn"}
            style={{ color: todo.isCompleted ? "rgb(22 163 74)" : "gray" }}
            onClick={() => updateIsComplete()}
          >
            Done
          </Button>,
        ]}
      >
        <div onClick={cardOnClick}>{todo.preview + "..."}</div>
      </Card>

      {detailItem && (
        <Modal
          key={"modal" + todo.id}
          open={showModal}
          onCancel={() => setShowModal(() => false)}
          footer={null}
        >
          {isLoading && <Skeleton></Skeleton>}
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
