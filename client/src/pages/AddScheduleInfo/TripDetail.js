import React from 'react'
import HeaderTitle from '../../components/HeaderTitle'
import { Button, Checkbox, DatePicker, Form, Input } from 'antd'
import PickIcon from '../../components/PickIcon'
import styled from 'styled-components'
import { useNavigate, useParams } from "react-router-dom";
import {CloseCircleOutlined} from '@ant-design/icons'

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
`

function TripDetail() {
    const { parentId } = useParams();
    const navigate = useNavigate()

    console.log('parent_id', parentId);
  return (
    <div className="p-3 pb-14 h-full overflow-y-auto">
        <HeaderTitle text={"予定伝票入力"} />
        <Form
            name="detail_schedule"
            //onFinish={() =>onSubmit()}
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
            <Form.Item label='年月日' name={"date"}
              rules={[
                {
                  required: true,
                  message: 'Please input 年月日!',
                },
              ]}
            >
                <DatePicker
                    style={{
                    width: 150,
                    }}
                    inputReadOnly
                    suffixIcon={<PickIcon />}
                    clearIcon={<PickIcon icon={<CloseCircleOutlined />}/>}
                />
            </Form.Item>
            <Form.Item label='出発地' name={"start"}
              rules={[
                {
                  required: true,
                  message: 'Please input 出発地!',
                },
              ]}
            >
              <Input
                  style={{
                    width: 150,
                  }}
                />
            </Form.Item>
            <Form.Item label='目的地' name={"end"}
              rules={[
                {
                  required: true,
                  message: 'Please input 目的地!',
                },
              ]}
            >
              <Input
                  style={{
                    width: 150,
                  }}
                />
            </Form.Item>
            <Form.Item label='経路' name={"road"}
              rules={[
                {
                  required: true,
                  message: 'Please input 経路!',
                },
              ]}
            >
              <Input
                  style={{
                    width: 180,
                  }}
                />
            </Form.Item>
            <Form.Item label='金額' name={"fee"}
              rules={[
                {
                  required: true,
                  message: 'Please input 金額!',
                },
              ]}
            >
              <Input
                  style={{
                    width: 150,
                  }}
                />
            </Form.Item>
            <Form.Item label='金額' name={"fee"}>
              <CustomCheckbox />
            </Form.Item>
        </Form>
        <div className='flex w-[100%] gap-3 mt-4 pl-10 justify-end pr-10'>
            <Button className='bg-gray-500 text-white px-5'>選択</Button>
            <Button className='bg-gray-500 text-white px-5'
                onClick={() => navigate(-1)}
            >戻る</Button>
        </div>
    </div>
  )
}

export default TripDetail