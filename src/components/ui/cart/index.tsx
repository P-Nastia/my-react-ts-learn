import {Badge, Button, Drawer, List, Space, Image, Typography, Divider} from "antd";
import {useAppDispatch, useAppSelector} from "../../../store";
import {useEffect, useState} from "react";

import {APP_ENV} from "../../../env";
import {createUpdateCart, type ICartItem} from "../../../store/cartSlice.ts";
import {
    type ICreateUpdateCartItem, type IRemoveCartItem,
    useCreateUpdateCartMutation, useGetCartQuery,
    useRemoveCartItemMutation
} from "../../../services/apiCart.ts";


const { Text } = Typography;

const CartDrawer: React.FC = () => {
    const [open, setOpen] = useState(false);
    const { user } = useAppSelector(state => state.auth);

    const { isLoading } = useGetCartQuery(undefined, { skip: !user });


    const { items } = useAppSelector(state => state.cart);
    console.log("Cart items from redux:", items);
    const dispatch = useAppDispatch();

    const [removeServerCartItem] = useRemoveCartItemMutation();
    const [createUpdateServerCart] = useCreateUpdateCartMutation();

    useEffect(() => {
        if (!user) {
            localStorage.setItem("cart", JSON.stringify(items));
        }
    }, [items, user]);

    const handleEditCart = (prop: ICreateUpdateCartItem) => {
        const newItems = items.map(item =>
            item.productId === prop.productId
                ? { ...item, quantity: prop.quantity }
                : item
        );

        if (user) {
            createUpdateServerCart(prop);
        } else {
            localStorage.setItem('cart', JSON.stringify(newItems));
        }

        dispatch(createUpdateCart(newItems));
    };

    const handleRemoveCart = (prop: IRemoveCartItem) => {
        const newItems = items.filter(el => el.productId !== prop.id);

        if (user) {
            removeServerCartItem(prop);
        } else {
            localStorage.setItem('cart', JSON.stringify(newItems));
        }

        dispatch(createUpdateCart(newItems));
    };

    return (
        <>
            <Badge count={items.reduce((acc, obj) => acc + (obj.quantity ?? 0), 0)} showZero>
                <Button onClick={() => setOpen(true)}>Кошик</Button>
            </Badge>

            <Drawer
                title="Ваш кошик"
                onClose={() => setOpen(false)}
                open={open}
                width={400}
            >
                <List
                    dataSource={items}
                    locale={{ emptyText: isLoading ? "Завантаження кошика..." : "Кошик порожній" }}
                    renderItem={(item: ICartItem) => (
                        <List.Item
                            actions={[
                                <Button
                                    danger
                                    onClick={() => handleRemoveCart({ id: item.productId! })}
                                >
                                    Видалити
                                </Button>
                            ]}
                        >
                            <Space align="start">
                                <Image
                                    src={`${APP_ENV.IMAGES_200_URL}${item.imageName}`}
                                    width={64}
                                    height={64}
                                    preview={false}
                                />
                                <div>
                                    <Text strong>{item.name}</Text><br />
                                    <Text type="secondary">{item.categoryName}</Text><br />
                                    <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "8px 0" }}>
                                        <Button
                                            size="small"
                                            onClick={() =>
                                                item.quantity! > 1 &&
                                                handleEditCart({ productId: item.productId!, quantity: item.quantity! - 1 })
                                            }
                                        >
                                            -
                                        </Button>
                                        <Text>{item.quantity}</Text>
                                        <Button
                                            size="small"
                                            onClick={() =>
                                                handleEditCart({ productId: item.productId!, quantity: item.quantity! + 1 })
                                            }
                                        >
                                            +
                                        </Button>
                                    </div>
                                    <Text>Ціна: {item.price} ₴</Text>
                                </div>
                            </Space>
                        </List.Item>
                    )}
                />

                <Divider />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Button type="primary" disabled={items.length === 0}>
                        Оформити
                    </Button>
                </div>
            </Drawer>
        </>
    );
};


export default CartDrawer;