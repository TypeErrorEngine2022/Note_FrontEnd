import { Col, Row, Tooltip } from "antd";
import { FC, useContext } from "react";
import { ItemContext } from "../context/ItemContext";
import axios from "axios";
import { CloseOutlined, DeleteOutlined } from "@ant-design/icons";
import { t } from "i18next";

interface ToolsBarProps {
  selectedItems: string[];
  setSelectedItems: (newSelectedItems: string[]) => void;
}

export const ToolsBar: FC<ToolsBarProps> = ({
  selectedItems,
  setSelectedItems,
}) => {
  const { getItems } = useContext(ItemContext);

  const handleBatchDelete = async () => {
    if (!selectedItems) return;

    try {
      await axios.delete("http://localhost:3333/to-do-item/batch", {
        params: { items: selectedItems },
      });
      setSelectedItems([]);
      await getItems();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Row justify="space-between" align="middle">
      <Col span={23}>
        <Tooltip title={`${t("DELETE")}`}>
          <DeleteOutlined
            key="ToolsBarDeleteButton"
            className="formFooterBtn w-[2em] h-[2em]"
            onClick={handleBatchDelete}
          />
        </Tooltip>
      </Col>
      <Col span={1}>
        <CloseOutlined />
      </Col>
    </Row>
  );
};
