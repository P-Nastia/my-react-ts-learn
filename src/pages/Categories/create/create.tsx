import type {ICategoryCreate} from "../../../services/types.ts";
import {Form, Input, Button} from "antd";

const CategoriesCreatePage: React.FC = () => {

    const onFinish: FormProps<ICategoryCreate>['onFinish']=(values)=>{
        console.log(values)
    }

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
            <div className="max-w-full overflow-x-auto">
               <h1>ADD CATEGORY</h1>
                <Form
                    onFinish={onFinish}
                    labelCol={{span: 6}}
                    wrapperCol={{span: 18}}
                    layout="horizontal"
                >
                    <Form.Item<ICategoryCreate>
                        label="Назва"
                        name="name"
                        rules={[{required:true,message:'Назва is required'}]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<ICategoryCreate>
                        label="Слаг"
                        name="slug"
                        rules={[{required:true,message:'Слаг is required'}]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit">
                            Додати
                        </Button>
                    </Form.Item>
                </Form>

            </div>
        </div>
    );
}

export default CategoriesCreatePage;