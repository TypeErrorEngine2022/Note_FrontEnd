import { Row, Col, Select, Button } from "antd";
import { t } from "i18next";
import { ToDoSearch } from "./ToDoSearch";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { UserOutlined } from "@ant-design/icons";
import { UserButton } from "./UserButton";

interface NavBarProps {
  menuKey: string;
}

export const NavBar: FC<NavBarProps> = ({ menuKey }) => {
  const { i18n } = useTranslation();

  return (
    <Row justify="space-around" align="middle">
      <Col
        md={{ span: 2 }}
        lg={{ span: 2, offset: 1 }}
        style={{ fontSize: "20px" }}
      >
        {`${t(menuKey.toLocaleUpperCase())}`}
      </Col>
      <Col md={{ span: 8 }} lg={{ span: 8 }} className="flex justify-start">
        <span className="w-[25vw] lg:w-[50vw] mr-2">
          <ToDoSearch />
        </span>
      </Col>
      <Col
        md={{ span: 3, offset: 10 }}
        lg={{ span: 5, offset: 7 }}
        className="flex justify-end"
      >
        <Select
          className=" w-[9em]"
          defaultValue={"zh-HK"}
          onChange={(lang: string) => i18n.changeLanguage(lang)}
          options={[
            { value: "en-US", label: "English" },
            { value: "zh-CN", label: "中文（简体)" },
            { value: "zh-HK", label: "中文（繁体)" },
          ]}
        ></Select>
      </Col>
      <Col span={1} lg={{ span: 1 }} className="flex justify-end">
        <UserButton />
      </Col>
    </Row>
  );
};
