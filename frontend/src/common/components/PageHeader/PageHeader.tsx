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
const H1 = styled.h1`
  color: black;
`;

interface IProps {
  title: string;
  menu?: ReactNode[];
}

const PageHeader: React.FC<IProps> = ({ title, menu = [] }) => {
  return (
    <Wrapper>
      <H1>{title}</H1>
      <Stack direction="horizontal">{menu.map((item) => item)}</Stack>
    </Wrapper>
  );
};

export default PageHeader;
