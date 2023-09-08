import { Col, Row, Tooltip } from "antd";
import { FC, useContext } from "react";
import { ItemContext } from "../context/ItemContext";
import axios from "axios";
import { CloseOutlined, DeleteOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

interface ToolsBarProps {
  selectedItems: string[];
  setSelectedItems: (newSelectedItems: string[]) => void;
}

export const ToolsBar: FC<ToolsBarProps> = ({
  selectedItems,
  setSelectedItems,
}) => {
  const { getItems } = useContext(ItemContext);
  const { t } = useTranslation();

  const handleBatchDelete = async () => {
    if (!selectedItems) return;

    try {
      await axios.delete("https://localhost:3333/to-do-item/batch", {
        params: { items: selectedItems },
        withCredentials: true,
      });
      setSelectedItems([]);
      await getItems();
    } catch (err) {
      console.error(err);
    }
  };

  const closeToolsBar = () => {
    setSelectedItems([]);
  };

  return (
    <Row className="h-full" justify="space-between" align="middle">
      <Col span={21}>
        <Tooltip title={`${t("DELETE")}`}>
          <DeleteOutlined
            key="ToolsBarDeleteButton"
            className="formFooterBtn w-[2em] h-[2em]"
            style={{ fontSize: "20px" }}
            onClick={handleBatchDelete}
          />
        </Tooltip>
      </Col>
      <Col span={2}>
        <text>{`${t("SELECTED")} ${selectedItems.length} ${t("NOTES")}`}</text>
      </Col>
      <Col span={1}>
        <Tooltip title={`${t("UNSELECT")}`}>
          <CloseOutlined
            key="ToolsBarUnselect"
            className="formFooterBtn w-[2em] h-[2em]"
            style={{ fontSize: "20px" }}
            onClick={closeToolsBar}
          />
        </Tooltip>
      </Col>
    </Row>
  );
};
