import { ISearchParams } from "common/interfaces/Search.interface";
import { toNumber } from "lodash";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

// Custom hook to handle pagination logic holding data in the url
const usePagination = (initialParams: ISearchParams) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getQueryParamAsNumber = (paramName: string, defaultValue: number) => {
    const value = searchParams.get(paramName);
    return value ? toNumber(value) : defaultValue;
  };

  const pageNumber = getQueryParamAsNumber(
    "pageNumber",
    initialParams.pageNumber || 1
  );
  const itemsPerPage = getQueryParamAsNumber(
    "itemsPerPage",
    initialParams.itemsPerPage || 10
  );

  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const calcTotalPages = () => {
    if (totalItems && itemsPerPage) {
      const pages = totalItems / itemsPerPage;
      setTotalPages(Math.ceil(pages));
    }
  };

  useEffect(() => {
    calcTotalPages();
  }, [totalItems, itemsPerPage]);

  useEffect(() => {
    if (totalPages && pageNumber > totalPages) {
      searchParams.set("pageNumber", totalPages.toString());
      setSearchParams(searchParams);
    }
  }, [pageNumber, totalPages]);

  const updateSearchParams = (pageNumber: number, itemsPerPage?: number) => {
    searchParams.set("pageNumber", pageNumber.toString());
    if (itemsPerPage !== undefined) {
      searchParams.set("itemsPerPage", itemsPerPage.toString());
    }
    setSearchParams(searchParams);
  };

  const handlePagination = (pageNumber: number) => {
    updateSearchParams(pageNumber);
  };

  const handleItemsPerPage = (itemsPerPage: number) => {
    updateSearchParams(1, itemsPerPage);
  };

  return {
    itemsPerPage,
    pageNumber,
    totalItems,
    totalPages,
    setTotalItems,
    handlePagination,
    handleItemsPerPage,
  };
};

export default usePagination;
