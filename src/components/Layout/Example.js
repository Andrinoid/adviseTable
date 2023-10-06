import React from "react";
import Layout from "./Layout";
import Sider from "./Sider";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";

import "./styles.css";
import { Tab, Tabs } from "./styles";

export default function Example() {
  return (
    <div className="container">
      <Layout vertical>
        <Layout horizontal>
          <Sider></Sider>

          <Layout vertical>
            <Header></Header>
            <Content></Content>
          </Layout>
        </Layout>

        <Footer>
          <Tabs>
            <Tab>Actual</Tab>
            <Tab>Budget</Tab>
            <Tab>Comparison</Tab>
            <Tab>Dashboard</Tab>
          </Tabs>
        </Footer>
      </Layout>
    </div>
  );
}
