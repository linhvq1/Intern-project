import { Table, Checkbox, Input } from "antd";
import { useState, useEffect } from "react";
import styled from "styled-components";

const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    border-bottom: 1px solid black;
    background: #bbaeae;
  }
  .ant-table-thead > tr > td.ant-table-selection-column {
    background: #bbaeae !important;
    border-bottom: 1px solid black;
    border-left: 1px solid black !important;
  }
  .ant-table-thead > tr > th:first-child {
    border-left: 1px solid black !important;
  }
  .ant-table-row td:first-child {
    border-left: 1px solid black !important;
  }
  .ant-table-container {
    border: 1px solid black;
  }

  .ant-table-placeholder .ant-table-cell {
    border-left: 1px solid black !important;
  }

  .ant-table-cell-scrollbar {
    background: #bbaeae !important;
  }

  .ant-table-body {
    overflow-y: auto !important;
  }

  .table-row-dark {
    background-color: #d9d3d3;
  }
`;

const CustomTable = ({
  rowClassName = false,
  loading = false,
  sum,
  columns,
  dataSource,
  styles,
  sumable,
  recordKey,
  onDoubleClick,
  rowSelection = false,
}) => {
  return (
    <>
      <StyledTable
        rowClassName={rowClassName}
        loading={loading}
        className={styles}
        columns={columns}
        bordered
        dataSource={dataSource}
        pagination={false}
        scroll={{ y: 275 }}
        rowKey={(record) => record[recordKey]}
        rowSelection={rowSelection}
        onRow={onDoubleClick}
      />
      {sumable?.open && (
        <div
          className={`flex gap-2 items-center justify-end mt-4 ${
            sumable?.style || "pr-32"
          }`}
        >
          <span className="font-bold">交通費計</span>
          <Input
            defaultValue={0}
            value={sum}
            readOnly
            className="w-[10%] border border-gray-900"
          />
        </div>
      )}
    </>
  );
};
export default CustomTable;
