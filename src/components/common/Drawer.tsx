import { Drawer } from "antd";

type CustomDrawerProps = {
  title: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const CustomDrawer = ({
  title,
  open,
  onClose,
  children,
}: CustomDrawerProps) => {
  return (
    <>
      <Drawer title={title} onClose={onClose} open={open} destroyOnClose>
        {children}
      </Drawer>
    </>
  );
};

export default CustomDrawer;
