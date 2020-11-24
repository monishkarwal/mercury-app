import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Row, Col, Card, Form, Input, Button, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { AuthContext } from "../context/auth";
import axios from "axios";

import "./styles/login.css";

const Login = () => {
  const [loginSuccess, setLoginSuccess] = useState();
  const [loginError, setLoginError] = useState();
  const [redirectOnLogin, setRedirectOnLogin] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  const authContext = useContext(AuthContext);

  const onFormSubmit = async (values) => {
    try {
      setLoginLoading(true);

      const response = await axios.post(
        "http://localhost:8000/api/login",
        values
      );
      const { data } = response;
      console.log(data);
      authContext.setAuthState(data);
      setLoginSuccess(data.message);
      setLoginError(null);
      setTimeout(() => {
        setRedirectOnLogin(true);
      }, 500);
    } catch (error) {
      console.log(error);
      setLoginLoading(false);
      const { data } = error.response;
      setLoginError(data.message);
      setLoginSuccess(null);
    }
  };

  return (
    <>
      {redirectOnLogin && <Redirect to="/dashboard" />}
      <Row className="login-wrapper" justify="center" align="middle">
        <Col className="login-content">
          <Card className="login-card" title="Login" bordered={false}>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ email: "test@test.com", password: "test" }}
              onFinish={onFormSubmit}
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your Username!" },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Username" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  loading={loginLoading}
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>

            {loginSuccess && (
              <Alert message={loginSuccess} type="success" showIcon />
            )}
            {loginError && <Alert message={loginError} type="error" showIcon />}
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Login;
