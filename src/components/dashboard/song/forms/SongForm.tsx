import styled from "@emotion/styled";
import { Button, Col, Form, Input, Row } from "antd";
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

type SongFormProps = {
  onClose: () => void;
  isEdit?: boolean;
  song?: Song;
};

const SongForm = ({ isEdit, song, onClose }: SongFormProps) => {
  /**
   * states
   */

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

  /**
   * functions
   */
  const handleSubmit = (values: Song) => {
    if (isEdit) dispatch(updateSongStart({ ...values, _id: song?._id }));
    else dispatch(createSongStart(values));
  };

  const onReset = () => {
    form.resetFields();
  };

  /**
   * effects
   */

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
              artist: song?.artist,
              album: song?.album,
              genre: song?.genre,
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
            name={"artist"}
            label="Artist"
            hasFeedback
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input size="large" placeholder="Type the artist of the song" />
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
            <Input size="large" placeholder="Type the album of the song" />
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
            <Input size="large" placeholder="Type the genre of the song" />
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
