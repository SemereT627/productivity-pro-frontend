import styled from "@emotion/styled";
import { Button, Popconfirm, Table, Typography } from "antd";
import { useDispatch } from "react-redux";
import { RootStates } from "../../store/interface";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchGenresStart } from "../../store/features/genre.slice";
import { Genre } from "../../store/types/genre.types";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CustomDrawer from "../../components/common/Drawer";
import GenreForm from "../../components/dashboard/genre/forms/GenreForm";

const DashboardGenrePage = () => {
  /**
   * states
   */
  const [openCreateGenreDrawer, setOpenCreateGenreDrawer] = useState(false);
  const [openEditGenreDrawer, setOpenEditGenreDrawer] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<Genre>();

  /**
   * hooks
   */
  const dispatch = useDispatch();

  /**
   * selectors
   */
  const { genres, loading } = useSelector((state: RootStates) => state.genres);

  /**
   * functions
   */
  const handleCreateGenreDrawerClose = () => {
    setOpenCreateGenreDrawer(false);
  };

  const handleEditGenreDrawerClose = () => {
    setOpenEditGenreDrawer(false);
  };

  /**
   * effects
   */
  useEffect(() => {
    dispatch(fetchGenresStart());
  }, [dispatch]);

  /**
   * yup and formik
   */

  /**
   * variables
   */
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Actions",
      key: "actions",
      render: (genre: Genre) => (
        <>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedGenre(genre);
              setOpenEditGenreDrawer(true);
            }}
          >
            <EditOutlined /> Edit
          </Button>
          <Popconfirm
            title="Are you sure?"
            okText="Yes"
            okType="danger"
            cancelText="No"
            // onConfirm={() => dispatch(deleteDriverAsync(id))}
            // disabled={deleteDriverLoading}
          >
            <Button danger>
              <DeleteOutlined /> Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const TableHeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
  `;

  return (
    <>
      <TableHeaderWrapper>
        <Typography.Title level={4} style={{ margin: 0 }}>
          Genres
        </Typography.Title>
        <Button
          type="primary"
          onClick={() => {
            setOpenCreateGenreDrawer(true);
          }}
        >
          Create Genre
        </Button>
      </TableHeaderWrapper>

      <Table
        rowKey="_id"
        loading={loading}
        columns={columns}
        dataSource={genres}
      />

      <CustomDrawer
        title={"Create Genre"}
        onClose={handleCreateGenreDrawerClose}
        open={openCreateGenreDrawer}
      >
        <GenreForm
          genre={selectedGenre}
          onClose={handleCreateGenreDrawerClose}
        />
      </CustomDrawer>
      <CustomDrawer
        title={"Edit Genre"}
        onClose={handleEditGenreDrawerClose}
        open={openEditGenreDrawer}
      >
        <GenreForm
          isEdit
          genre={selectedGenre}
          onClose={handleEditGenreDrawerClose}
        />
      </CustomDrawer>
    </>
  );
};

export default DashboardGenrePage;
