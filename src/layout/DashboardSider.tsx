import Sider from "antd/es/layout/Sider";
import { DashboardLogo } from "./DashboardLogo";
import { Menu } from "antd";
import {
  PieChartOutlined,
  AudioOutlined,
  PlayCircleOutlined,
  BarsOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const DashboardSider = ({ collapsed }: { collapsed: boolean }) => {
  /**
   * states
   */

  /**
   * hooks
   */
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * selectors
   */

  /**
   * functions
   */
  const getItem = (
    label: string,
    key: string,
    icon: JSX.Element,
    children: null,
    type: string
  ) => {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  };

  /**
   * effects
   */
  useEffect(() => {
    localStorage.setItem("testMenuKey", location.pathname);
  }, [location.pathname]);

  /**
   * yup and formik
   */

  /**
   * variables
   */
  const sidebarMenuItems = [
    getItem("Stats", "stats", <PieChartOutlined />, null, "link"),
    getItem("Artists", "artists", <AudioOutlined />, null, "link"),
    getItem("Songs", "songs", <PlayCircleOutlined />, null, "link"),
    getItem("Genres", "genres", <BarsOutlined />, null, "link"),
    getItem("Albums", "albums", <AppstoreOutlined />, null, "link"),
  ];

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <DashboardLogo />
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[
          location.pathname.split("/")[location.pathname.split("/").length - 1],
        ]}
        items={sidebarMenuItems}
        onClick={({ key }) => {
          navigate(`/dashboard/${key}`, { replace: true });
        }}
      />
    </Sider>
  );
};

export default DashboardSider;
