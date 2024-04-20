import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useProductApi from "../../service/product/useProductApi";
import { Button, Input, Form, type FormProps, Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

type FieldType = {
  name_en: string;
  name_ru: string;
  images: File | null;
};

interface Product {
  name_en: string;
  name_ru: string;
}

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    useProductApi
      .getProducts()
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = async (values: Product & { images: File | null }) => {
    try {
      const formData = new FormData();
      formData.append("name_en", values.name_en);
      formData.append("name_ru", values.name_ru);
      if (values.images) {
        formData.append("images", (values.images as File[])[0].originFileObj);
      }
      console.log(values.images);
      await useProductApi.createProduct(formData);
      message.success("Successfully created!");
    } catch (err: any) {
      message.error(`Error creating product, ${err.response.data.message}`);
    }
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    handleSubmit(values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const Leave = () => {
    localStorage.removeItem("accessToken");
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div>
      {localStorage.getItem("accessToken") ? (
        <Link to={"/signin"}>
          <button onClick={Leave}>SignOut</button>
        </Link>
      ) : (
        <Link to={"/signin"}>
          <button>Signin</button>
        </Link>
      )}

      <div className="w-full h-screen flex items-center justify-center">
        <div className="shadow-lg px-10 py-5 hover:shadow-xl duration-300">
          <Form
            name="basic"
            style={{ width: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item<FieldType>
              label="Name EN"
              name="name_en"
              rules={[
                { required: true, message: "Please input your name en!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Name RU"
              name="name_ru"
              rules={[
                { required: true, message: "Please input your name ru!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Upload"
              valuePropName="fileList"
              name="images"
              getValueFromEvent={normFile}
              rules={[{ required: true, message: "Please upload you image!" }]}
            >
              <Upload
                action="/upload.do"
                listType="picture-card"
                customRequest={({ onSuccess }) => {
                  onSuccess("OK");
                }}
              >
                <button style={{ border: 0, background: "none" }} type="button">
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </button>
              </Upload>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>

      <div>
        {products.map((product: Product, index) => (
          <div key={index}>
            <h2>{product.name_en}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
