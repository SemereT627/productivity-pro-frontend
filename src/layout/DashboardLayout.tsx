import { useState } from "react";
import { Layout, theme } from "antd";
import { Outlet } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import DashboardSider from "./DashboardSider";

const { Content } = Layout;

const DashboardLayout = () => {
  /**
   * states
   */
  const [collapsed, setCollapsed] = useState(false);

  /**
   * hooks
   */
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  /**
   * selectors
   */

  /**
   * functions
   */

  /**
   * effects
   */

  /**
   * yup and formik
   */

  /**
   * variables
   */

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <DashboardSider collapsed={collapsed} />
      <Layout>
        <DashboardHeader
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          colorBgContainer={colorBgContainer}
        />
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
