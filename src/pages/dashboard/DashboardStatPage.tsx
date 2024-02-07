import styled from "@emotion/styled";
import { Col, Row, Space, Typography } from "antd";
import { RootStates } from "../../store/interface";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  clearStatsError,
  fetchStatsStart,
} from "../../store/features/stat.slice";
import CountUp from "react-countup";
import { globalNotification } from "../../utils/notifications";

const DashboardStatPage = () => {
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
  const { stat, loading, error, genreSongs, artistStats, albumSongs } =
    useSelector((state: RootStates) => state.stats);

  /**
   * functions
   */

  /**
   * effects
   */
  useEffect(() => {
    dispatch(fetchStatsStart());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      globalNotification("error", error);
      dispatch(clearStatsError());
    }
  }, [error, dispatch]);

  /**
   * yup and formik
   */

  /**
   * variables
   */
  const CardStyled = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  `;

  const CardTitleStyled = styled.div`
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
    color: navy;
  `;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Typography.Title level={3}>Dashboard Statistics</Typography.Title>
      <Row gutter={16}>
        <Col span={6}>
          <CardStyled>
            <CardTitleStyled>Total Songs</CardTitleStyled>
            <Typography.Title level={1}>
              <CountUp end={stat.songs} />
            </Typography.Title>
          </CardStyled>
        </Col>
        <Col span={6}>
          <CardStyled>
            <CardTitleStyled>Total Genres</CardTitleStyled>
            <Typography.Title level={1}>
              <CountUp end={stat.genres} />
            </Typography.Title>
          </CardStyled>
        </Col>
        <Col span={6}>
          <CardStyled>
            <CardTitleStyled>Total Albums</CardTitleStyled>
            <Typography.Title level={1}>
              <CountUp end={stat.albums} />
            </Typography.Title>
          </CardStyled>
        </Col>
        <Col span={6}>
          <CardStyled>
            <CardTitleStyled>Total Artists</CardTitleStyled>
            <Typography.Title level={1}>
              <CountUp end={stat.artists} />
            </Typography.Title>
          </CardStyled>
        </Col>
      </Row>

      <Typography.Title level={3} style={{ marginTop: "40px" }}>
        # of Songs by Genre
      </Typography.Title>
      <Row gutter={16}>
        {genreSongs.map((genre) => {
          return (
            <Col span={6} key={genre._id._id}>
              <CardStyled>
                <CardTitleStyled>Genre - {genre._id.name}</CardTitleStyled>
                <Typography.Text>
                  <CountUp end={genre.count} /> Songs
                </Typography.Text>
              </CardStyled>
            </Col>
          );
        })}
      </Row>
      <Typography.Title level={3} style={{ marginTop: "40px" }}>
        # of Songs and Albums by Artist
      </Typography.Title>
      <Row gutter={16}>
        {artistStats.map((artist) => {
          return (
            <Col span={6} key={artist.artist}>
              <CardStyled>
                <CardTitleStyled>Artist - {artist.artist}</CardTitleStyled>
                <Space direction="vertical">
                  <Typography.Text>
                    <CountUp end={artist.albums} /> Albums
                  </Typography.Text>

                  <Typography.Text>
                    <CountUp end={artist.songs} /> Songs
                  </Typography.Text>
                </Space>
              </CardStyled>
            </Col>
          );
        })}
      </Row>
      <Typography.Title level={3} style={{ marginTop: "40px" }}>
        # of Songs in Albums
      </Typography.Title>
      <Row gutter={16}>
        {albumSongs.map((album, index) => {
          return (
            <Col span={6} key={album._id.title + index}>
              <CardStyled>
                <CardTitleStyled>Album - {album._id.title}</CardTitleStyled>
                <Typography.Text>
                  <CountUp end={album.count} /> Songs
                </Typography.Text>
              </CardStyled>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default DashboardStatPage;
