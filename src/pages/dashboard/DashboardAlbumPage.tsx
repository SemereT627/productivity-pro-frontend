import styled from "@emotion/styled";
import { Button, Table, Typography } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAlbumsStart } from "../../store/features/album.slice";
import { useSelector } from "react-redux";
import { RootStates } from "../../store/interface";

const DashboardAlbumPage = () => {
  /**
   * states
   */
  /**
   * hooks
   */
  const dispatch = useDispatch();

  /**
   * selectors
   */
  const { albums, loading } = useSelector((state: RootStates) => state.albums);
  /**
   * functions
   */
  /**
   * effects
   */
  useEffect(() => {
    dispatch(fetchAlbumsStart());
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
      title: "Release Date",
      dataIndex: "releaseDate",
      key: "releaseDate",
    },
    {
      title: "Artist",
      dataIndex: "artist",
      key: "artist",
    },
    {
      title: "Actions",
      dataIndex: "actions",
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
        <Button type="primary">Create Album</Button>
      </TableHeaderWrapper>
      <Table
        rowKey="_id"
        loading={loading}
        columns={columns}
        dataSource={albums}
      />
    </>
  );
};

export default DashboardAlbumPage;
