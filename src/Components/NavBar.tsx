import { Row, Col, Select } from "antd";
import { t } from "i18next";
import i18n from "../../locale/i18n";
import { ToDoSearch } from "./ToDoSearch";
import { FC } from "react";

interface NavBarProps {
  menuKey: string;
}

export const NavBar: FC<NavBarProps> = ({ menuKey }) => {
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
        md={{ span: 4, offset: 10 }}
        lg={{ span: 6, offset: 7 }}
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
    </Row>
  );
};
