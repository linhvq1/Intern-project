import React, { useEffect, useState } from "react";
import HeaderTitle from "../../components/HeaderTitle";
import { inject, observer } from "mobx-react";
import moment from "moment";
import vi from "antd/lib/date-picker/locale/vi_VN";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Row,
  Col,
  Checkbox,
  InputNumber,
  message,
} from "antd";
import { CloseCircleOutlined, DownOutlined } from "@ant-design/icons";
import PickIcon from "../../components/PickIcon";
import CustomTable from "../../components/CustomTable";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toJS } from "mobx";
import dayjs from "dayjs";

function ScheduleList({ scheduleStore, commonStore }) {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [sumMoney, setsumMoney] = useState(0);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    if (scheduleStore.schedules?.length) {
      let sum = scheduleStore.schedules.reduce(
        (accumulator, currentValue) =>
          accumulator + (currentValue?.kingaku || 0),
        0
      );
      setsumMoney(sum);
    }
  }, [scheduleStore.schedules]);

  useEffect(() => {
    localStorage.removeItem("tripData");
    localStorage.removeItem("scheduleData");
    setloading(true);
    scheduleStore
      .getScheduleList()
      .then((res) => {
        setloading(false);
      })
      .catch((err) => {
        setloading(false);
        message.error("Fail to load data");
      });
  }, []);

  const columns = [
    {
      title: "行",
      dataIndex: "index",
      width: "5%",
      key: "index",
      render: (_, record, index) => <a>{index + 1}</a>,
      align: "center",
    },
    {
      title: "伝票番号",
      dataIndex: "denpyono",
      key: "denpyono",
      width: "8%",
      align: "center",
    },
    {
      title: "起票部門",
      dataIndex: "bumoncd_ykanr",
      key: "bumoncd_ykanr",
      width: "10%",
      align: "center",
    },
    {
      title: "伝票日付",
      dataIndex: "denpyodt",
      key: "denpyodt",
      width: "10%",
      align: "center",
      render: (record) => (
        <span>{moment(record).zone("+0700").format("DD-MM-YYYY")}</span>
      ),
    },
    {
      title: "申請日",
      dataIndex: "uketukedt",
      key: "uketukedt",
      width: "10%",
      align: "center",
      render: (record) => (
        <span>{moment(record).zone("+0700").format("DD-MM-YYYY")}</span>
      ),
    },
    {
      title: "出納方法",
      dataIndex: "suitokb",
      key: "suitokb",
      width: "10%",
      align: "center",
    },
    {
      title: "出張目的(備考)",
      dataIndex: "biko",
      key: "biko",
      width: "30%",
      align: "center",
      ellipsis: true,
    },
    {
      title: "金額",
      dataIndex: "kingaku",
      className: "sum-column",
      key: "kingaku",
      width: "10%",
      align: "center",
    },
    {
      title: "行選択",
      dataIndex: "lineSelection",
      key: "lineSelection",
      render: () => <Checkbox />,
      width: "7%",
      align: "center",
    },
  ];
  const formatDate = (date) => {
    return date?.format("DD-MM-YYYY");
  };

  const onSubmit = () => {
    form.validateFields().then((response) => {
      setloading(true);
      scheduleStore
        .searchScheduleList(response)
        .then(() => {
          setloading(false);
          message.success("Done!");
        })
        .catch((err) => {
          setloading(false);
          message.error("something went wrong");
        });
    });
  };
  return (
    <div className="p-3 pb-14 h-full overflow-y-auto">
      <HeaderTitle text={"予定伝票一覧"} />
      <div>
        <Form
          form={form}
          name="schedule"
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
          <Form.Item label="年度" name="kaikeind">
            <DatePicker
              suffixIcon={<DownOutlined />}
              style={{
                width: 150,
              }}
              picker="year"
            />
          </Form.Item>
          <Form.Item label="伝票番号">
            <Form.Item
              name={"denpyono_start"}
              className="mb-0"
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    const isInteger = /^[0-9]+$/;
                    if (!value && getFieldValue("denpyono_end"))
                      return Promise.reject(new Error("Please input ID"));
                    if (!value && !getFieldValue("denpyono_end"))
                      form.setFields([
                        {
                          name: "denpyono_end",
                          errors: [],
                        },
                      ]);
                    if (
                      !value ||
                      !getFieldValue("denpyono_end") ||
                      (value < getFieldValue("denpyono_end") &&
                        isInteger.test(`${value}`))
                    ) {
                      form.setFields([
                        {
                          name: "denpyono_end",
                          errors: [],
                        },
                      ]);
                      return Promise.resolve();
                    }

                    if (!isInteger.test(`${value}`) && value)
                      return Promise.reject(new Error("It's not an ID"));
                    if (value >= getFieldValue("denpyono_end") && value)
                      return Promise.reject(
                        new Error("The first ID is not larger than second ID")
                      );
                  },
                }),
              ]}
            >
              <InputNumber
                min={1}
                style={{
                  width: 170,
                }}
              />
            </Form.Item>
            <span className="px-2">-</span>
            <Form.Item
              name={"denpyono_end"}
              className="mb-0"
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    const isInteger = /^[0-9]+$/;
                    if (!value && getFieldValue("denpyono_start"))
                      return Promise.reject(new Error("Please input ID"));
                    if (!value && !getFieldValue("denpyono_start"))
                      form.setFields([
                        {
                          name: "denpyono_start",
                          errors: [],
                        },
                      ]);
                    if (
                      !value ||
                      !getFieldValue("denpyono_start") ||
                      (value > getFieldValue("denpyono_start") &&
                        isInteger.test(`${value}`))
                    ) {
                      form.setFields([
                        {
                          name: "denpyono_start",
                          errors: [],
                        },
                      ]);
                      return Promise.resolve();
                    }

                    if (!isInteger.test(`${value}`) && value)
                      return Promise.reject(new Error("It's not an ID"));
                    if (value <= getFieldValue("denpyono_start") && value)
                      return Promise.reject(
                        new Error("The second ID is not lower than first ID")
                      );
                  },
                }),
              ]}
            >
              <InputNumber
                min={1}
                style={{
                  width: 170,
                }}
              />
            </Form.Item>
          </Form.Item>
          <Form.Item label="伝票日付">
            <Form.Item
              name={"denpyodt_start"}
              className="mb-0"
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    const denpyodtEnd = getFieldValue("denpyodt_end");
                    if (!value && denpyodtEnd)
                      return Promise.reject(new Error("Please select date"));
                    if (!value && !denpyodtEnd)
                      form.setFields([
                        {
                          name: "denpyodt_end",
                          errors: [],
                        },
                      ]);
                    if (
                      value &&
                      denpyodtEnd &&
                      formatDate(value) === formatDate(denpyodtEnd)
                    )
                      return Promise.reject(
                        new Error("Dates are not allowed to be the same!")
                      );
                    if (!value || !denpyodtEnd || value < denpyodtEnd) {
                      form.setFields([
                        {
                          name: "denpyodt_end",
                          errors: [],
                        },
                      ]);
                      return Promise.resolve();
                    }
                    if (value >= denpyodtEnd && value)
                      return Promise.reject(
                        new Error(
                          "The previous day must be smaller than the next day!"
                        )
                      );
                  },
                }),
              ]}
            >
              <DatePicker
                format={"DD-MM-YYYY"}
                inputReadOnly
                style={{
                  width: 170,
                }}
                suffixIcon={<PickIcon />}
                clearIcon={<PickIcon icon={<CloseCircleOutlined />} />}
              />
            </Form.Item>
            <span className="px-2">-</span>
            <Form.Item
              name={"denpyodt_end"}
              className="mb-0"
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    const denpyodtStart = getFieldValue("denpyodt_start");

                    if (!value && denpyodtStart)
                      return Promise.reject(new Error("Please select date"));
                    if (!value && !denpyodtStart)
                      form.setFields([
                        {
                          name: "denpyodt_start",
                          errors: [],
                        },
                      ]);
                    if (
                      value &&
                      denpyodtStart &&
                      formatDate(value) === formatDate(denpyodtStart)
                    )
                      return Promise.reject(
                        new Error("Dates are not allowed to be the same!")
                      );
                    if (!value || !denpyodtStart || value > denpyodtStart) {
                      form.setFields([
                        {
                          name: "denpyodt_start",
                          errors: [],
                        },
                      ]);
                      return Promise.resolve();
                    }
                    if (value <= denpyodtStart && value)
                      return Promise.reject(
                        new Error(
                          "The next day must be greater than the day before!"
                        )
                      );
                  },
                }),
              ]}
            >
              <DatePicker
                format={"DD-MM-YYYY"}
                inputReadOnly
                style={{
                  width: 170,
                }}
                suffixIcon={<PickIcon />}
                clearIcon={<PickIcon icon={<CloseCircleOutlined />} />}
              />
            </Form.Item>
          </Form.Item>
          <Form.Item label="申請日">
            <Form.Item
              name={"uketukedt_start"}
              className="mb-0"
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    const uketukedtEnd = getFieldValue("uketukedt_end");
                    if (!value && uketukedtEnd)
                      return Promise.reject(new Error("Please select date"));
                    if (!value && !uketukedtEnd)
                      form.setFields([
                        {
                          name: "uketukedt_end",
                          errors: [],
                        },
                      ]);
                    if (
                      value &&
                      uketukedtEnd &&
                      formatDate(value) === formatDate(uketukedtEnd)
                    )
                      return Promise.reject(
                        new Error("Dates are not allowed to be the same!")
                      );
                    if (!value || !uketukedtEnd || value < uketukedtEnd) {
                      form.setFields([
                        {
                          name: "uketukedt_end",
                          errors: [],
                        },
                      ]);
                      return Promise.resolve();
                    }
                    if (value >= uketukedtEnd && value)
                      return Promise.reject(
                        new Error(
                          "The previous day must be smaller than the next day!"
                        )
                      );
                  },
                }),
              ]}
            >
              <DatePicker
                format={"DD-MM-YYYY"}
                inputReadOnly
                style={{
                  width: 170,
                }}
                suffixIcon={<PickIcon />}
                clearIcon={<PickIcon icon={<CloseCircleOutlined />} />}
              />
            </Form.Item>
            <span className="px-2">-</span>
            <Form.Item
              name={"uketukedt_end"}
              className="mb-0"
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    const uketukedtStart = getFieldValue("uketukedt_start");

                    if (!value && uketukedtStart)
                      return Promise.reject(new Error("Please select date"));
                    if (!value && !uketukedtStart)
                      form.setFields([
                        {
                          name: "uketukedt_start",
                          errors: [],
                        },
                      ]);
                    if (
                      value &&
                      uketukedtStart &&
                      formatDate(value) === formatDate(uketukedtStart)
                    )
                      return Promise.reject(
                        new Error("Dates are not allowed to be the same!")
                      );
                    if (!value || !uketukedtStart || value > uketukedtStart) {
                      form.setFields([
                        {
                          name: "uketukedt_start",
                          errors: [],
                        },
                      ]);
                      return Promise.resolve();
                    }
                    if (value <= uketukedtStart && value)
                      return Promise.reject(
                        new Error(
                          "The next day must be greater than the day before!"
                        )
                      );
                  },
                }),
              ]}
            >
              <DatePicker
                format={"DD-MM-YYYY"}
                inputReadOnly
                style={{
                  width: 170,
                }}
                suffixIcon={<PickIcon />}
                clearIcon={<PickIcon icon={<CloseCircleOutlined />} />}
              />
            </Form.Item>
          </Form.Item>
          <Form.Item label="出納方法">
            <Form.Item name={"suitokb_1"} className="mb-0">
              <Select
                allowClear
                style={{
                  width: 170,
                }}
                options={scheduleStore.payMethodOption?.map((el) => ({
                  value: el,
                }))}
              ></Select>
            </Form.Item>
            <span className="px-2">-</span>
            <Form.Item name={"suitokb_2"} className="mb-0">
              <Select
                allowClear
                style={{
                  width: 170,
                }}
                options={scheduleStore.payMethodOption?.map((el) => ({
                  value: el,
                }))}
              ></Select>
            </Form.Item>
            <Button
              className="bg-gray-500 text-white ml-auto sm:px-10 md:mr-10"
              onClick={() => navigate(`/add-schedule`)}
            >
              登録
            </Button>
          </Form.Item>
          <Row>
            <Col span={4} className="text-end">
              <Button
                className="bg-gray-500 text-white ml-auto sm:px-10"
                htmlType="submit"
                onClick={onSubmit}
              >
                検索
              </Button>
            </Col>
            <Col span={20}></Col>
          </Row>
        </Form>
      </div>
      <CustomTable
        columns={columns}
        dataSource={scheduleStore.schedules}
        styles={"lg:pr-9 lg:pl-14 xl:pl-28 mt-4"}
        sumable={{ open: true, style: "lg:pr-9" }}
        loading={loading}
        sum={sumMoney}
        recordKey={"denpyono"}
        onDoubleClick={(record) => {
          return {
            onDoubleClick: () => {
              navigate(`/add-schedule/${record.denpyono}`);
            },
          };
        }}
      />
    </div>
  );
}

export default inject("scheduleStore", "commonStore")(observer(ScheduleList));
