import React from "react";
import Layout from "./Layout";
import Sider from "./Sider";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";

import "./styles.css";
import { Tab, Tabs, SiderTop, SiderItem, MenuButton } from "./styles";
import MenuIcon from "./icons/MenuIcon";

export default function Example() {
  return (
    <div className="container">
      <Layout vertical>
        <Layout>
          <Sider>
            <SiderTop padding={12}>
              <img
                src={process.env.PUBLIC_URL + "/advise.png"}
                alt="Logo"
                style={{
                  width: "100%",
                  height: "auto",
                  maxWidth: 60,
                }}
              />
            </SiderTop>

            <SiderItem>
              <img src={process.env.PUBLIC_URL + "/home.svg"} />
            </SiderItem>

            <SiderItem>
              <img src={process.env.PUBLIC_URL + "/gear.svg"} />
            </SiderItem>
          </Sider>

          <Layout vertical>
            <Header>
              <MenuButton style={{ marginLeft: 60 }}>
                <MenuIcon />
              </MenuButton>
            </Header>
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
