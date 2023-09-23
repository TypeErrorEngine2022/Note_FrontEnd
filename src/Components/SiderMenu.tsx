import { CarryOutOutlined, RestOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import { FC, useContext } from "react";
import { useTranslation } from "react-i18next";
import { ItemContext } from "../context/ItemContext";

interface SiderMenuProps {
  selectedKey: string;
  setMenuKey: (key: string) => void;
}

export const SiderMenu: FC<SiderMenuProps> = ({ selectedKey, setMenuKey }) => {
  const { setParams } = useContext(ItemContext);
  const { t } = useTranslation();

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    setParams((prevParams) => ({
      ...prevParams,
      isDeleted: e.key === "TrashCan",
    }));
    setMenuKey(e.key);
  };

  return (
    <Menu
      key="SiderBarMenu"
      selectedKeys={[selectedKey]}
      onClick={handleMenuClick}
      items={[
        {
          key: "Notes",
          label: (
            <div className="flex items-center">
              <CarryOutOutlined style={{ fontSize: "20px" }} />
              <span>{`${t("NOTES")}`}</span>
            </div>
          ),
        },
        {
          key: "TrashCan",
          label: (
            <div className="flex items-center">
              <RestOutlined style={{ fontSize: "20px" }} />
              <span>{`${t("TRASHCAN")}`}</span>
            </div>
          ),
        },
      ]}
    ></Menu>
  );
};
