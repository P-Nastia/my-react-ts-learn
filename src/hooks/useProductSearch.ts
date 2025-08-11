import { useSearchParams } from "react-router-dom";
import { useGetSearchProductsQuery } from "../services/apiProduct";

export const useProductSearch = (categoryName: string = '') => {
    const [searchParams, setSearchParams] = useSearchParams();

    const page = parseInt(searchParams.get("page") || "1", 10);
    const itemsPerPage = parseInt(searchParams.get("itemsPerPage") || "5", 10);
    const value = searchParams.get("value") || "";

    const { data, isLoading, isError } = useGetSearchProductsQuery({
        paginationRequest: { currentPage: page, itemsPerPage },  // ✅ correct prop names
        value,
        categoryName,
    });

    const handlePageChange = (page: number, pageSize?: number) => {
        setSearchParams({
            value,
            page: String(page),
            itemsPerPage: String(pageSize || itemsPerPage),
        });
    };

    return {
        data,
        isLoading,
        isError,
        handlePageChange,
        currentPage: page,
        itemsPerPage,
        totalAmount: data?.pagination?.totalAmount || 0,  // ✅ fallback
    };
};
