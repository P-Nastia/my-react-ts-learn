import { Row } from 'antd';
import ProductCard from "../../../components/ui/card/ProductCard.tsx";
import LoadingOverlay from "../../../components/ui/loading/LoadingOverlay.tsx";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../../../components/ui/breadcrumbs";
import { useProductSearch } from "../../../hooks/useProductSearch";
import CustomPagination from "../../../components/ui/pagination";
import React from "react";

export const ProductsByCategoryPage: React.FC = () => {
    const { categorySlug } = useParams<{ categorySlug: string }>();

    const {
        data,
        isLoading,
        isError,
        handlePageChange,
        currentPage,
        itemsPerPage,
        totalAmount
    } = useProductSearch(categorySlug || '');

    const uniqueProducts = data?.list
        ? data.list.filter((product, index, self) =>
            index === self.findIndex((p) => p.slug === product.slug)
        )
        : [];

    return (
        <>
            {isError && <p>Помилка при завантаженні продуктів</p>}
            {(!isLoading && data?.list?.length === 0) && <p>Продуктів цієї категорії поки що немає</p>}
            {isLoading && <LoadingOverlay />}
            <Breadcrumbs />
            <div style={{ padding: 24 }}>
                <Row gutter={[16, 16]}>
                    {uniqueProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
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

export default ProductsByCategoryPage;
