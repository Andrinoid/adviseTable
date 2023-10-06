import React from "react";
import Layout from "./components/Layout";
import Sider from "./components/Sider";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";

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
import MenuIcon from "../../icons/MenuIcon";
import usePushSider from "./hooks/usePushSider";
import Siders from "./components/Siders";

export default function Example() {
  const pushSider = usePushSider();

  return (
    <div className="container">
      <Layout vertical>
        <Layout>
          <Siders>
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

              <SiderItem
                onClick={() => {
                  pushSider(<CompanySettings />);
                }}
              >
                <img src={process.env.PUBLIC_URL + "/home.svg"} />
              </SiderItem>

              <SiderItem
                onClick={() => {
                  pushSider(<CompanySettings />);
                }}
              >
                <img src={process.env.PUBLIC_URL + "/gear.svg"} />
              </SiderItem>
            </Sider>
          </Siders>

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

const CompanySettings = () => {
  return (
    <Sider width={250} borderLeft={0} resizeable>
      <SiderTop padding={12}>
        <p>Company Settings</p>
      </SiderTop>

      <SiderItem>
        <p>Home</p>
      </SiderItem>

      <SiderItem>
        <p>Settings</p>
      </SiderItem>
    </Sider>
  );
};
