import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import { useDispatch } from "react-redux";
import { RootStates } from "../../../../store/interface";
import { useSelector } from "react-redux";
import {
  clearCreateAlbum,
  clearUpdateAlbum,
  createAlbumStart,
  updateAlbumStart,
} from "../../../../store/features/album.slice";
import { useEffect } from "react";
import { globalNotification } from "../../../../utils/notifications";
import styled from "@emotion/styled";
import { Album } from "../../../../store/types/album.types";
import dayjs from "dayjs";
import { fetchArtistsStart } from "../../../../store/features/artist.slice";

type AlbumFormProps = {
  isEdit?: boolean;
  album?: Album;
  onClose: () => void;
};

const AlbumForm = ({ isEdit, album, onClose }: AlbumFormProps) => {
  console.log(album);
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
  const { artists, loading: fetchArtistsLoading } = useSelector(
    (state: RootStates) => state.artists
  );
  const { createAlbumSuccess, loading, error, updateAlbumSuccess } =
    useSelector((state: RootStates) => state.albums);

  /**
   * functions
   */
  const handleSubmit = (values: Album) => {
    console.log(values);
    if (isEdit) dispatch(updateAlbumStart({ ...values, _id: album?._id }));
    else dispatch(createAlbumStart(values));
  };

  const onReset = () => {
    form.resetFields();
  };

  /**
   * effects
   */
  useEffect(() => {
    dispatch(fetchArtistsStart());
  }, [dispatch]);

  useEffect(() => {
    if (createAlbumSuccess) {
      globalNotification("success", "Album created successfully");
      onClose();
      form.resetFields();
      dispatch(clearCreateAlbum());
    }

    if (updateAlbumSuccess) {
      globalNotification("success", "Album updated successfully");
      onClose();
      form.resetFields();
      dispatch(clearUpdateAlbum());
    }

    if (error) {
      globalNotification("error", error);
      dispatch(clearCreateAlbum());
      dispatch(clearUpdateAlbum());
    }
  }, [createAlbumSuccess, form, onClose, updateAlbumSuccess, error, dispatch]);

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
      name="albumForm"
      layout="vertical"
      onFinish={handleSubmit}
      validateMessages={{ required: "This field is required" }}
      scrollToFirstError
      requiredMark={false}
      style={{ height: "100%" }}
      initialValues={
        isEdit
          ? {
              title: album?.title,
              releaseDate: dayjs(album?.releaseDate),
              artist: album?.artist,
            }
          : {}
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
          <Row>
            <Col span={24}>
              <FormItemStyled
                label="Title"
                name="title"
                rules={[{ required: true }]}
              >
                <Input size="large" placeholder="Type the album title" />
              </FormItemStyled>
            </Col>
            <Col span={24}>
              <FormItemStyled
                label="Release Date"
                name="releaseDate"
                rules={[{ required: true }]}
              >
                <DatePicker
                  size="large"
                  minDate={dayjs(dayjs().toDate())}
                  style={{ width: "100%" }}
                />
              </FormItemStyled>
            </Col>
            <Col span={24}>
              <FormItemStyled
                label="Artist"
                name="artist"
                rules={[{ required: true }]}
              >
                <Select
                  loading={fetchArtistsLoading}
                  size="large"
                  showSearch
                  placeholder="Select artist"
                  className="!h-[35.96px] !border !rounded-l-lg border-none outline-none select-style"
                  optionFilterProp="children"
                >
                  {artists.map((artist) => {
                    return (
                      <Option key={artist._id} value={artist._id}>
                        {artist.name}
                      </Option>
                    );
                  })}
                </Select>
              </FormItemStyled>
            </Col>
          </Row>
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

export default AlbumForm;
