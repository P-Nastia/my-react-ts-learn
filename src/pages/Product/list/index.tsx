import {Row} from 'antd';
import ProductCard from "../../../components/ui/card/ProductCard.tsx";
import LoadingOverlay from "../../../components/ui/loading/LoadingOverlay.tsx";
import Breadcrumbs from "../../../components/ui/breadcrumbs";
import {useProductSearch} from "../../../hooks/useProductSearch.ts";
import CustomPagination from "../../../components/ui/pagination";
import React from "react";

export const ProductsPage: React.FC = () => {
    const {
        data,
        isLoading,
        isError,
        handlePageChange,
        currentPage,
        itemsPerPage,
        totalAmount
    } = useProductSearch();
    //console.log("PRODUCTS",products);

    if (isError) return <p>Помилка при завантаженні продуктів</p>;

    const uniqueProducts = data?.list
        ? data.list.filter((product, index, self) =>
            index === self.findIndex((p) => p.slug === product.slug)
        )
        : [];

    return (
        <>
            <Breadcrumbs/>
            {isLoading && <LoadingOverlay/>}
            <div style={{padding: 24}}>
                <Row gutter={[16, 16]}>
                    {uniqueProducts.map((product) => (
                        <ProductCard key={product.id} product={product}/>
                    ))}
                </Row>
            </div>
            {data?.pagination && (
                <CustomPagination
                    currentPage={currentPage}
                    totalItems={totalAmount}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                    style={{ marginTop: 20 }}
                />
            )}
        </>
    );
};


export default ProductsPage