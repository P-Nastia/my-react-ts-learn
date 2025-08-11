import {Row} from 'antd';
import {useGetProductsByCategoryQuery} from "../../../services/apiProduct.ts";
import ProductCard from "../../../components/ui/card/ProductCard.tsx";
import LoadingOverlay from "../../../components/ui/loading/LoadingOverlay.tsx";
import {useParams} from "react-router-dom";
import Breadcrumbs from "../../../components/ui/breadcrumbs";

export const ProductsByCategoryPage: React.FC = () => {
    const { categorySlug } = useParams<{ categorySlug: string }>();
    console.log(categorySlug);
    const {data: products, isLoading, isError} = useGetProductsByCategoryQuery(categorySlug!);
console.log(products);

    const uniqueProducts = products
        ? products.filter((product, index, self) =>
            index === self.findIndex((p) => p.slug === product.slug)
        )
        : [];

    return (
        <>
            {isError && <p>Помилка при завантаженні продуктів</p>}
            {(products?.length === 0) && <p>Продуктів цієї категорії поки що немає</p>}
            {isLoading && <LoadingOverlay/>}
            <Breadcrumbs/>
            <div style={{padding: 24}}>
                <Row gutter={[16, 16]}>
                    {uniqueProducts.map((product) => (
                        <ProductCard key={product.id} product={product}/>
                    ))}
                </Row>
            </div>
        </>
    );
};


export default ProductsByCategoryPage