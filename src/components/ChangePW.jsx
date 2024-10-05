import React, { useState } from "react";
import { Input, Button, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles.css"; // Nhập CSS

const ChangePW = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpVisible, setIsOtpVisible] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleCheckEmail = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/user/checkEmail", { email });
      if (response.data.status === "ok") {
        message.success("Email hợp lệ, hãy nhập mã OTP!");
        setGeneratedOtp(response.data.data);
        setIsOtpVisible(true);
        console.log(response.data.data);
      } else {
        message.error("Tài khoản không tồn tại!");
        setIsOtpVisible(false);
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi khi gọi API:", error);
      message.error("Có lỗi xảy ra trong quá trình kiểm tra email!");
    }
  };

  const handleVerifyOtp = () => {
    if (otp === generatedOtp) {
      message.success("Xác minh OTP thành công!");
      setIsPasswordVisible(true);
    } else {
      message.error("Mã OTP không đúng, vui lòng thử lại!");
    }
  };

  const handleChangePassword = async () => {
    if (password !== password2) {
      message.error("Mật khẩu không khớp. Vui lòng kiểm tra lại.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/user/changePassword", {
        email,
        password,
      });

      if (response.data.status === "ok") {
        message.success("Đổi mật khẩu thành công! Vui lòng đăng nhập lại.");
        navigate("/");
      } else {
        // Hiển thị thông báo lỗi từ backend
        message.error(response.data.message || "Có lỗi xảy ra trong quá trình đổi mật khẩu.");
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi khi gọi API:", error);
      // Hiển thị thông báo lỗi từ backend hoặc lỗi mạng
      message.error(error.response?.data?.message || "Có lỗi xảy ra trong quá trình đổi mật khẩu!");
    }
  };

  return (
    <div className="container">
      <div className="header">Thay đổi mật khẩu</div>
      <Input
        className="input-field"
        placeholder="Nhập email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button className="button" onClick={handleCheckEmail}>
        Kiểm tra email
      </Button>

      {isOtpVisible && (
        <div className="mt-20">
          <Input
            className="input-field"
            placeholder="Nhập mã OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <Button className="button mt-10" onClick={handleVerifyOtp}>
            Xác minh OTP
          </Button>
        </div>
      )}

      {isPasswordVisible && (
        <div className="mt-20">
          <Input.Password
            className="input-field"
            placeholder="Nhập mật khẩu mới"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input.Password
            className="input-field mt-10"
            placeholder="Nhập lại mật khẩu mới"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
          <Button className="button mt-10" onClick={handleChangePassword}>
            Đổi mật khẩu
          </Button>
        </div>
      )}
    </div>
  );
};

export default ChangePW;
