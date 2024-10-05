import React from "react";
import { Button, Form, Input, message } from "antd";
import "./Login.css"; // Nhớ import file CSS
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await axios.post("http://localhost:8080/api/user/login", {
        email: values.email,
        password: values.password,
      });
      if (response.data.status === "ok") {
        message.success("Đăng nhập thành công!");
        navigate("/home");
        // Xử lý sau khi đăng nhập thành công, ví dụ: điều hướng đến trang khác
      } else {
        message.error("Email hoặc mật khẩu không đúng!");
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi khi gọi API:", error);
      message.error("Email hoặc mật khẩu không đúng!");
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
        <h3>Vui lòng đăng nhập để sử dụng hệ thống</h3>
        <Form.Item
          label="email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your username!",
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

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Đăng nhập
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="link" onClick={() => navigate("/new")}>
            Đăng ký tài khoản mới
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="link" onClick={() => navigate("/forgot")}>
            Quên mật khẩu?
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
