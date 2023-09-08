import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { useContext } from "react";
import { AuthContext, AuthContextType } from "../context/AuthProvider";

export const Login = () => {
  const { signin } = useContext<AuthContextType>(AuthContext);
  const [form] = useForm();

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center">
      <h1>Note</h1>
      <Form
        form={form}
        name="normal_login"
        initialValues={{ remember: true }}
        onFinish={() =>
          signin({
            userName: form.getFieldValue("username") as string,
            password: form.getFieldValue("password") as string,
          })
        }
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};
