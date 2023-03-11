import React, { useEffect, useState } from "react";
import HeaderTitle from "../../components/HeaderTitle";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Modal,
  InputNumber,
} from "antd";
import PickIcon from "../../components/PickIcon";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { CloseCircleOutlined } from "@ant-design/icons";
import { inject, observer } from "mobx-react";
import moment from "moment";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";

const CustomCheckbox = styled(Checkbox)`
  .ant-checkbox-inner {
    width: 25px;
    height: 25px;

    &::after {
      width: 10px;
      height: 14px;
    }
  }
  .ant-radio,
  .ant-checkbox {
    font-size: 25px;
  }
`;

function TripDetail({ scheduleStore }) {
  const [form] = Form.useForm();
  const { parentId } = useParams();
  const navigate = useNavigate();
  const [openModalDelete, setOpenModalDelete] = useState(false);

  useEffect(() => {
    if (parentId) {
      let tripList = JSON.parse(localStorage.getItem("tripData"));
      if (tripList && tripList?.length) {
        let tripRecord = tripList.find(
          (trip) => trip?.gyono.toString() === parentId.toString()
        );
        if (tripRecord)
          form.setFieldsValue({
            ...tripRecord,
            idodt: dayjs(tripRecord?.idodt),
          });
      }
    }
  }, []);

  const onSubmit = () => {
    form.validateFields().then((values) => {
      if (parentId) {
        values = { ...values, gyono: scheduleStore.selectedTrip?.gyono };
        if (values.isDelete) {
          setOpenModalDelete(true);
        }
      } else {
        values = { ...values, gyono: uuidv4() };
      }
      scheduleStore.setSelectedTrip(values);
      if (!values?.isDelete) navigate(-1);
    });
  };

  return (
    <div className="p-3 pb-14 h-full overflow-y-auto">
      <HeaderTitle text={"予定伝票入力"} />
      <Form
        name="detailSchedule"
        form={form}
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
        <Form.Item
          label="年月日"
          name={"idodt"}
          rules={[
            {
              required: true,
              message: "Please input 年月日!",
            },
          ]}
        >
          <DatePicker
            style={{
              width: 150,
            }}
            format={"DD-MM-YYYY"}
            inputReadOnly
            suffixIcon={<PickIcon />}
            clearIcon={<PickIcon icon={<CloseCircleOutlined />} />}
          />
        </Form.Item>
        <Form.Item
          label="出発地"
          name={"shuppatsuplc"}
          rules={[
            {
              required: true,
              message: "Please input 出発地!",
            },
          ]}
        >
          <Input
            style={{
              width: 150,
            }}
          />
        </Form.Item>
        <Form.Item
          label="目的地"
          name={"mokutekiplc"}
          rules={[
            {
              required: true,
              message: "Please input 目的地!",
            },
          ]}
        >
          <Input
            style={{
              width: 150,
            }}
          />
        </Form.Item>
        <Form.Item
          label="経路"
          name={"keiro"}
          rules={[
            {
              required: true,
              message: "Please input 経路!",
            },
          ]}
        >
          <Input
            style={{
              width: 180,
            }}
          />
        </Form.Item>
        <Form.Item
          label="金額"
          name={"kingaku"}
          rules={[
            {
              required: true,
              message: "Please input 金額!",
            },
          ]}
        >
          <InputNumber
            min={0}
            style={{
              width: 150,
            }}
          />
        </Form.Item>
        <Form.Item label="金額" name="isDelete" valuePropName="checked">
          <CustomCheckbox disabled={!parentId && true} />
        </Form.Item>
      </Form>
      <div className="flex w-[100%] gap-3 mt-4 pl-10 justify-end pr-10">
        <Button
          className="bg-gray-500 text-white px-5"
          htmlType="submit"
          onClick={() => onSubmit()}
        >
          選択
        </Button>
        <Button
          className="bg-gray-500 text-white px-5"
          onClick={() => {
            navigate(-1);
            scheduleStore.setSelectedTrip({});
          }}
        >
          戻る
        </Button>
      </div>
      <Modal closable={false} open={openModalDelete} footer={false}>
        <div className="flex flex-col items-center justify-center">
          <span className="text-xl font-bold">
            Are you sure to delete this record?
          </span>
          <div className="flex items-center justify-center gap-7 mt-4">
            <Button
              className="px-5 bg-gray-500 text-white"
              onClick={() => {
                setOpenModalDelete(false);
                navigate(-1);
              }}
            >
              Ok
            </Button>
            <Button
              className="px-5 bg-gray-500 text-white"
              onClick={() => {
                setOpenModalDelete(false);
                form.setFieldsValue({ isDelete: false });
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default inject("scheduleStore")(observer(TripDetail));
