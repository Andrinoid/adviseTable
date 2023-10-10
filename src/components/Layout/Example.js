import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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

import Siders from "./components/Siders";
import styled from "styled-components";

import useLayout from "./hooks/useLayout";

import { uniqueId } from "lodash";
import useControls from "./hooks";

var lastName = "";

export default function Example() {
  const [reverse, setReverse] = useState(false);
  const [siderIndex, setSiderIndex] = useState(-1);

  const controls = useControls();

  return (
    <div className="container">
      <Router>
        <Layout vertical>
          <Layout reverse={reverse}>
            <Siders>
              <Sider>
                <SiderTop padding={12}>
                  <Link to={`/`}>
                    <img
                      src={process.env.PUBLIC_URL + "/advise.png"}
                      alt="Logo"
                      style={{
                        width: "100%",
                        height: "auto",
                        maxWidth: 60,
                      }}
                    />
                  </Link>
                </SiderTop>

                <Link to={`/overview`}>
                  <SiderItem
                    onClick={() => {
                      // pushSider((index) => (
                      //   <AnotherSider index={index} name="Company Settings" />
                      // ));
                    }}
                  >
                    <img src={process.env.PUBLIC_URL + "/home.svg"} />
                  </SiderItem>
                </Link>
                <SiderItem
                  onClick={() => {
                    controls.pushSider(
                      (index) => <ManageCompany index={index} />,
                      true
                    );
                  }}
                >
                  <img src={process.env.PUBLIC_URL + "/gear.svg"} />
                </SiderItem>

                <SiderItem
                  onClick={() => {
                    controls.pushSider(
                      (index) => <Monitors index={index} />,
                      true
                    );
                  }}
                >
                  <img src={process.env.PUBLIC_URL + "/telescope.svg"} />
                </SiderItem>

                <Separator />

                <SiderItem
                  onClick={() => {
                    controls.pushSider(
                      (index) => (
                        <Navbar name={"Monitor Settings"} index={index} />
                      ),
                      true
                    );
                  }}
                  style={{ position: "relative" }}
                >
                  <Avatar>
                    <span>M</span>
                  </Avatar>
                </SiderItem>
              </Sider>
            </Siders>

            <Layout vertical>
              <Header style={reverse ? { justifyContent: "flex-end" } : {}}>
                {controls.siders.length > 0 || controls.backup.length > 0 ? (
                  <MenuButton
                    onClick={() => {
                      if (controls.collapsed) {
                        controls.expand();
                      } else {
                        controls.collapse();
                      }
                    }}
                  >
                    <MenuIcon
                      collapsed={
                        reverse ? !controls.collapsed : controls.collapsed
                      }
                    />
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
                        if (e.target.value < controls.siders.length) {
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
                          controls.stackPush(siderIndex, (index) => (
                            <Navbar
                              index={index}
                              name={`Random ${Math.random()}`}
                            />
                          ));
                        }}
                      >
                        Push on sidebar {siderIndex}
                      </ControlButton>
                      <ControlButton
                        inverted
                        onClick={() => {
                          controls.stackPop(siderIndex);
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
                      {controls.siders[siderIndex]
                        ? controls.siders[siderIndex].length
                        : 0}
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
                          controls.pushSider((index) => (
                            <Navbar index={index} name={"Company Settings"} />
                          ));
                          lastName = "Company Settings";

                          return;
                        }

                        if (lastName == "Company Settings") {
                          controls.pushSider((index) => (
                            <Navbar index={index} name={"App Settings"} />
                          ));
                          lastName = "App Settings";

                          return;
                        }

                        if (lastName == "App Settings") {
                          controls.pushSider((index) => (
                            <Navbar index={index} name={"Company Settings"} />
                          ));
                          lastName = "Company Settings";

                          return;
                        }
                      }}
                    >
                      Add sidebar
                    </ControlButton>

                    <ControlButton
                      inverted
                      onClick={() => {
                        controls.pushDrawer(<Drawer name="Drawer Settings" />);
                      }}
                    >
                      Add drawer
                    </ControlButton>

                    <ControlButton
                      inverted
                      onClick={() => {
                        controls.popSider();
                      }}
                    >
                      Pop
                    </ControlButton>

                    <ControlButton
                      inverted
                      onClick={() => {
                        controls.popSider(0);
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

                <Switch>
                  <Route path="/overview">
                    <div>company overview</div>
                  </Route>
                  <Route path="/">
                    <div>initial</div>
                  </Route>
                </Switch>
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
      </Router>
    </div>
  );
}

const Navbar = ({ name, index }) => {
  const controls = useControls();

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
          <b>{name}</b>
          <CloseBtn
            onClick={() => {
              controls.popSider(index);
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

const Monitors = ({ index }) => {
  const controls = useControls();

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
          <b>Monitors</b>
          <CloseBtn
            onClick={() => {
              controls.popSider(index);
            }}
          >
            <img src={process.env.PUBLIC_URL + "/cross.svg"} />
          </CloseBtn>
        </div>
      </SiderTop>

      <SiderItems>
        <SiderItem id="Monitor1">
          <div
            style={{
              height: "auto",
              maxWidth: 60,
              marginRight: 10,
            }}
          >
            <img src={process.env.PUBLIC_URL + "/telescope.svg"} />
          </div>
          <p>Monitor 1</p>
        </SiderItem>

        <SiderItem id="Monitor2">
          <div
            style={{
              height: "auto",
              maxWidth: 60,
              marginRight: 10,
            }}
          >
            <img src={process.env.PUBLIC_URL + "/telescope.svg"} />
          </div>
          <p>Monitor 2</p>
        </SiderItem>

        <SiderItem id="Monitor3">
          <div
            style={{
              height: "auto",
              maxWidth: 60,
              marginRight: 10,
            }}
          >
            <img src={process.env.PUBLIC_URL + "/telescope.svg"} />
          </div>
          <p>Monitor 3</p>
        </SiderItem>

        <SiderItem id="Monitor4">
          <div
            style={{
              height: "auto",
              maxWidth: 60,
              marginRight: 10,
            }}
          >
            <img src={process.env.PUBLIC_URL + "/telescope.svg"} />
          </div>
          <p>Monitor 4</p>
        </SiderItem>
      </SiderItems>
    </Sider>
  );
};

const Drawer = ({ name }) => {
  const controls = useControls();
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <SiderTop padding={12}>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <b>{name}</b>
          <CloseBtn
            onClick={() => {
              controls.popDrawer();
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
    </div>
  );
};

const ManageCompany = ({ index }) => {
  const controls = useControls();

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
          <div>
            <b>Manage company</b>
          </div>
          <CloseBtn
            onClick={() => {
              controls.popSider(index);
            }}
          >
            <img src={process.env.PUBLIC_URL + "/cross.svg"} />
          </CloseBtn>
        </div>
      </SiderTop>

      <SiderItems>
        <SiderItem
          id="CompanyProfile"
          onClick={() => {
            controls.pushDrawer(<Drawer name={"Company Profile"} />);
          }}
        >
          <p>Company Profile</p>
        </SiderItem>

        <SiderItem
          id={"User&Permissions"}
          onClick={() => {
            controls.pushDrawer(<Drawer name={"User & Permissions"} />);
          }}
        >
          <p>User & Permissions</p>
        </SiderItem>

        <SiderItem
          id={"InvitationCenter"}
          onClick={() => {
            controls.pushDrawer(<Drawer name={"Invitation Center"} />);
          }}
        >
          <p>Invitation Center</p>
        </SiderItem>
      </SiderItems>
    </Sider>
  );
};

const Separator = styled.div`
  width: "100%";
  border-bottom: 1px solid rgb(232, 232, 232);
`;

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

const Avatar = styled.div`
  position: absolute;
  background: linear-gradient(
    to left top,
    rgba(0, 0, 255, 0.8),
    rgba(60, 218, 211, 0.5) 80%
  );

  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.25);

  & > span {
    color: white;
    font-weight: bold;
  }
`;

const SiderItems = ({ children, ...rest }) => {
  const [active, setActive] = useState(null);
  const { drawers } = useLayout();

  useEffect(() => {
    if (drawers.length == 0) {
      // setActive(null);
    }
  }, [drawers]);

  return (
    <div {...rest}>
      {React.Children.map(children, (child) => {
        const obj = {
          onClick: () => {
            setActive(child.props.id);
            if (child.props.onClick) {
              child.props.onClick();
            }
          },
          active: child.props.id === active,
        };

        if (!obj.id) {
          obj.id = uniqueId;
        }
        return React.cloneElement(child, obj);
      })}
    </div>
  );
};
