import { Button, Col, Form, Input, Row } from "antd";
import { Genre } from "../../../../store/types/genre.types";
import { useDispatch } from "react-redux";
import { RootStates } from "../../../../store/interface";
import { useSelector } from "react-redux";
import {
  clearCreateGenre,
  clearUpdateGenre,
  createGenreStart,
  updateGenreStart,
} from "../../../../store/features/genre.slice";
import { useEffect } from "react";
import { globalNotification } from "../../../../utils/notifications";
import styled from "@emotion/styled";

type GenreFormProps = {
  isEdit?: boolean;
  genre?: Genre;
  onClose: () => void;
};

const GenreForm = ({ isEdit, genre, onClose }: GenreFormProps) => {
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
  const { createGenreSuccess, loading, error, updateGenreSuccess } =
    useSelector((state: RootStates) => state.genres);

  /**
   * functions
   */
  const handleSubmit = (values: Genre) => {
    if (isEdit) dispatch(updateGenreStart({ ...values, _id: genre?._id }));
    else dispatch(createGenreStart(values));
  };

  const onReset = () => {
    form.resetFields();
  };

  /**
   * effects
   */

  useEffect(() => {
    if (createGenreSuccess) {
      globalNotification("success", "Genre created successfully");
      onClose();
      form.resetFields();
      dispatch(clearCreateGenre());
    }

    if (updateGenreSuccess) {
      globalNotification("info", "Genre updated successfully");
      onClose();
      form.resetFields();
      dispatch(clearUpdateGenre());
    }

    if (error) {
      globalNotification("error", error);
      dispatch(clearCreateGenre());
      dispatch(clearUpdateGenre());
    }
  }, [createGenreSuccess, onClose, form, dispatch, updateGenreSuccess, error]);

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
      name="genreForm"
      layout="vertical"
      onFinish={handleSubmit}
      validateMessages={{ required: "This field is required" }}
      scrollToFirstError
      requiredMark={false}
      style={{ height: "100%" }}
      initialValues={
        isEdit
          ? {
              name: genre?.name,
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
                <Input size="large" placeholder="Type the genre name" />
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

export default GenreForm;
