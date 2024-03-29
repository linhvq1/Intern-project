import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Col, Row, Radio, message } from "antd";
import CustomTable from "../../components/CustomTable";
import { inject, observer } from "mobx-react";

function RoomModal({ scheduleStore }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState();
  const [originSelectedRoom, setOriginSelectedRoom] = useState();
  const [form] = Form.useForm();

  useEffect(() => {
    scheduleStore.getZooms().catch((err) => console.log());
    setOriginSelectedRoom(scheduleStore.selectedRoom);
    return () => {
      setSelectedRowKeys();
    };
  }, [scheduleStore.isShowRoomModal]);

  const columns = [
    {
      title: "部門コード",
      dataIndex: "bumoncd",
      width: "35%",
      key: "bumoncd",
      render: (text) => <a>{text}</a>,
      align: "center",
    },
    {
      title: "部門名",
      dataIndex: "bumonnm",
      width: "55%",
      key: "bumonnm",
      render: (text) => <a>{text}</a>,
      align: "center",
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys);
      if (selectedRowKeys) scheduleStore.setSelectedRoom(selectedRows[0]);
    },
  };

  const onSubmitForm = () => {
    form.validateFields().then((values) => {
      scheduleStore.searchRoom(values).catch((err) => console.log());
    });
  };

  return (
    <Modal
      closable={false}
      open={scheduleStore.isShowRoomModal}
      width={900}
      footer={false}
    >
      <Form
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
        <Form.Item label="部門コード" name="bumoncd">
          <Input
            style={{
              width: 150,
            }}
          />
        </Form.Item>
        <Form.Item label="部門名" name="bumonnm">
          <Input
            style={{
              width: 150,
            }}
          />
        </Form.Item>
        <Row>
          <Col span={4}></Col>
          <Col span={20}>
            <Button
              className="bg-gray-500 text-white"
              onClick={() => onSubmitForm()}
            >
              検索
            </Button>
          </Col>
        </Row>
      </Form>
      <CustomTable
        columns={columns}
        styles={"mt-4"}
        sumable={false}
        dataSource={scheduleStore.zooms}
        recordKey={"bumoncd"}
        rowSelection={{
          type: "radio",
          ...rowSelection,
        }}
      />
      <div className="flex gap-3 mt-4 pl-10">
        <Button
          className="bg-gray-500 text-white px-5"
          onClick={() => {
            if (selectedRowKeys) {
              scheduleStore.setIsShowRoomModal(false);
              form.resetFields();
            } else message.error("You have to select a room!");
          }}
        >
          選択
        </Button>
        <Button
          className="bg-gray-500 text-white px-5"
          onClick={() => {
            scheduleStore.setIsShowRoomModal(false);
            scheduleStore.setSelectedRoom(originSelectedRoom);
            form.resetFields();
          }}
        >
          戻る
        </Button>
      </div>
    </Modal>
  );
}

export default inject("scheduleStore")(observer(RoomModal));
