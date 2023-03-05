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

const CustomTable = ({columns, dataSource}) => {
  
  return (
    <>
      <StyledTable className="lg:pr-9 lg:pl-14 xl:pl-28 mt-4" columns={columns} bordered dataSource={dataSource} pagination={false} 
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
