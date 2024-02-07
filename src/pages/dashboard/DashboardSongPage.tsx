import { Button, Popconfirm, Table, Typography } from "antd";
import { useSelector } from "react-redux";
import { RootStates } from "../../store/interface";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchSongsStart } from "../../store/features/song.slice";
import styled from "@emotion/styled";
import CustomDrawer from "../../components/common/Drawer";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Song } from "../../store/types/song.types";
import SongForm from "../../components/dashboard/song/forms/SongForm";

const DashboardSongPage = () => {
  /**
   * states
   */
  const [openCreateSongDrawer, setOpenCreateSongDrawer] = useState(false);
  const [openEditSongDrawer, setOpenEditSongDrawer] = useState(false);
  const [selectedSong, setSelectedSong] = useState<Song>();

  /**
   * hooks
   */
  const dispatch = useDispatch();

  /**
   * selectors
   */
  const { songs, loading } = useSelector((state: RootStates) => state.songs);

  /**
   * functions
   */
  const handleCreateSongDrawerClose = () => {
    setOpenCreateSongDrawer(false);
  };

  const handleEditSongDrawerClose = () => {
    setOpenEditSongDrawer(false);
  };

  /**
   * effects
   */
  useEffect(() => {
    dispatch(fetchSongsStart());
  }, [dispatch]);

  /**
   * yup and formik
   */

  /**
   * variables
   */
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Album",
      dataIndex: "album",
      key: "album",
    },
    {
      title: "Genre",
      dataIndex: "genre",
      key: "genre",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
    },
    {
      title: "Actions",
      key: "action",
      render: (_text: unknown, record: unknown) => {
        return (
          <>
            <Button
              type="link"
              onClick={() => {
                setSelectedSong(record as Song);
                setOpenEditSongDrawer(true);
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
        );
      },
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
          Songs
        </Typography.Title>
        <Button type="primary" onClick={() => setOpenCreateSongDrawer(true)}>
          Create Song
        </Button>
      </TableHeaderWrapper>
      <Table
        rowKey="_id"
        loading={loading}
        columns={columns}
        dataSource={songs}
        scroll={{ x: 1200 }}
      />

      <CustomDrawer
        title={"Create Song"}
        open={openCreateSongDrawer}
        onClose={handleCreateSongDrawerClose}
      >
        <SongForm onClose={handleCreateSongDrawerClose} />
      </CustomDrawer>
      <CustomDrawer
        title="Edit Song"
        open={openEditSongDrawer}
        onClose={handleEditSongDrawerClose}
      >
        <SongForm
          isEdit
          song={selectedSong}
          onClose={handleEditSongDrawerClose}
        />
      </CustomDrawer>
    </>
  );
};

export default DashboardSongPage;
