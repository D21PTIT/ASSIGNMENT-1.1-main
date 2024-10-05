import React from "react";
import { Button, Form, Input, message } from "antd";
import "./Login.css"; // Nhớ import file CSS
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await axios.post("http://localhost:8080/api/user/insert", {
        email: values.email,
        password: values.password,
        password2: values.password2,
      });

      if (response.data.status === "ok") {
        message.success("Tạo người dùng mới thành công!");
        navigate("/");
        // Xử lý sau khi đăng nhập thành công, ví dụ: điều hướng đến trang khác
      } else {
        // Hiển thị thông báo lỗi từ BE
        message.error(response.data.message || "Email hoặc mật khẩu không đúng!");
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi khi gọi API:", error);
      // Kiểm tra xem có thông báo lỗi từ BE hay không
      if (error.response && error.response.data && error.response.data.message) {
        message.error(error.response.data.message);
      } else {
        message.error("Có lỗi xảy ra trong quá trình đăng nhập!");
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-form-container">
      <Form
        name="basic"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <h3>Tạo 1 tài khoản mới</h3>
        <Form.Item
          label="email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Nhap lai"
          name="password2"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Xác nhận.
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateUser;
