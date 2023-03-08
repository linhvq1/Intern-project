import React, { useEffect } from "react";
import HeaderTitle from "../../components/HeaderTitle";
import { inject, observer } from "mobx-react";
import moment from "moment";
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
import PickIcon from "../../components/PickIcon";
import CustomTable from "../../components/CustomTable";
import { Link, useNavigate, useParams } from "react-router-dom";

function ScheduleList({ scheduleStore }) {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    scheduleStore.getScheduleList().then((res) => {
      // console.log("res", res);
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
    },
    {
      title: "申請日",
      dataIndex: "uketukedt",
      key: "uketukedt",
      width: "10%",
      align: "center",
    },
    {
      title: "出納方法",
      dataIndex: "suitokb",
      key: "suitokb",
      width: "10%",
      align: "center",
    },
    {
      title: "出張目的",
      dataIndex: "biko",
      key: "biko",
      width: "30%",
      align: "center",
    },
    {
      title: "金額",
      dataIndex: "kingaku",
      key: "kingaku",
      width: "10%",
      align: "center",
    },
    {
      title: "行選択",
      dataIndex: "lineSelection",
      key: "lineSelection",
      render: () => <Checkbox />,
      width: "10%",
      align: "center",
    },
  ];
  const formatDate = (date) => {
    return date.format("YYYY-MM-DD HH:mm:ss");
  };

  const onSubmit = () => {
    form.validateFields().then((response) => {
      console.log(response);
      scheduleStore
        .searchScheduleList(response)
        .then(() => message.success("Done!"))
        .catch((err) => message.error("something went wrong"));
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
            <Select
              allowClear
              style={{
                width: 120,
              }}
              options={[
                {
                  value: "2023",
                },
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
          <Form.Item label="伝票番号">
            <Form.Item
              name={"denpyono_start"}
              className="mb-0"
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    const isInteger = /^[0-9]+$/;
                    if (
                      (!value ||
                        !getFieldValue("denpyono_end") ||
                        value < getFieldValue("denpyono_end")) &&
                      isInteger.test(`${value}`)
                    ) {
                      console.log("1");
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
                  width: 120,
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
                    console.log("value", value);
                    console.log("value", typeof value);
                    if (
                      (!value ||
                        !getFieldValue("denpyono_start") ||
                        value > getFieldValue("denpyono_start")) &&
                      isInteger.test(`${value}`)
                    ) {
                      console.log("2");
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
                  width: 120,
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
                    if (
                      !value ||
                      !getFieldValue("denpyodt_end") ||
                      moment(formatDate(value)).isBefore(
                        formatDate(getFieldValue("denpyodt_end"))
                      )
                    ) {
                      console.log("3");
                      return Promise.resolve();
                    }
                    if (
                      !moment(formatDate(value)).isBefore(
                        formatDate(getFieldValue("denpyodt_end"))
                      )
                    )
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
                inputReadOnly
                style={{
                  width: 120,
                }}
              />
            </Form.Item>
            <span className="px-2">-</span>
            <Form.Item
              name={"denpyodt_end"}
              className="mb-0"
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (
                      !value ||
                      !getFieldValue("denpyodt_start") ||
                      moment(formatDate(value)).isAfter(
                        formatDate(getFieldValue("denpyodt_start"))
                      )
                    ) {
                      console.log("4");
                      return Promise.resolve();
                    }
                    if (
                      !moment(formatDate(value)).isAfter(
                        formatDate(getFieldValue("denpyodt_start"))
                      )
                    )
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
                inputReadOnly
                style={{
                  width: 120,
                }}
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
                    if (
                      !value ||
                      !getFieldValue("uketukedt_end") ||
                      moment(formatDate(value)).isBefore(
                        formatDate(getFieldValue("uketukedt_end"))
                      )
                    ) {
                      console.log("5");
                      return Promise.resolve();
                    }
                    if (
                      !moment(formatDate(value)).isBefore(
                        formatDate(getFieldValue("uketukedt_end"))
                      )
                    )
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
                inputReadOnly
                style={{
                  width: 120,
                }}
                suffixIcon={<PickIcon />}
              />
            </Form.Item>
            <span className="px-2">-</span>
            <Form.Item
              name={"uketukedt_end"}
              className="mb-0"
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (
                      !value ||
                      !getFieldValue("uketukedt_start") ||
                      moment(formatDate(value)).isAfter(
                        formatDate(getFieldValue("uketukedt_start"))
                      )
                    ) {
                      console.log("6");
                      return Promise.resolve();
                    }
                    if (
                      !moment(formatDate(value)).isAfter(
                        formatDate(getFieldValue("uketukedt_start"))
                      )
                    )
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
                inputReadOnly
                style={{
                  width: 120,
                }}
                suffixIcon={<PickIcon />}
              />
            </Form.Item>
          </Form.Item>
          <Form.Item label="出納方法">
            <Form.Item name={"suitokb_1"} className="mb-0">
              <Select
                style={{
                  width: 120,
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
            <span className="px-2">-</span>
            <Form.Item name={"suitokb_2"} className="mb-0">
              <Select
                style={{
                  width: 120,
                }}
                options={[
                  {
                    value: "ATM",
                  },
                  {
                    value: "Cash",
                  },
                ]}
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
        sumable={true}
        onRow={(record) => {
          return {
            onClick: () => {
              console.log(record);
            },
          };
        }}
      />
    </div>
  );
}

export default inject("scheduleStore")(observer(ScheduleList));
