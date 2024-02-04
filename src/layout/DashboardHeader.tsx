import { Button } from "antd";
import { Header } from "antd/es/layout/layout";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

type DashboardHeaderProps = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  colorBgContainer: string;
};

const DashboardHeader = ({
  collapsed,
  setCollapsed,
  colorBgContainer,
}: DashboardHeaderProps) => {
  return (
    <Header style={{ padding: 0, background: colorBgContainer }}>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />
    </Header>
  );
};

export default DashboardHeader;
