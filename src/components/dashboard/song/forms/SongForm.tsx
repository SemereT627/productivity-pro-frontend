import styled from "@emotion/styled";
import { Button, Col, Form, Input, Row, Select, TimePicker } from "antd";
import { useDispatch } from "react-redux";
import {
  clearCreateSong,
  clearUpdateSong,
  createSongStart,
  updateSongStart,
} from "../../../../store/features/song.slice";
import { Song } from "../../../../store/types/song.types";
import { useSelector } from "react-redux";
import { RootStates } from "../../../../store/interface";
import { useEffect } from "react";
import { globalNotification } from "../../../../utils/notifications";
import { fetchGenresStart } from "../../../../store/features/genre.slice";
import dayjs from "dayjs";
import { fetchAlbumsStart } from "../../../../store/features/album.slice";

type SongFormProps = {
  onClose: () => void;
  isEdit?: boolean;
  song?: Song;
};

const SongForm = ({ isEdit, song, onClose }: SongFormProps) => {
  /**
   * states
   */
  const { Option } = Select;

  /**
   * hooks
   */
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  /**
   * selectors
   */
  const { createSongSuccess, loading, error, updateSongSuccess } = useSelector(
    (state: RootStates) => state.songs
  );
  const { genres, loading: fetchGenreLoading } = useSelector(
    (state: RootStates) => state.genres
  );
  const { albums, loading: fetchAlbumsLoading } = useSelector(
    (state: RootStates) => state.albums
  );

  /**
   * functions
   */
  const handleSubmit = (values: Song) => {
    const result = {
      ...values,
      duration: dayjs(values.duration).format("mm:ss"),
    };
    if (isEdit) dispatch(updateSongStart({ ...result, _id: song?._id }));
    else dispatch(createSongStart(result));
  };

  const onReset = () => {
    form.resetFields();
  };

  /**
   * effects
   */
  useEffect(() => {
    dispatch(fetchGenresStart());
    dispatch(fetchAlbumsStart());
  }, [dispatch]);

  useEffect(() => {
    if (createSongSuccess) {
      globalNotification("success", "Song created successfully");
      form.resetFields();
      onClose();
      dispatch(clearCreateSong());
    }

    if (updateSongSuccess) {
      globalNotification("info", "Song updated successfully");
      form.resetFields();
      onClose();
      dispatch(clearUpdateSong());
    }

    if (error) {
      globalNotification("error", error);
      dispatch(clearCreateSong());
      dispatch(clearUpdateSong());
    }
  }, [createSongSuccess, updateSongSuccess, form, dispatch, onClose, error]);

  /**
   * yup and formik
   */

  /**
   * variables
   */

  const FormItemStyled = styled(Form.Item)`
    margin-bottom: 8px;
  `;

  return (
    <Form
      form={form}
      id="songForm"
      layout={"vertical"}
      onFinish={handleSubmit}
      validateMessages={{ required: "${label} is required!" }}
      scrollToFirstError
      requiredMark={false}
      style={{ height: "100%" }}
      initialValues={
        isEdit
          ? {
              title: song?.title,
              duration: dayjs(song?.duration, "mm:ss"),
              album: song?.album?._id,
              genre: song?.genre?._id,
            }
          : undefined
      }
    >
      <Row
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
        gutter={16}
      >
        <Col span={24}>
          <FormItemStyled
            name={"title"}
            label="Title"
            hasFeedback
            rules={[
              {
                required: true,
                min: 2,
                message: "Title should be at least 2 characters long!",
              },
            ]}
          >
            <Input size="large" placeholder="Type the title of the song" />
          </FormItemStyled>
          <FormItemStyled
            name={"duration"}
            label="Duration"
            hasFeedback
            rules={[
              {
                required: true,
              },
            ]}
          >
            <TimePicker
              size="large"
              style={{ width: "100%" }}
              placeholder="Select duration"
              type="time"
            />
          </FormItemStyled>
          <FormItemStyled
            name={"album"}
            label="Album"
            hasFeedback
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              loading={fetchAlbumsLoading}
              size="large"
              showSearch
              placeholder="Select album"
              className="!h-[35.96px] !border !rounded-l-lg border-none outline-none select-style"
              optionFilterProp="children"
            >
              {albums.map((album) => {
                return (
                  <Option key={album._id} value={album._id}>
                    {album.title}
                  </Option>
                );
              })}
            </Select>
          </FormItemStyled>
          <FormItemStyled
            name={"genre"}
            label="Genre"
            hasFeedback
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              loading={fetchGenreLoading}
              size="large"
              showSearch
              placeholder="Select genre"
              className="!h-[35.96px] !border !rounded-l-lg border-none outline-none select-style"
              optionFilterProp="children"
            >
              {genres.map((genre) => {
                return (
                  <Option key={genre._id} value={genre._id}>
                    {genre.name}
                  </Option>
                );
              })}
            </Select>
          </FormItemStyled>
        </Col>

        <Col
          style={{
            width: "100%",
            marginTop: "auto",
          }}
        >
          <Row gutter={16}>
            {!isEdit && (
              <Col span={12}>
                <FormItemStyled style={{ width: "100%" }}>
                  <Button
                    onClick={onReset}
                    style={{ width: "100%" }}
                    type="dashed"
                    danger
                  >
                    Clear
                  </Button>
                </FormItemStyled>
              </Col>
            )}
            <Col span={isEdit ? 24 : 12}>
              <FormItemStyled style={{ width: "100%" }}>
                <Button
                  htmlType="submit"
                  style={{ width: "100%" }}
                  type="primary"
                  loading={loading}
                  disabled={loading}
                >
                  {isEdit ? "Update" : "Submit"}
                </Button>
              </FormItemStyled>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

export default SongForm;
