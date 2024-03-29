import styled from "@emotion/styled";
import { Button, Popconfirm, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  clearDeleteAlbum,
  deleteAlbumStart,
  fetchAlbumsStart,
} from "../../store/features/album.slice";
import { useSelector } from "react-redux";
import { RootStates } from "../../store/interface";
import { Album } from "../../store/types/album.types";
import CustomDrawer from "../../components/common/Drawer";
import AlbumForm from "../../components/dashboard/album/forms/AlbumForm";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { humanizeDateUTCWithTime } from "../../utils/humanizeDate";
import { globalNotification } from "../../utils/notifications";
import { fetchArtistsStart } from "../../store/features/artist.slice";
import { CustomError } from "../../store/types/common.types";

const DashboardAlbumPage = () => {
  /**
   * states
   */
  const [openCreateAlbumDrawer, setOpenCreateAlbumDrawer] = useState(false);
  const [openEditAlbumDrawer, setOpenEditAlbumDrawer] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<Album>();

  /**
   * hooks
   */
  const dispatch = useDispatch();

  /**
   * selectors
   */
  const { albums, delAlbumSuccess, loading, error } = useSelector(
    (state: RootStates) => state.albums
  );

  /**
   * functions
   */
  const handleCreateAlbumDrawerClose = () => {
    setOpenCreateAlbumDrawer(false);
  };

  const handleEditAlbumDrawerClose = () => {
    setOpenEditAlbumDrawer(false);
  };

  /**
   * effects
   */
  useEffect(() => {
    dispatch(fetchAlbumsStart());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchArtistsStart());
  }, [dispatch]);

  useEffect(() => {
    if (delAlbumSuccess) {
      globalNotification("success", "Album deleted successfully");
      dispatch(clearDeleteAlbum());
    }

    if (typeof error !== "string") {
      globalNotification("error", (error as CustomError).response.data.error);
      dispatch(clearDeleteAlbum());
    }

    if (typeof error === "string" && error) {
      globalNotification("error", error);
      dispatch(clearDeleteAlbum());
    }
  }, [delAlbumSuccess, dispatch, error]);

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
      title: "Release Date",
      dataIndex: "releaseDate",
      key: "releaseDate",
      render: (_: unknown, record: Album) =>
        humanizeDateUTCWithTime(record.releaseDate),
    },
    {
      title: "Artist",
      dataIndex: "artist",
      key: "artist",
      render: (_: unknown, record: Album) => (
        <Typography.Text>{record?.artist?.name}</Typography.Text>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_: unknown, record: Album) =>
        humanizeDateUTCWithTime(record.createdAt!),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (_: unknown, record: Album) =>
        humanizeDateUTCWithTime(record.updatedAt!),
    },
    {
      title: "Actions",
      dataIndex: "id",
      key: "actions",
      render: (_: unknown, record: Album) => (
        <>
          <Button
            type="link"
            onClick={() => {
              setSelectedAlbum(record);
              setOpenEditAlbumDrawer(true);
            }}
          >
            <EditOutlined /> Edit
          </Button>
          <Popconfirm
            title="Are you sure?"
            okText="Yes"
            okType="danger"
            cancelText="No"
            onConfirm={() => dispatch(deleteAlbumStart(record._id))}
            disabled={loading}
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
          Albums
        </Typography.Title>
        <Button type="primary" onClick={() => setOpenCreateAlbumDrawer(true)}>
          Create Album
        </Button>
      </TableHeaderWrapper>
      <Table
        rowKey="_id"
        loading={loading}
        columns={columns}
        dataSource={albums}
      />

      <CustomDrawer
        title={"Create Album"}
        onClose={handleCreateAlbumDrawerClose}
        open={openCreateAlbumDrawer}
      >
        <AlbumForm
          album={selectedAlbum}
          onClose={handleCreateAlbumDrawerClose}
        />
      </CustomDrawer>
      <CustomDrawer
        title={"Edit Album"}
        onClose={handleEditAlbumDrawerClose}
        open={openEditAlbumDrawer}
      >
        <AlbumForm
          isEdit
          album={selectedAlbum}
          onClose={handleEditAlbumDrawerClose}
        />
      </CustomDrawer>
    </>
  );
};

export default DashboardAlbumPage;
