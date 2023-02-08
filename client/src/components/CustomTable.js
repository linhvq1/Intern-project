import { Table, Checkbox } from "antd";
import { useState } from "react";
const columns = [
  {
    title: "行",
    dataIndex: "index",
    key: "index",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "伝票番号",
    dataIndex: "spliNum",
    key: "spliNum",
  },
  {
    title: "起票部門",
    dataIndex: "ticket",
    key: "ticket",
  },
  {
    title: "伝票日付",
    dataIndex: "splitDate",
    key: "splitDate",
  },
  {
    title: "申請日",
    dataIndex: "filingDate",
    key: "filingDate",
  },
  {
    title: "出納方法",
    dataIndex: "casherMethod",
    key: "casherMethod",
  },
  {
    title: "出張目的",
    dataIndex: "trip",
    key: "trip",
  },
  {
    title: "金額",
    dataIndex: "money",
    key: "money",
  },
  {
    title: "行選択",
    dataIndex: "lineSelection",
    key: "lineSelection",
    render: () => <Checkbox />,
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
];

const CustomTable = () => {
  return (
    <Table className="px-9 mt-4" columns={columns} bordered dataSource={data} />
  );
};
export default CustomTable;
