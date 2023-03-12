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
  InputNumber,
} from "antd";
import { CloseCircleOutlined, DownOutlined } from "@ant-design/icons";
import PickIcon from "../../components/PickIcon";
import CustomTable from "../../components/CustomTable";
import { useNavigate, useParams } from "react-router-dom";
import { CustomForm } from "./style";
import RoomModal from "./RoomModal";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import moment from "moment";
import vi from "antd/lib/date-picker/locale/vi_VN";
import dayjs from "dayjs";

import SuccessImage from "../../assets/pngs/payment-successful.webp";

function isObjEmpty(obj) {
  if (
    obj &&
    Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype
  )
    return true;
  return false;
}

function mergeTwoArray(arr1, arr2, key) {
  let ids = new Set(arr1.map((d) => d[key]));
  let merged = [...arr1, ...arr2.filter((d) => !ids.has(d[key]))];
  return merged;
}

function AddScheduleInfo({ commonStore, scheduleStore }) {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const [schedule, setschedule] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [isOpenEndModal, setIsOpenEndModal] = useState({ open: false });
  const [resMessage, setResMessage] = useState("");
  const [tripData, setTripData] = useState([]);
  const [sumMoney, setsumMoney] = useState(0);

  useEffect(() => {
    const hanleTempRecord = (initialValue) => {
      let tripList = JSON.parse(localStorage.getItem("tripData"));
      if (!tripList)
        localStorage.setItem("tripData", JSON.stringify(initialValue));
      else {
        let arrMerge = mergeTwoArray(tripList, initialValue, "gyono");
        if (
          scheduleStore.selectedTrip &&
          !isObjEmpty(scheduleStore.selectedTrip)
        ) {
          if (
            !arrMerge.some(
              (trip) => trip.gyono === scheduleStore.selectedTrip?.gyono
            )
          ) {
            arrMerge = [...arrMerge, scheduleStore.selectedTrip];
          } else {
            arrMerge = arrMerge.map((el) =>
              el?.gyono === scheduleStore.selectedTrip?.gyono
                ? scheduleStore.selectedTrip
                : el
            );
          }
        }
        localStorage.setItem("tripData", JSON.stringify(arrMerge));
        return arrMerge;
      }
    };

    const handleSheduleTemp = (initialValue = {}) => {
      let scheduleData = JSON.parse(localStorage.getItem("scheduleData"));
      if (!scheduleData) {
        localStorage.setItem("scheduleData", JSON.stringify(initialValue));
        if (!isObjEmpty(initialValue)) {
          form.setFieldsValue({
            ...initialValue,
            denpyodt: moment(initialValue?.denpyodt).format("DD-MM-YYYY"),
            shiharaidt: dayjs(initialValue?.shiharaidt),
            uketukedt: dayjs(initialValue?.uketukedt),
            kaikeind: initialValue?.kaikeind
              ? dayjs(initialValue?.kaikeind)
              : null,
          });
          handleOnChangeRoomId(initialValue?.bumoncd_ykanr);
        }
      } else {
        form.setFieldsValue({
          ...scheduleData,
          denpyono: scheduleData?.denpyono || null,
          denpyodt: scheduleData?.denpyodt
            ? moment(scheduleData?.denpyodt).format("DD-MM-YYYY")
            : null,
          bumoncd_ykanr: scheduleData?.bumoncd_ykanr,
          shiharaidt: scheduleData?.shiharaidt
            ? dayjs(scheduleData?.shiharaidt)
            : null,
          uketukedt: scheduleData?.uketukedt
            ? dayjs(scheduleData?.uketukedt)
            : null,
          kaikeind: scheduleData?.kaikeind
            ? dayjs(scheduleData?.kaikeind)
            : null,
        });
        handleOnChangeRoomId(scheduleData?.bumoncd_ykanr);
      }
    };
    if (id) {
      setIsEditMode(true);
      scheduleStore
        .searchScheduleList({ denpyono: id })
        .then((res) => {
          if (res?.length) {
            setTripData(hanleTempRecord(res[0]?.trips) || []);
            handleSheduleTemp(res[0] || {});
          }
        })
        .catch((err) => {
          console.log(err);
          message.error("something went wrong");
        });
    } else {
      setTripData(hanleTempRecord([]));
      handleSheduleTemp({});
    }
  }, []);

  useEffect(() => {
    if (tripData?.length) {
      let sum = tripData.reduce(
        (accumulator, currentValue) =>
          accumulator +
          (!currentValue?.isDelete ? Number(currentValue?.kingaku) : 0 || 0),
        0
      );
      setsumMoney(sum);
    }
  }, [tripData]);

  useEffect(() => {
    if (!isObjEmpty(scheduleStore.selectedRoom)) {
      let { bumoncd, bumonnm } = scheduleStore.selectedRoom;
      form.setFieldsValue({
        bumoncd_ykanr: bumoncd,
        bumonnm,
      });
    }
  }, [scheduleStore.selectedRoom]);

  const columns = [
    {
      title: "交通費",
      children: [
        {
          title: "行",
          dataIndex: "index",
          width: "3%",
          key: "index",
          render: (_, record, index) => <a>{index + 1}</a>,
          align: "center",
        },
        {
          title: "年月日",
          dataIndex: "idodt",
          key: "idodt",
          width: "8%",
          align: "center",
          render: (record) => (
            <span>{moment(record).zone("+0700").format("DD-MM-YYYY")}</span>
          ),
        },
        {
          title: "出発地",
          dataIndex: "shuppatsuplc",
          key: "shuppatsuplc",
          width: "10%",
          align: "center",
          ellipsis: true,
        },
        {
          title: "目的地",
          dataIndex: "mokutekiplc",
          key: "mokutekiplc",
          width: "10%",
          align: "center",
          ellipsis: true,
        },
        {
          title: "経路",
          dataIndex: "keiro",
          key: "keiro",
          width: "20%",
          align: "center",
          ellipsis: true,
        },
        {
          title: "金額",
          dataIndex: "kingaku",
          className: "sum-column",
          key: "kingaku",
          width: "5%",
          align: "center",
        },
      ],
    },
  ];
  const handleClearTemp = () => {
    localStorage.removeItem("tripData");
    localStorage.removeItem("scheduleData");
    scheduleStore.setSelectedTrip({});
    setTripData([]);
  };

  const onSubmit = () => {
    form.validateFields().then((response) => {
      if (isEditMode) {
        scheduleStore
          .updateSchedule(id, {
            ...response,
            trips: tripData,
            total: sumMoney,
            kaikeind: response.kaikeind
              ? new Date(response.kaikeind).getFullYear()
              : null,
          })
          .then((res) => {
            setIsOpenEndModal({ open: true, mode: 1 });
            setResMessage(res);
          })
          .catch((err) => message.error("Fail to update!"));
      } else
        scheduleStore
          .createSchedule({
            ...response,
            trips: tripData,
            total: sumMoney,
            kaikeind: response.kaikeind
              ? new Date(response.kaikeind).getFullYear()
              : null,
          })
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
    scheduleStore.searchRoom({ bumoncd: value }).then((res) => {
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

  const handleSaveTempRecord = () => {
    let data = form.getFieldsValue([
      "suitokb",
      "shiharaidt",
      "kaikeind",
      "uketukedt",
      "bumoncd_ykanr",
      "biko",
    ]);
    let scheduleData = JSON.parse(localStorage.getItem("scheduleData"));
    if (scheduleData) {
      localStorage.setItem(
        "scheduleData",
        JSON.stringify({ ...scheduleData, ...data })
      );
    } else {
      localStorage.setItem("scheduleData", JSON.stringify(data));
    }
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
                onClick={() => {
                  handleClearTemp();
                  navigate("/");
                }}
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
                      options={scheduleStore.payMethodOption?.map((el) => ({
                        value: el,
                      }))}
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
                      clearIcon={<PickIcon icon={<CloseCircleOutlined />} />}
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
            <DatePicker
              style={{
                width: 150,
              }}
              picker="year"
              suffixIcon={<DownOutlined />}
            />
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
              clearIcon={<PickIcon icon={<CloseCircleOutlined />} />}
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
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    function later(delay) {
                      return new Promise(function (resolve, reject) {
                        setTimeout(() => {
                          if (value && !getFieldValue("bumonnm")) {
                            return reject("起票部門 does not exist!");
                          } else {
                            return resolve();
                          }
                        }, delay);
                      });
                    }
                    return later(200)
                      .then((res) => Promise.resolve())
                      .catch((err) => Promise.reject(err));
                  },
                }),
              ]}
            >
              <InputNumber
                style={{
                  width: 100,
                }}
                min={0}
                onChange={(value) => handleOnChangeRoomId(value)}
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
              onClick={() => scheduleStore.setIsShowRoomModal(true)}
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
                onClick={() => {
                  handleSaveTempRecord();
                  navigate(`/detail-schedule`);
                }}
              >
                明細追加
              </Button>
            </Col>
          </Row>
        </CustomForm>
      </div>
      <CustomTable
        rowClassName={(record) => (record?.isDelete ? "table-row-dark" : "")}
        recordKey={"gyono"}
        sum={sumMoney}
        dataSource={tripData}
        columns={columns}
        styles={"lg:pr-9 lg:pl-14 xl:pl-28 mt-4"}
        sumable={{ open: true, style: "lg:pr-9" }}
        onDoubleClick={(record) => {
          return {
            onDoubleClick: () => {
              scheduleStore.setSelectedTrip(record);
              handleSaveTempRecord();
              navigate(`/detail-schedule/${record?.gyono}`);
            },
          };
        }}
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
              onClick={() => {
                handleClearTemp();
                navigate("/");
              }}
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
