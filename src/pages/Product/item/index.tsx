import { useParams, useNavigate } from "react-router-dom";
import { useGetProductByIdQuery, useGetProductsBySlugQuery } from "../../../services/apiProduct";
import { Spin, Carousel, Image, Tag, Typography, Radio, Button, Space } from "antd";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import {APP_ENV} from "../../../env";
import type {ICartItem} from "../../../store/localCartSlice.ts";
import {useCart} from "../../../hooks/useCart.ts";
import {useAppSelector} from "../../../store";
import {Link} from "react-router";

const { Title } = Typography;

const ProductPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const productId = id ? parseInt(id) : undefined;
    const {user} = useAppSelector(state => state.auth);
    const { cart, addToCart } = useCart(user!=null);

    console.log(productId);

    const {
        data: currentProduct,
        isLoading: loadingProduct
    } = useGetProductByIdQuery(productId!, {
        skip: !productId,
    });

    const {
        data: allProducts,
        isLoading: loadingVariants
    } = useGetProductsBySlugQuery(currentProduct?.slug ?? '', {
        skip: !currentProduct?.slug,
    });

    const isInCart = cart.some(item =>
        currentProduct &&
        item.productId === currentProduct.id
    );
    console.log("currentProduct", currentProduct);

    const handleAddToCart = async () => {
        if (!currentProduct) return;

        console.log("product add", currentProduct);

        const newItem: ICartItem = {
            id: currentProduct.id,
            productId: currentProduct.id,
            quantity: 1,
            price: currentProduct.price,
            imageName: currentProduct.productImages?.[0]?.name ?? "",
            categoryId: 0,
            categoryName: "",
            name: currentProduct.name,
        };

        await addToCart(newItem);

    };

    if (loadingProduct || loadingVariants || !currentProduct || !allProducts) {
        return (
            <div style={{ textAlign: 'center', marginTop: 100 }}>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div style={{ marginTop: '5%', display: 'flex', justifyContent: 'center' }}>
            <div style={{ maxWidth: 1100, width: '100%' }} className="product-page-container">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>

                    <div style={{ flex: 1, minWidth: 300 }}>
                        <Carousel>
                            {currentProduct.productImages?.map((img) => (
                                <div key={img.id}>
                                    <Image
                                        src={`${APP_ENV.IMAGES_800_URL}${img.name}`}
                                        alt="Product"
                                        width="100%"
                                        style={{ borderRadius: 8 }}
                                    />
                                </div>
                            ))}
                        </Carousel>
                    </div>


                    <div style={{ flex: 1, minWidth: 300 }}>
                        <Title level={2}>{currentProduct.name}</Title>

                        <Title level={5}>Інгредієнти</Title>
                        <Space wrap>
                            {currentProduct.productIngredients?.map(ing => (
                                <Tag
                                    key={ing.id}
                                    color="blue"
                                    style={{ padding: '6px 10px', display: 'flex', alignItems: 'center' }}
                                >
                                    <img
                                        src={`${APP_ENV.IMAGES_800_URL}${ing.image}`}
                                        alt={ing.name}
                                        width={20}
                                        height={20}
                                        style={{ borderRadius: '50%', marginRight: 8 }}
                                    />
                                    {ing.name}
                                </Tag>
                            ))}
                        </Space>

                        <div style={{ marginTop: 24 }}>
                            <div><strong>Вага:</strong> {currentProduct.weight} гр</div>
                            <div><strong>Ціна:</strong> {currentProduct.price} грн</div>
                        </div>

                        <div style={{ marginTop: 24 }}>
                            <Radio.Group
                                value={currentProduct.id}
                            >
                                {allProducts.map(product => (
                                    <Radio.Button key={product.id} value={product.id}
                                    onClick={(e) => navigate(`/product/${product.id}`)}>
                                        {product.productSize?.name}
                                    </Radio.Button>
                                ))}
                            </Radio.Group>
                        </div>

                        <Button
                            type="primary"
                            icon={<FontAwesomeIcon icon={faShoppingCart} />}
                            onClick={!isInCart ? handleAddToCart : undefined}
                            disabled={isInCart}
                            style={{
                                marginTop: 24,
                                backgroundColor: isInCart ? '#999999' : undefined,
                                cursor: isInCart ? 'not-allowed' : 'pointer',
                            }}
                        >
                            {isInCart ? 'Вже в кошику' : 'Додати в кошик'}
                            {isInCart && (
                                <FontAwesomeIcon
                                    icon={faCheckCircle}
                                    style={{ marginLeft: 10 }}
                                />
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
