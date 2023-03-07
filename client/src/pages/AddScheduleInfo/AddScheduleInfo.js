import React, { useEffect } from "react";
import HeaderTitle from "../../components/HeaderTitle";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Row,
  Col,
  Checkbox
} from "antd";
import PickIcon from "../../components/PickIcon";
import CustomTable from "../../components/CustomTable";
import { useNavigate } from "react-router-dom";
import { CustomForm } from "./style";
import RoomModal from "./RoomModal";
import { inject, observer } from "mobx-react";
import { toJS, values } from "mobx";

function AddScheduleInfo({ commonStore }) {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if(commonStore.selectedRoom){
      let {bumoncd, bumonnm} = commonStore.selectedRoom
      form.setFieldsValue({
        bumoncd, bumonnm
      })
    }
  }, [commonStore.selectedRoom])
  

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
      console.log("response", response);
    });
  };

  const handleOnChangeRoomId = (value) =>{
    if(!value) {
      form.setFieldsValue({bumonnm: ''})
      return
    }
    commonStore.searchRoom({bumoncd: value}).then(res =>{ 
        if(res?.length > 0) {
          let {bumoncd, bumonnm} = res[0]
          form.setFieldsValue({
            bumonnm
          })
        }else form.setFieldsValue({bumonnm: ''})
      }
    )
  }

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
            <Form.Item name={"slide_number"} className="mb-0">
              <Input
                style={{
                  width: 150,
                }}
                disabled
              />
            </Form.Item>
            <div className="flex gap-3 text-white ml-auto lg:pr-10">
              <Button htmlType="submit" className="bg-gray-500 text-white">登録</Button>
              <Button className="bg-gray-200">削除</Button>
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
                <Form.Item name={"slide_date"} className="mb-0">
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
                    name={"payMethod"}
                    className="mb-0"
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
                    name={"expired_date"}
                    className="mb-0"
                  >
                    <DatePicker
                      style={{
                        width: 150,
                      }}
                      suffixIcon={<PickIcon />}
                    />
                  </Form.Item>
                </div>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label="年度" name="years">
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
          <Form.Item label="申請日" name={"register_date"}>
            <DatePicker
              style={{
                width: 150,
              }}
              suffixIcon={<PickIcon />}
            />
          </Form.Item>
          <Form.Item label="起票部門">
            <Form.Item name="bumoncd" className="mb-0 mr-3">
              <Input
                style={{
                  width: 100,
                }}
                onChange={(e)=>handleOnChangeRoomId(e.target.value)}
                
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
            name={"trip_purpose"}
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
    </div>
  );
}

export default inject("commonStore")(observer(AddScheduleInfo));
