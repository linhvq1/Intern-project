import React, { useEffect } from "react";
import HeaderTitle from "../../components/HeaderTitle";
import { inject, observer } from "mobx-react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Row,
  Col,
  Checkbox,
} from "antd";
import PickIcon from "../../components/PickIcon";
import CustomTable from "../../components/CustomTable";
import { Link, useNavigate, useParams } from "react-router-dom";

function ScheduleList({ userStore }) {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    userStore.getUser().then((res) => {
      console.log("res", res);
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
      dataIndex: "bumonnm",
      key: "bumonnm",
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

  const onSubmit = () => {
    form.validateFields().then((response) => {
      console.log("response", response);
    });
  };
  return (
    <div className="p-3 pb-14 h-full overflow-y-auto">
      <HeaderTitle text={"予定伝票一覧"} />
      <div>
        <Form
          form={form}
          name="schedule"
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
          <Form.Item label="年度" name="years">
            <Select
              style={{
                width: 120,
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
          <Form.Item label="伝票番号">
            <Form.Item name={"s_range"} className="mb-0">
              <Input
                style={{
                  width: 120,
                }}
              />
            </Form.Item>
            <span className="px-2">-</span>
            <Form.Item name={"e_range"} className="mb-0">
              <Input
                style={{
                  width: 120,
                }}
              />
            </Form.Item>
          </Form.Item>
          <Form.Item label="伝票日付">
            <Form.Item name={"s_rangeDay"} className="mb-0">
              <DatePicker
                style={{
                  width: 120,
                }}
              />
            </Form.Item>
            <span className="px-2">-</span>
            <Form.Item name={"e_rangeDay"} className="mb-0">
              <DatePicker
                style={{
                  width: 120,
                }}
              />
            </Form.Item>
          </Form.Item>
          <Form.Item label="申請日">
            <Form.Item name={"s_registerDay"} className="mb-0">
              <DatePicker
                style={{
                  width: 120,
                }}
                suffixIcon={<PickIcon />}
              />
            </Form.Item>
            <span className="px-2">-</span>
            <Form.Item name={"e_registerDay"} className="mb-0">
              <DatePicker
                style={{
                  width: 120,
                }}
                suffixIcon={<PickIcon />}
              />
            </Form.Item>
          </Form.Item>
          <Form.Item label="出納方法">
            <Form.Item name={"payMethod_1"} className="mb-0">
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
            <Form.Item name={"payMethod_2"} className="mb-0">
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
        dataSource={userStore.users}
        styles={"lg:pr-9 lg:pl-14 xl:pl-28 mt-4"}
        sumable={true}
        onRow={(record, rowIndex) => {
          return {
            onClick: (evt) => {
              console.log("record", evt);
            },
          };
        }}
      />
    </div>
  );
}

export default inject("userStore")(observer(ScheduleList));
