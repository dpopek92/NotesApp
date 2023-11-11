import { ISearchParams } from "common/interfaces/Search.interface";
import { toNumber } from "lodash";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const usePagination = (init: ISearchParams) => {
  let [searchParams, setSearchParams] = useSearchParams();

  const pageNumber = searchParams.get("pageNumber")
    ? toNumber(searchParams.get("pageNumber"))
    : init.pageNumber
    ? init.pageNumber
    : 1;
  const itemsPerPage = searchParams.get("itemsPerPage")
    ? toNumber(searchParams.get("itemsPerPage"))
    : init.itemsPerPage
    ? init.itemsPerPage
    : 10;

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

  const handlePagination = (pageNumber: number) => {
    searchParams.set("pageNumber", pageNumber.toString());
    setSearchParams(searchParams);
  };
  const handleItemsPerPage = (itemsPerPage: number) => {
    searchParams.set("pageNumber", "1");
    searchParams.set("itemsPerPage", itemsPerPage.toString());
    setSearchParams(searchParams);
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
