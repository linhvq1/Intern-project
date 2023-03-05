import { Table, Checkbox, Input } from "antd";
import { useState, useEffect } from "react";
import styled from 'styled-components'

const StyledTable = styled(Table)`
  .ant-table-thead > tr > th{
    border-bottom: 1px solid black;
    background: #bbaeae;
  }
  .ant-table-thead > tr > th:first-child{
    border-left: 1px solid black !important;
  }
  .ant-table-row td:first-child{
    border-left: 1px solid black !important;
  }
  .ant-table-container{
    border: 1px solid black;
  }
  .ant-table-cell-scrollbar{
    background: #bbaeae !important;
  }
`

const columns = [
  {
    title: "行",
    dataIndex: "index",
    width: "5%",
    key: "index",
    render: (text) => <a>{text}</a>,
    align: 'center'
  },
  {
    title: "伝票番号",
    dataIndex: "spliNum",
    key: "spliNum",
    width: "8%",
    align: 'center'
  },
  {
    title: "起票部門",
    dataIndex: "ticket",
    key: "ticket",
    width: "10%",
    align: 'center'
  },
  {
    title: "伝票日付",
    dataIndex: "splitDate",
    key: "splitDate",
    width: "10%",
    align: 'center'
  },
  {
    title: "申請日",
    dataIndex: "filingDate",
    key: "filingDate",
    width: "10%",
    align: 'center'
  },
  {
    title: "出納方法",
    dataIndex: "casherMethod",
    key: "casherMethod",
    width: "10%",
    align: 'center'
  },
  {
    title: "出張目的",
    dataIndex: "trip",
    key: "trip",
    width: "30%",
    align: 'center'
  },
  {
    title: "金額",
    dataIndex: "money",
    key: "money",
    width: "10%",
    align: 'center'
  },
  {
    title: "行選択",
    dataIndex: "lineSelection",
    key: "lineSelection",
    render: () => <Checkbox />,
    width: "10%",
    align: 'center'
  },
];
const data = [
  {
    index: "1",
    spliNum: "3",
    ticket: "234",
    splitDate: "2023-07-09",
    filingDate: "2023-07-09",
    casherMethod: "Online",
    trip: "nice",
    money: "100",
    lineSelection: "",
  },
  {
    index: "2",
    spliNum: "3",
    ticket: "234",
    splitDate: "2023-07-09",
    filingDate: "2023-07-09",
    casherMethod: "Offline",
    trip: "nice",
    money: "0",
    lineSelection: "",
  },
  {
    index: "3",
    spliNum: "3",
    ticket: "234",
    splitDate: "2023-07-09",
    filingDate: "2023-07-09",
    casherMethod: "Online",
    trip: "nice",
    money: "0",
    lineSelection: "",
  },
  {
    index: "3",
    spliNum: "3",
    ticket: "234",
    splitDate: "2023-07-09",
    filingDate: "2023-07-09",
    casherMethod: "Online",
    trip: "nice",
    money: "0",
    lineSelection: "",
  },
  {
    index: "3",
    spliNum: "3",
    ticket: "234",
    splitDate: "2023-07-09",
    filingDate: "2023-07-09",
    casherMethod: "Online",
    trip: "nice",
    money: "0",
    lineSelection: "",
  },
  {
    index: "3",
    spliNum: "3",
    ticket: "234",
    splitDate: "2023-07-09",
    filingDate: "2023-07-09",
    casherMethod: "Online",
    trip: "nice",
    money: "0",
    lineSelection: "",
  },
  {
    index: "3",
    spliNum: "3",
    ticket: "234",
    splitDate: "2023-07-09",
    filingDate: "2023-07-09",
    casherMethod: "Online",
    trip: "nice",
    money: "0",
    lineSelection: "",
  },
];

const CustomTable = () => {
  
  return (
    <>
      <StyledTable className="lg:pr-9 lg:pl-14 xl:pl-28 mt-4" columns={columns} bordered dataSource={data} pagination={false} 
        scroll={{y: 240}}
      />
      <div className="flex gap-2 items-center justify-end pr-44 mt-4">
        <span className="font-bold">交通費計</span>
        <Input defaultValue={30} readOnly
          className="w-[10%] border border-gray-900" 
          />
      </div>
    </>
  );
};
export default CustomTable;
