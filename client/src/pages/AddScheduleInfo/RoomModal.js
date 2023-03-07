import React, { useEffect } from "react";
import { Modal, Form, Input, Button, Col, Row, Radio } from "antd";
import CustomTable from "../../components/CustomTable";
import { inject, observer } from "mobx-react";

// const data = [
//   {
//     room_id: "1234",
//     room_name: "anannka",
//   },
//   {
//     room_id: "1235",
//     room_name: "anannkaca",
//   },
//   {
//     room_id: "1236",
//     room_name: "anannkad",
//   },
// ];

function RoomModal({ commonStore }) {
  useEffect(() => {
    commonStore.getZooms().then((res) => {
      console.log("res", res);
    });
  }, []);
  const columns = [
    {
      title: "選択",
      //dataIndex: "select",
      width: "10%",
      key: "select",
      align: "center",
      render: (record) => <Radio />,
    },
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
  return (
    <Modal
      closable={false}
      open={commonStore.isShowRoomModal}
      width={900}
      footer={false}
    >
      <Form
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
        <Form.Item label="部門コード" name="room_id">
          <Input
            style={{
              width: 150,
            }}
          />
        </Form.Item>
        <Form.Item label="部門名" name="room_name">
          <Input
            style={{
              width: 150,
            }}
          />
        </Form.Item>
        <Row>
          <Col span={4}></Col>
          <Col span={20}>
            <Button className="bg-gray-500 text-white">検索</Button>
          </Col>
        </Row>
      </Form>
      <CustomTable
        columns={columns}
        styles={"mt-4"}
        sumable={false}
        dataSource={commonStore.zooms}
        key={"room_id"}
      />
      <div className="flex gap-3 mt-4 pl-10">
        <Button className="bg-gray-500 text-white px-5">選択</Button>
        <Button
          className="bg-gray-500 text-white px-5"
          onClick={() => commonStore.setIsShowRoomModal(false)}
        >
          戻る
        </Button>
      </div>
    </Modal>
  );
}

export default inject("commonStore")(observer(RoomModal));
