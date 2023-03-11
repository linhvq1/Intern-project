import React from "react";
import styled from "styled-components";
const IconWrap = styled.div`
  .anticon-close-circle {
    vertical-align: 0px;
  }
`;

function PickIcon({ icon }) {
  return (
    <IconWrap className="font-semibold bg-gray-400 p-1 rounded text-white">
      {icon || "ガ"}
    </IconWrap>
  );
}

export default PickIcon;
