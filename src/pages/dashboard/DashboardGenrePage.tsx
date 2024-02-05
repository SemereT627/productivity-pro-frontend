import styled from "@emotion/styled";
import { Button, Table, Typography } from "antd";
import { useDispatch } from "react-redux";
import { RootStates } from "../../store/interface";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchGenresStart } from "../../store/features/genre.slice";

const DashboardGenrePage = () => {
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
  const { genres, loading } = useSelector((state: RootStates) => state.genres);

  /**
   * functions
   */

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
        <Button type="primary">Create Genre</Button>
      </TableHeaderWrapper>

      <Table
        rowKey="_id"
        loading={loading}
        columns={columns}
        dataSource={genres}
      />
    </>
  );
};

export default DashboardGenrePage;
