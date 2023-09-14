import React, { useState } from "react";
import styled from "styled-components";
import Example from "./Example";
import { Layout, theme, Radio, Typography, Switch, Button, Slider } from "antd";
const { Header, Sider, Content } = Layout;
const { Text, Title } = Typography;

const Panel = styled.div`
  background: #fff;
  padding: 10px;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Hr = styled.hr`
  border: 0;
  height: 1px;
  background: #333;
  background-image: linear-gradient(to right, #ccc, #333, #ccc);
  opacity: 0.4;
`;

const App = () => {
  const [tableTheme, setTableTheme] = useState("light");
  const [draggable, setDraggable] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [printMode, setPrintMode] = useState(false);
  const [selectionMode, setSelectionMode] = useState("cell");
  const [footerVissible, setFooterVissible] = useState(true);
  const [headerOffset, setHeaderOffset] = useState(0);
  const [allowEdition, setAllowEdition] = useState(false);
  const {
      token: { colorBgContainer },
  } = theme.useToken();

  const onThemeChange = ({ target: { value } }) => {
      setTableTheme(value);
  };

  const onSelectionModeChange = ({ target: { value } }) => {
      setSelectionMode(value);
  };

  return (
      <Layout hasSider>
          <Sider
              trigger={null}
              theme="light"
              style={{
                  overflow: "auto",
                  height: "100vh",
                  position: "fixed",
                  left: 0,
                  top: 0,
                  bottom: 0,
              }}
          >
              <div style={{ padding: 20 }}>
                  <img
                      src="https://bm.advise.is/static/media/logo.7afe098a.svg"
                      width={"100%"}
                  />
              </div>
              <Hr />
              <Panel>
                  <div style={{ marginBottom: 5 }}>
                      <Text type="secondary">Theme</Text>
                  </div>
                  <Radio.Group
                      block
                      options={["light", "dark"]}
                      onChange={onThemeChange}
                      value={tableTheme}
                      optionType="button"
                  />
              </Panel>
              <Hr />
              <Panel>
                  <div style={{ marginBottom: 5 }}>
                      <Text type="secondary">Allow Edition</Text>
                  </div>
                  <Switch
                      checked={allowEdition}
                      onChange={(checked) => setAllowEdition(checked)}
                  />
              </Panel>
              <Hr />
              <Panel>
                  <div style={{ marginBottom: 5 }}>
                      <Text type="secondary">Draggable</Text>
                  </div>
                  <Switch
                      checked={draggable}
                      onChange={(checked) => setDraggable(checked)}
                  />
              </Panel>
              <Hr />
              <Panel>
                  <div style={{ marginBottom: 5 }}>
                      <Text type="secondary">Show grid</Text>
                  </div>
                  <Switch
                      checked={showGrid}
                      onChange={(checked) => setShowGrid(checked)}
                  />
              </Panel>
              <Hr />
              <Panel>
                  <div style={{ marginBottom: 5 }}>
                      <Text type="secondary">Show as print layout</Text>
                  </div>
                  <Switch
                      checked={printMode}
                      onChange={(checked) => setPrintMode(checked)}
                  />
              </Panel>
              <Hr />
              <Panel>
                  <div style={{ marginBottom: 5 }}>
                      <Text type="secondary">Selection Mode</Text>
                  </div>
                  <Radio.Group
                      block
                      options={["row", "cell"]}
                      onChange={onSelectionModeChange}
                      value={selectionMode}
                      optionType="button"
                  />
              </Panel>
              <Hr />
              <Panel>
                  <div style={{ marginBottom: 5 }}>
                      <Text type="secondary">Footer</Text>
                  </div>
                  <Flex>
                      <Text type="secondary">Has footer</Text>
                      <Switch
                          checked={footerVissible}
                          onChange={(checked) => setFooterVissible(checked)}
                      />
                  </Flex>
              </Panel>
              <Hr />
              <Panel>
                  <div style={{ marginBottom: 5 }}>
                      <Text type="secondary">Header top offset</Text>
                  </div>

                  <Slider
                      defaultValue={0}
                      onChange={(value) => {
                          setHeaderOffset(value);
                      }}
                  />
                  <Text type="secondary">
                      Use e.g if the page has fixed header
                  </Text>
              </Panel>
          </Sider>
          <Layout
              className="site-layout"
              style={{
                  marginLeft: 200,
              }}
          >
              <Header
                  style={{
                      padding: 0,
                      paddingLeft: 20,
                      background: colorBgContainer,
                  }}
              >
                  <Title level={3}>Giga table</Title>
              </Header>
              <Content
                  style={{
                      margin: "24px 16px",
                      padding: 24,
                      minHeight: 280,
                      background: colorBgContainer,
                  }}
              >
                  <Example
                      theme={tableTheme}
                      draggable={draggable}
                      showGrid={showGrid}
                      selectionMode={selectionMode}
                      footerVissible={footerVissible}
                      headerOffset={headerOffset}
                      allowEdition={allowEdition}
                      printMode={printMode}
                  />
              </Content>
          </Layout>
      </Layout>
  );
};
export default App;
