import React, { useContext } from "react";
import { Layout, Menu, Avatar, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { AuthContext } from "../context/auth";
import "./styles/dashboard.css";

const Dashboard = () => {
  const { Header, Content, Footer } = Layout;
  const authContext = useContext(AuthContext);

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a
          href="/#"
          onClick={(e) => {
            e.preventDefault();
            authContext.logout();
          }}
        >
          Logout
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
          <span className="push">
            <Dropdown overlay={menu} trigger={["click"]}>
              <Avatar size={45} icon={<UserOutlined />} />
            </Dropdown>
          </span>
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <div style={{ minHeight: "88vh", padding: "24px" }}>Content</div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Made with <span style={{ color: "#e25555" }}>&#9829;</span> by MK
      </Footer>
    </Layout>
  );
};

export default Dashboard;
