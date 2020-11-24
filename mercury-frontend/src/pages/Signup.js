import React, { useState, useContext } from "react";
import { Row, Col, Card, Form, Input, Button, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { Redirect } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth";
import "./styles/signup.css";

const Signup = () => {
  const [signupSuccess, setSignupSuccess] = useState();
  const [signupError, setSignupError] = useState();
  const [signupLoading, setSignupLoading] = useState(false);
  const [redirectOnSignup, setRedirectOnSignup] = useState(false);

  const authContext = useContext(AuthContext);

  const onFormSubmit = async (values) => {
    try {
      setSignupLoading(true);
      const response = await axios.post(
        "http://localhost:8000/api/signup",
        values
      );
      const { data } = response;
      console.log(data);
      authContext.setAuthState(data);
      setSignupSuccess(data.message);
      setSignupError(false);
      setTimeout(() => {
        setRedirectOnSignup(true);
      }, 900);
    } catch (error) {
      console.log(error);
      const { data } = error.response;
      setSignupError(data.message);
      setSignupLoading(false);
      setSignupSuccess(null);
    }
  };

  return (
    <>
      {redirectOnSignup && <Redirect to="/dashboard" />}
      <Row className="signup-wrapper" justify="center" align="middle">
        <Col className="signup-content">
          <Card className="signup-card" title="Signup" bordered={false}>
            <Form
              name="signup"
              className="signup-form"
              initialValues={{ remember: true }}
              onFinish={onFormSubmit}
            >
              <Form.Item
                name="firstname"
                rules={[
                  { required: true, message: "Please input your First Name!" },
                ]}
              >
                <Input placeholder="First Name" />
              </Form.Item>

              <Form.Item
                name="lastname"
                rules={[
                  { required: true, message: "Please input your Last Name!" },
                ]}
              >
                <Input placeholder="Last Name" />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "Please input valid Email!",
                  },
                  {
                    required: true,
                    message: "Please input your Email!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  type="email"
                  placeholder="Email"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="signup-form-button"
                  loading={signupLoading}
                >
                  Signup
                </Button>
              </Form.Item>
            </Form>
            {signupSuccess && (
              <Alert message={signupSuccess} type="success" showIcon />
            )}
            {signupError && (
              <Alert message={signupError} type="error" showIcon />
            )}
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Signup;
