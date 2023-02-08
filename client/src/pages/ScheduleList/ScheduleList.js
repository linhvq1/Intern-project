import React from "react";
import HeaderTitle from "../../components/HeaderTitle";
import { Button, DatePicker, Form, Input, Select, Row, Col } from "antd";
import PickIcon from "../../components/PickIcon";
import CustomTable from "../../components/CustomTable";

function ScheduleList() {
  const [form] = Form.useForm();

  const onSubmit = () => {
    form.validateFields().then((response) => {
      console.log("response", response);
    });
  };
  return (
    <div className="p-3">
      <HeaderTitle text={"予定伝票一覧"} />
      <div>
        <Form
          form={form}
          name="schedule"
          onFinish={onSubmit()}
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
            <Button className="bg-gray-500 text-white ml-auto sm:px-10 md:mr-10">
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
      <CustomTable />
    </div>
  );
}

export default ScheduleList;
