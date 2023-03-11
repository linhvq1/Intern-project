import React, { useEffect, useState } from "react";
import HeaderTitle from "../../components/HeaderTitle";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Row,
  Col,
  Checkbox,
  message,
  Modal,
  Result,
  Popconfirm,
} from "antd";
import {CloseCircleOutlined} from '@ant-design/icons'
import PickIcon from "../../components/PickIcon";
import CustomTable from "../../components/CustomTable";
import { useNavigate, useParams } from "react-router-dom";
import { CustomForm } from "./style";
import RoomModal from "./RoomModal";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import moment from "moment";
import vi from "antd/lib/date-picker/locale/vi_VN";

import SuccessImage from "../../assets/pngs/payment-successful.webp";

function AddScheduleInfo({ commonStore, scheduleStore }) {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const [schedule, setschedule] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [isOpenEndModal, setIsOpenEndModal] = useState({ open: false });
  const [resMessage, setResMessage] = useState("");

  useEffect(() => {
    console.log("scheduleStore.schedules", toJS(scheduleStore.schedules));
    if (id) {
      setIsEditMode(true);
      scheduleStore
        .searchScheduleList({ denpyono: id })
        .then((res) => {
          if (res?.length) {
            form.setFieldsValue({
              ...res[0],
              denpyodt: moment(res[0]?.denpyodt).format("DD-MM-YYYY"),
              shiharaidt: moment(res[0]?.shiharaidt),
              uketukedt: moment(res[0]?.uketukedt),
            });
            handleOnChangeRoomId(res[0]?.bumoncd_ykanr);
          }
        })
        .catch((err) => {
          message.error("something went wrong");
        });
    }
  }, []);

  useEffect(() => {
    if (commonStore.selectedRoom) {
      let { bumoncd, bumonnm } = commonStore.selectedRoom;
      form.setFieldsValue({
        bumoncd_ykanr: bumoncd,
        bumonnm,
      });
    }
  }, [commonStore.selectedRoom]);

  const columns = [
    {
      title: "交通費",
      children: [
        {
          title: "行",
          dataIndex: "index",
          width: "3%",
          key: "index",
          render: (text) => <a>{text}</a>,
          align: "center",
        },
        {
          title: "年月日",
          dataIndex: "spliNum",
          key: "spliNum",
          width: "8%",
          align: "center",
        },
        {
          title: "出発地",
          dataIndex: "ticket",
          key: "ticket",
          width: "10%",
          align: "center",
        },
        {
          title: "目的地",
          dataIndex: "splitDate",
          key: "splitDate",
          width: "10%",
          align: "center",
        },
        {
          title: "経路",
          dataIndex: "filingDate",
          key: "filingDate",
          width: "20%",
          align: "center",
        },
        {
          title: "金額",
          dataIndex: "casherMethod",
          key: "casherMethod",
          width: "5%",
          align: "center",
        },
      ],
    },
  ];

  const onSubmit = () => {
    form.validateFields().then((response) => {
      if (isEditMode) {
        scheduleStore
          .updateSchedule(id, response)
          .then((res) => {
            setIsOpenEndModal({ open: true, mode: 1 });
            setResMessage(res);
          })
          .catch((err) => message.error("Fail to update!"));
      } else
        scheduleStore
          .createSchedule(response)
          .then((res) => {
            setIsOpenEndModal({ open: true, mode: 0 });
            setResMessage(res);
          })
          .catch((err) => message.error("Fail to create!"));
    });
  };

  const handleOnChangeRoomId = (value) => {
    if (!value) {
      form.setFieldsValue({ bumonnm: "" });
      return;
    }
    commonStore.searchRoom({ bumoncd: value }).then((res) => {
      if (res?.length > 0) {
        let { bumonnm } = res[0];
        form.setFieldsValue({
          bumonnm,
        });
      } else form.setFieldsValue({ bumonnm: "" });
    });
  };
  const formatDate = (date) => {
    return date?.format("DD-MM-YYYY");
  };

  const confirm = () => {
    scheduleStore
      .deleteSchedule(id)
      .then((res) => {
        setIsOpenEndModal({ open: true, mode: 2 });
        setResMessage(res);
      })
      .catch((err) => message.error("Fail to delete!"));
  };
  return (
    <div className="p-3 pb-14 h-full overflow-y-auto">
      <HeaderTitle text={"予定伝票入力"} />
      <div>
        <CustomForm
          form={form}
          name="create_schedule"
          onFinish={() => onSubmit()}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 20,
          }}
          style={{
            maxWidth: "100%",
          }}
        >
          <Form.Item label="伝票番号">
            <Form.Item name={"denpyono"} className="mb-0">
              <Input
                style={{
                  width: 150,
                }}
                disabled
              />
            </Form.Item>
            <div className="flex gap-3 text-white ml-auto lg:pr-10">
              <Button htmlType="submit" className="bg-gray-500 text-white">
                登録
              </Button>

              <Popconfirm
                title="Delete the record"
                description="Are you sure to delete this record?"
                okText="Ok"
                okButtonProps={{
                  className: `bg-blue-500 text-white`,
                }}
                cancelText="Cancel"
                onConfirm={confirm}
                disabled={!isEditMode}
              >
                <Button
                  className={
                    isEditMode ? `bg-gray-500 text-white` : `bg-gray-200`
                  }
                >
                  削除
                </Button>
              </Popconfirm>
              <Button
                className="bg-gray-500 text-white"
                onClick={() => navigate(-1)}
              >
                終了
              </Button>
            </div>
          </Form.Item>
          <Form.Item label="伝票日付">
            <Row style={{ width: "100%" }}>
              <Col sm={24} md={8}>
                <Form.Item name={"denpyodt"} className="mb-0">
                  <Input
                    style={{
                      width: 150,
                    }}
                    disabled
                  />
                </Form.Item>
              </Col>
              <Col sm={24} md={16}>
                <div className="flex justify-end gap-20 text-white lg:pr-10">
                  <Form.Item
                    label="出納方法"
                    name={"suitokb"}
                    className="mb-0"
                    rules={[
                      {
                        required: true,
                        message: "Please select",
                      },
                    ]}
                  >
                    <Select
                      style={{
                        width: 150,
                      }}
                      options={[
                        {
                          value: "online",
                        },
                        {
                          value: "offline",
                        },
                      ]}
                    ></Select>
                  </Form.Item>
                  <Form.Item
                    label="支払予定日"
                    name={"shiharaidt"}
                    className="mb-0"
                    rules={[
                      {
                        required: true,
                        message: "Please select",
                      },
                    ]}
                  >
                    <DatePicker
                      format={"DD-MM-YYYY"}
                      style={{
                        width: 150,
                      }}
                      inputReadOnly
                      suffixIcon={<PickIcon />}
                      clearIcon={<PickIcon icon={<CloseCircleOutlined />}/>}
                    />
                  </Form.Item>
                </div>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item
            label="年度"
            name="kaikeind"
            rules={[
              {
                required: true,
                message: "Please select",
              },
            ]}
          >
            <Select
              style={{
                width: 150,
              }}
              options={[
                {
                  value: "2022",
                },
                {
                  value: "2021",
                },
                {
                  value: "2020",
                },
              ]}
            ></Select>
          </Form.Item>
          <Form.Item
            label="申請日"
            name={"uketukedt"}
            rules={[
              {
                required: true,
                message: "Please select",
              },
            ]}
          >
            <DatePicker
              format={"DD-MM-YYYY"}
              style={{
                width: 150,
              }}
              inputReadOnly
              suffixIcon={<PickIcon />}
              clearIcon={<PickIcon icon={<CloseCircleOutlined />}/>}
            />
          </Form.Item>
          <Form.Item label="起票部門">
            <Form.Item
              name="bumoncd_ykanr"
              className="mb-0 mr-3"
              rules={[
                {
                  required: true,
                  message: "Please input",
                },
              ]}
            >
              <Input
                style={{
                  width: 100,
                }}
                onChange={(e) => handleOnChangeRoomId(e.target.value)}
              />
            </Form.Item>
            <Form.Item name="bumonnm" className="mb-0 mr-3">
              <Input
                style={{
                  width: 180,
                }}
                disabled
              />
            </Form.Item>
            <Button
              className="px-0 py-0"
              icon={<PickIcon />}
              onClick={() => commonStore.setIsShowRoomModal(true)}
            />
          </Form.Item>
          <Form.Item
            label={
              <div>
                出張目的
                <p>（備考）</p>
              </div>
            }
            className="trip-purpose-form-item"
            name={"biko"}
            rules={[
              {
                required: true,
                message: "Please input",
              },
            ]}
          >
            <Input
              style={{
                width: 150,
              }}
            />
          </Form.Item>
          <Row>
            <Col span={4} className="text-end"></Col>
            <Col span={20} className="flex justify-end lg:pr-10">
              <Button
                className="bg-gray-500 text-white"
                onClick={() => navigate(`/detail-schedule/${1}`)}
              >
                明細追加
              </Button>
            </Col>
          </Row>
        </CustomForm>
      </div>
      <CustomTable
        columns={columns}
        styles={"lg:pr-9 lg:pl-14 xl:pl-28 mt-4"}
        sumable={true}
      />
      <RoomModal />
      <Modal closable={false} open={isOpenEndModal.open} footer={false}>
        <Result
          status="success"
          icon={<img src={SuccessImage} alt="success" />}
          title={
            (isOpenEndModal.mode === 1 && "Update succesfully!") ||
            (isOpenEndModal.mode === 0 && "Create Successfully!") ||
            (isOpenEndModal.mode === 2 && "Delete succesfully!")
          }
          subTitle={resMessage}
          extra={[
            <Button
              className="bg-blue-500 text-white"
              key="console"
              onClick={() => navigate(-1)}
            >
              Home
            </Button>,
          ]}
        />
      </Modal>
    </div>
  );
}

export default inject(
  "commonStore",
  "scheduleStore"
)(observer(AddScheduleInfo));
