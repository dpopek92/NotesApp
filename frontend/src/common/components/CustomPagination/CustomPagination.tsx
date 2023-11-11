import React, { useEffect, useState } from "react";
import { Form, Pagination, Stack } from "react-bootstrap";
import styled from "styled-components";

const Select = styled(Form.Select)`
  width: 100px;
`;

const perPage = [5, 10, 25, 50, 100];

interface IProps {
  pageNumber: number;
  itemsPerPage: number;
  totalPages: number;
  handlePagination: (pageNumber: number) => void;
  handleItemsPerPage: (itemsPerPage: number) => void;
}

const CustomPagination: React.FC<IProps> = ({
  pageNumber,
  itemsPerPage,
  totalPages,
  handleItemsPerPage,
  handlePagination,
}) => {
  const [pageItems, setPageItems] = useState<number[]>([1]);

  useEffect(() => {
    const newPageItems = [pageNumber - 1, pageNumber, pageNumber + 1].filter(
      (item) => item > 0 && item <= totalPages
    );
    setPageItems(newPageItems);
  }, [pageNumber, totalPages]);

  return (
    <Stack direction="horizontal">
      <Pagination size="sm" className="mb-0">
        <Pagination.First onClick={() => handlePagination(1)} />
        <Pagination.Prev
          disabled={pageNumber <= 1}
          onClick={() => handlePagination(pageNumber - 1)}
        />

        {pageItems.map((item) => (
          <Pagination.Item
            key={item}
            linkClassName={item === pageNumber ? "pagination-active" : ""}
            onClick={() => handlePagination(item)}
            active={item === pageNumber}
          >
            {item}
          </Pagination.Item>
        ))}

        <Pagination.Next
          disabled={pageNumber >= totalPages}
          onClick={() => handlePagination(pageNumber + 1)}
        />
        <Pagination.Last onClick={() => handlePagination(totalPages)} />
      </Pagination>

      <Select
        value={itemsPerPage}
        onChange={(e: any) => handleItemsPerPage(+e.target.value)}
        size="sm"
      >
        {perPage.map((value) => (
          <option value={value} key={value}>
            {value}
          </option>
        ))}
      </Select>
    </Stack>
  );
};

export default CustomPagination;
