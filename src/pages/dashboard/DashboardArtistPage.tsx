import styled from "@emotion/styled";
import { Button, Table, Typography } from "antd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootStates } from "../../store/interface";
import { useEffect } from "react";
import { fetchArtistsStart } from "../../store/features/artist.slice";

const DashboardArtistPage = () => {
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
  const { artists, loading } = useSelector(
    (state: RootStates) => state.artists
  );

  /**
   * functions
   */

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
    },
    {
      title: "Actions",
      key: "actions",
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
        <Button type="primary">Create Artist</Button>
      </TableHeaderWrapper>

      <Table
        rowKey="_id"
        loading={loading}
        columns={columns}
        dataSource={artists}
      />
    </>
  );
};

export default DashboardArtistPage;
