import React, { ReactNode } from "react";
import { Stack } from "react-bootstrap";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    margin-left: 5px;
  }
`;
const H5 = styled.h5`
  color: gray;
`;

interface IProps {
  title: string;
  subtitle?: string;
  menu?: ReactNode[];
}

const PageHeader: React.FC<IProps> = ({ title, subtitle = "", menu = [] }) => {
  return (
    <div>
      <Wrapper>
        <h1>{title}</h1>
        <Stack direction="horizontal">{menu.map((item) => item)}</Stack>
      </Wrapper>
      <H5>{subtitle}</H5>
    </div>
  );
};

export default PageHeader;
