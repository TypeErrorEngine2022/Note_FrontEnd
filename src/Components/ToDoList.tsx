import { useEffect, useState } from "react";
import Layout, { Content, Header } from "antd/lib/layout/layout";
import { ToolsBar } from "./ToolsBar";
import Sider from "antd/es/layout/Sider";
import { SiderMenu } from "./SiderMenu";
import { NavBar } from "./NavBar";
import { ToDoListContent } from "./ToDoListContent";
import { useNavigate } from "react-router";
import axios from "axios";

export interface ToDoItem {
  id: string;
  content: string;
  isCompleted: boolean;
}

export class ToDoListItem {
  id: string;
  title: string;
  preview: string;
  isCompleted: boolean;
}

export const ToDoList = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [menuKey, setMenuKey] = useState<string>("Notes");
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        await axios.get("https://localhost:3333/auth/me", {
          withCredentials: true,
        });
      } catch (err) {
        navigate("/login", { replace: true });
      }
    };

    verify();
  }, []);

  const handleSelect = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(() =>
        selectedItems.filter((currentId) => currentId !== id)
      );
    } else setSelectedItems(() => [...selectedItems, id]);
  };

  return (
    <Layout className="w-[100vw] min-h-[100vh] bg-white">
      <Header className="bg-white border-b-4">
        {selectedItems.length > 0 && (
          <ToolsBar
            selectedItems={selectedItems}
            setSelectedItems={(newSelectedItems: string[]) =>
              setSelectedItems(() => newSelectedItems)
            }
          />
        )}
        {selectedItems.length === 0 && <NavBar menuKey={menuKey} />}
      </Header>

      <Layout hasSider={true}>
        <Sider
          theme="light"
          defaultCollapsed={false}
          collapsible={true}
          collapsedWidth="4em"
        >
          <SiderMenu
            selectedKey={menuKey}
            setMenuKey={(key: string) => setMenuKey(() => key)}
          />
        </Sider>
        <Content>
          <ToDoListContent
            selectedItems={selectedItems}
            setSelectedItems={(newSelectedItems: string[]) =>
              setSelectedItems(() => newSelectedItems)
            }
            handleSelect={handleSelect}
          />
        </Content>
      </Layout>
    </Layout>
  );
};
