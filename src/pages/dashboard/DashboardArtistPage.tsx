import styled from "@emotion/styled";
import { Button, Popconfirm, Table, Typography } from "antd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootStates } from "../../store/interface";
import { useEffect, useState } from "react";
import { fetchArtistsStart } from "../../store/features/artist.slice";
import { Artist } from "../../store/types/artist.types";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CustomDrawer from "../../components/common/Drawer";
import ArtistForm from "../../components/dashboard/artist/forms/ArtistForm";
import {
  humanizeDateUTCWithTime,
  humanizeDateUTCWithoutTime,
} from "../../utils/humanizeDate";

const DashboardArtistPage = () => {
  /**
   * states
   */
  const [openCreateArtistDrawer, setOpenCreateArtistDrawer] = useState(false);
  const [openEditArtistDrawer, setOpenEditArtistDrawer] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<Artist>();

  /**
   * hooks
   */
  const dispatch = useDispatch();

  /**
   * selectors
   */
  const { artists, loading } = useSelector(
    (state: RootStates) => state.artists
  );

  /**
   * functions
   */
  const handleCreateArtistDrawerClose = () => {
    setOpenCreateArtistDrawer(false);
  };

  const handleEditArtistDrawerClose = () => {
    setOpenEditArtistDrawer(false);
  };

  /**
   * effects
   */
  useEffect(() => {
    dispatch(fetchArtistsStart());
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
      title: "Birth Date",
      dataIndex: "birthDate",
      key: "birthDate",
      render: (_: unknown, record: Artist) =>
        humanizeDateUTCWithoutTime(record.birthDate),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_: unknown, record: Artist) =>
        humanizeDateUTCWithTime(record.createdAt!),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (_: unknown, record: Artist) =>
        humanizeDateUTCWithTime(record.updatedAt!),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_text: unknown, record: Artist) => (
        <>
          <Button
            type="link"
            onClick={() => {
              setSelectedArtist(record);
              setOpenEditArtistDrawer(true);
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
          Artists
        </Typography.Title>
        <Button type="primary" onClick={() => setOpenCreateArtistDrawer(true)}>
          Create Artist
        </Button>
      </TableHeaderWrapper>

      <Table
        rowKey="_id"
        loading={loading}
        columns={columns}
        dataSource={artists}
      />

      <CustomDrawer
        title={"Create Artist"}
        onClose={handleCreateArtistDrawerClose}
        open={openCreateArtistDrawer}
      >
        <ArtistForm
          artist={selectedArtist}
          onClose={handleCreateArtistDrawerClose}
        />
      </CustomDrawer>
      <CustomDrawer
        title={"Edit Artist"}
        onClose={handleEditArtistDrawerClose}
        open={openEditArtistDrawer}
      >
        <ArtistForm
          isEdit
          artist={selectedArtist}
          onClose={handleEditArtistDrawerClose}
        />
      </CustomDrawer>
    </>
  );
};

export default DashboardArtistPage;
