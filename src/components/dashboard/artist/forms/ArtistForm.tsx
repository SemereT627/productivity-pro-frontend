import { useDispatch } from "react-redux";
import { Artist } from "../../../../store/types/artist.types";
import { RootStates } from "../../../../store/interface";
import {
  clearCreateArtist,
  clearUpdateArtist,
  createArtistStart,
  updateArtistStart,
} from "../../../../store/features/artist.slice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { globalNotification } from "../../../../utils/notifications";
import { Button, Col, DatePicker, Form, Input, Row } from "antd";
import styled from "@emotion/styled";
import dayjs from "dayjs";

type ArtistFormProps = {
  isEdit?: boolean;
  artist?: Artist;
  onClose: () => void;
};

const ArtistForm = ({ isEdit, artist, onClose }: ArtistFormProps) => {
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
  const { createArtistSuccess, loading, error, updateArtistSuccess } =
    useSelector((state: RootStates) => state.artists);

  /**
   * functions
   */
  const handleSubmit = (values: Artist) => {
    const birthDate = dayjs(values.birthDate).format("YYYY-MM-DD");
    const result = { ...values, birthDate };

    if (isEdit) dispatch(updateArtistStart({ ...result, _id: artist?._id }));
    else dispatch(createArtistStart(result));
  };

  const onReset = () => {
    form.resetFields();
  };

  /**
   * effects
   */

  useEffect(() => {
    if (createArtistSuccess) {
      globalNotification("success", "Artist created successfully");
      form.resetFields();
      onClose();
      dispatch(clearCreateArtist());
    }

    if (updateArtistSuccess) {
      globalNotification("info", "Artist updated successfully");
      form.resetFields();
      onClose();
      dispatch(clearUpdateArtist());
    }

    if (error) {
      globalNotification("error", error);
      dispatch(clearCreateArtist());
      dispatch(clearUpdateArtist());
    }
  }, [
    createArtistSuccess,
    updateArtistSuccess,
    error,
    form,
    dispatch,
    onClose,
  ]);

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
      name="artistForm"
      layout="vertical"
      onFinish={handleSubmit}
      validateMessages={{ required: "${label} is required!" }}
      scrollToFirstError
      requiredMark={false}
      style={{ height: "100%" }}
      initialValues={
        isEdit
          ? {
              name: artist?.name,
              birthDate: dayjs(artist?.birthDate),
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
                label="Name"
                name="name"
                rules={[{ required: true }]}
              >
                <Input placeholder="Type the artist name" />
              </FormItemStyled>
            </Col>
            <Col span={24}>
              <FormItemStyled
                label="Birth Date"
                name="birthDate"
                rules={[{ required: true }]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  placeholder="Select the birth date of the artist"
                  maxDate={dayjs(dayjs().subtract(18, "year").toDate())}
                />
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

export default ArtistForm;
