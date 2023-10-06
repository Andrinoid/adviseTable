import React from "react";
import Layout from "./Layout";
import Sider from "./Sider";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";

import "./styles.css";
import {
  Tab,
  Tabs,
  SiderTop,
  SiderItem,
  MenuButton,
  Flex,
  ControlButton,
} from "./styles";
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
              <MenuButton>
                <MenuIcon />
              </MenuButton>
            </Header>
            <Content>
              <Flex
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
              >
                <Flex
                  flexDirection="column"
                  minHeight={100}
                  justifyContent="space-between"
                  alignItems="center"
                  dashed
                  padding={20}
                  width={400}
                >
                  <input
                    type="number"
                    value={0}
                    style={{
                      width: 350,
                      minHeight: 40,
                      fontSize: 20,
                      textAlign: "center",
                      border: "2px solid rgb(66, 82, 110)",
                      borderRadius: 5,
                      outline: "none",
                      marginBottom: 10,
                    }}
                  />
                  <Flex
                    justifyContent="space-around"
                    style={{
                      width: 350,
                      marginBottom: 20,
                    }}
                  >
                    <ControlButton inverted>Push on sidebar {0}</ControlButton>
                    <ControlButton inverted>Pop on sidebar {0}</ControlButton>
                  </Flex>

                  <span
                    style={{
                      textTransform: "uppercase",
                      fontWeight: "bold",
                      color: "rgb(66, 82, 110)",
                    }}
                  >
                    sidebar {0} stack size {0}
                  </span>
                </Flex>

                <Flex
                  dashed
                  padding={20}
                  width={400}
                  style={{ marginTop: 10 }}
                  justifyContent="space-between"
                >
                  <ControlButton inverted>Add sidebar</ControlButton>

                  <ControlButton inverted>Add drawer</ControlButton>

                  <ControlButton inverted>Pop</ControlButton>

                  <ControlButton inverted>Pop all</ControlButton>
                </Flex>

                <Flex
                  flexDirection="column"
                  minHeight={100}
                  justifyContent="space-between"
                  alignItems="center"
                  dashed
                  padding={20}
                  width={400}
                >
                  <input
                    value={0}
                    placeholder="Sidebar Width"
                    type="number"
                    style={{
                      width: 350,
                      minHeight: 40,
                      fontSize: 20,
                      textAlign: "center",
                      border: "2px solid rgb(66, 82, 110)",
                      borderRadius: 5,
                      outline: "none",
                      marginBottom: 10,
                    }}
                  />
                </Flex>
              </Flex>
            </Content>
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
