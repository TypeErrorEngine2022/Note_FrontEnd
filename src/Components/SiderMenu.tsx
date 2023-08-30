import { CarryOutOutlined, RestOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface SiderMenuProps {
  selectedKey: string;
  setMenuKey: (key: string) => void;
}

export const SiderMenu: FC<SiderMenuProps> = ({ selectedKey, setMenuKey }) => {
  const { t } = useTranslation();

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    setMenuKey(e.key);
  };

  return (
    <Menu
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
