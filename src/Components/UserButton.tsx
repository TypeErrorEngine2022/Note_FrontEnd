import { UserOutlined } from "@ant-design/icons";
import { Button } from "antd";

export const UserButton = () => {
  return (
    <Button
      icon={<UserOutlined className="" />}
      className="flex justify-center items-center"
      shape="circle"
      key={"userBtn"}
    ></Button>
  );
};
