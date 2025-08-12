import React from 'react';
import { useGetUserOrdersQuery } from "../../services/apiOrder.ts"
import {Card,List,Typography,Divider,Row,Col,Image,Spin,Empty} from 'antd';
import dayjs from 'dayjs';
import {APP_ENV} from "../../env";
import {Link} from "react-router";

const { Title, Text } = Typography;

const OrdersPage: React.FC = () => {
    const token = localStorage.getItem('token');


    const {
        data: orders,
        isLoading
    } = useGetUserOrdersQuery(token as string, {
        skip: !token,
    });

    if (!orders || orders.length === 0) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <Empty description="У вас ще немає замовлень" />
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="px-4 py-8 max-w-5xl mx-auto">
            <Title level={2} className="text-orange-500 mb-6 text-center">Ваші замовлення</Title>

            <List
                grid={{ gutter: 16, column: 1 }}
                dataSource={orders}
                renderItem={(order) => (
                    <List.Item>
                        <Card
                            title={`Замовлення`}
                            className="shadow-lg rounded-lg"
                            extra={<Text strong>{order.status}</Text>}
                        >
                            <Row gutter={[16, 8]}>
                                <Col span={12}>
                                    <Text strong>Дата:</Text>{' '}
                                    {dayjs(order.dateCreated).format('DD.MM.YYYY HH:mm')}
                                </Col>
                                <Col span={12}>
                                    <Text strong>Місто:</Text>{' '}
                                    {order.deliveryInfo.city.name}
                                </Col>
                                <Col span={12}>
                                    <Text strong>Номер телефону:</Text>{' '}
                                    {order.deliveryInfo.phoneNumber}
                                </Col>
                                <Col span={12}>
                                    <Text strong>Відділення:</Text>{' '}
                                    {order.deliveryInfo.postDepartment.name}
                                </Col>
                                <Col span={12}>
                                    <Text strong>Оплата:</Text>{' '}
                                    {order.deliveryInfo.paymentType.name}
                                </Col>
                                <Col span={12}>
                                    <Text strong>Сума:</Text>{' '}
                                    <Text type="success">{order.totalPrice} ₴</Text>
                                </Col>
                            </Row>

                            <Divider />

                            <Title level={5}>Товари</Title>
                            <List
                                itemLayout="horizontal"
                                dataSource={order.orderItems}
                                renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={
                                                <Link to={`/products/${item.categorySlug}/${item.productSlug}/${item.productId}`}>
                                                    <Image
                                                        width={64}
                                                        src={`${APP_ENV.IMAGES_400_URL}${item.productImage}`}
                                                        alt={item.productName}
                                                        preview={false}
                                                        className="rounded cursor-pointer hover:opacity-80 transition"
                                                    />
                                                </Link>
                                            }
                                            title={item.productName}
                                            description={`Кількість: ${item.count} x ${item.priceBuy} ₴`}
                                        />
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default OrdersPage;
