import { UserOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

export const UserButton = () => {
  const { signout } = useContext(AuthContext);
  return (
    <Button
      icon={<UserOutlined className="" />}
      className="flex justify-center items-center"
      shape="circle"
      key={"userBtn"}
      onClick={signout}
    ></Button>
  );
};
