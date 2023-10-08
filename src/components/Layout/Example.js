import React, { useState } from "react";
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
import usePopSider from "./hooks/usePopSider";
import styled from "styled-components";
import useCollapsed from "./hooks/useCollapsed";
import useCollapse from "./hooks/useCollapse";
import useExpand from "./hooks/useExpand";
import useLayout from "./hooks/useLayout";
import useStackPush from "./hooks/useStackPush";
import useStackPop from "./hooks/useStackPop";
var lastName = "";

export default function Example() {
  const [reverse, setReverse] = useState(false);
  const pushSider = usePushSider();
  const popSider = usePopSider();
  const collapsed = useCollapsed();
  const collapse = useCollapse();
  const expand = useExpand();
  const { siders, backup } = useLayout();
  const stackPush = useStackPush();
  const stackPop = useStackPop();

  const [siderIndex, setSiderIndex] = useState(-1);

  return (
    <div className="container">
      <Layout vertical>
        <Layout reverse={reverse}>
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
                  pushSider((index) => (
                    <AnotherSider index={index} name="Company Settings" />
                  ));
                }}
              >
                <img src={process.env.PUBLIC_URL + "/home.svg"} />
              </SiderItem>

              <SiderItem
                onClick={() => {
                  pushSider((index) => (
                    <AnotherSider index={index} name="App Settings" />
                  ));
                }}
              >
                <img src={process.env.PUBLIC_URL + "/gear.svg"} />
              </SiderItem>
            </Sider>
          </Siders>

          <Layout vertical>
            <Header style={reverse ? { justifyContent: "flex-end" } : {}}>
              {siders.length > 0 || backup.length > 0 ? (
                <MenuButton
                  onClick={() => {
                    if (collapsed) {
                      expand();
                    } else {
                      collapse();
                    }
                  }}
                >
                  <MenuIcon collapsed={reverse ? !collapsed : collapsed} />
                </MenuButton>
              ) : null}
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
                    value={siderIndex}
                    onChange={(e) => {
                      if (e.target.value < siders.length) {
                        setSiderIndex(e.target.value);
                      }
                    }}
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
                    <ControlButton
                      inverted
                      onClick={() => {
                        stackPush(siderIndex, (index) => (
                          <AnotherSider index={index} name={"Random name"} />
                        ));
                      }}
                    >
                      Push on sidebar {siderIndex}
                    </ControlButton>
                    <ControlButton
                      inverted
                      onClick={() => {
                        stackPop(siderIndex);
                      }}
                    >
                      Pop on sidebar {siderIndex}
                    </ControlButton>
                  </Flex>

                  <span
                    style={{
                      textTransform: "uppercase",
                      fontWeight: "bold",
                      color: "rgb(66, 82, 110)",
                    }}
                  >
                    sidebar {siderIndex} stack size{" "}
                    {siders[siderIndex] ? siders[siderIndex].length : 0}
                  </span>
                </Flex>

                <Flex
                  dashed
                  padding={20}
                  width={400}
                  style={{ marginTop: 10 }}
                  justifyContent="space-between"
                >
                  <ControlButton
                    inverted
                    onClick={() => {
                      if (lastName == "") {
                        pushSider((index) => (
                          <AnotherSider
                            index={index}
                            name={"Company Settings"}
                          />
                        ));
                        lastName = "Company Settings";

                        return;
                      }

                      if (lastName == "Company Settings") {
                        pushSider((index) => (
                          <AnotherSider index={index} name={"App Settings"} />
                        ));
                        lastName = "App Settings";

                        return;
                      }

                      if (lastName == "App Settings") {
                        pushSider((index) => (
                          <AnotherSider
                            index={index}
                            name={"Company Settings"}
                          />
                        ));
                        lastName = "Company Settings";

                        return;
                      }
                    }}
                  >
                    Add sidebar
                  </ControlButton>

                  <ControlButton inverted>Add drawer</ControlButton>

                  <ControlButton
                    inverted
                    onClick={() => {
                      popSider();
                    }}
                  >
                    Pop
                  </ControlButton>

                  <ControlButton
                    inverted
                    onClick={() => {
                      popSider(0);
                    }}
                  >
                    Pop all
                  </ControlButton>

                  <ControlButton
                    inverted
                    onClick={() => {
                      setReverse((value) => !value);
                    }}
                  >
                    Reverse
                  </ControlButton>
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

const AnotherSider = ({ name, index }) => {
  const popSider = usePopSider();
  return (
    <Sider width={250} borderLeft={0} resizeable>
      <SiderTop padding={12}>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <p>{name}</p>
          <CloseBtn
            onClick={() => {
              popSider(index);
            }}
          >
            <img src={process.env.PUBLIC_URL + "/cross.svg"} />
          </CloseBtn>
        </div>
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

const CloseBtn = styled.div`
  border: none;
  outline: 0px;
  user-select: none;
  margin-left: auto;
  padding: 0px;
  font-family: inherit;
  font-size: 11px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  border-radius: 2px;
  color: rgb(171, 171, 171);
  box-sizing: border-box;
  box-shadow: none;
  align-self: center;
  width: 24px;
  cursor: pointer;
  background: transparent;
  &:hover {
    background: rgba(0, 0, 0, 0.04);
  }
`;
