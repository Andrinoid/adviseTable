import React, { useRef } from 'react';
import { Table, Row, Col, TableProvider, TableScrollbarX } from './components';
import styled from 'styled-components';
import { HolderOutlined, PlusOutlined } from '@ant-design/icons';

const leftBrickWidth = 55;

const BrickToolWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  width: 100%;
`;
const BrickToolItem = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const BrickTools = () => {
  return (
    <BrickToolWrapper>
      <BrickToolItem>
        <HolderOutlined style={{ transform: 'rotate(90deg)' }} />
      </BrickToolItem>
      <BrickToolItem>
        <PlusOutlined style={{ fontSize: 13 }} />
      </BrickToolItem>
    </BrickToolWrapper>
  );
};

function ExampleSimple() {
  return (
    <TableProvider>
      <div style={{ height: '500px', background: 'gray' }}>
        {/* <div style={{ background: "gray", paddingTop: 50 }}></div> */}
        <Table
          width={1000}
          stickyTopOffset={50}
          theme={'light'}
          showGrid={true}
          // headerColor={{ background: 'white', text: 'white' }}
          selectionMode={'cell'}
          isScrollOnEdges={true}
          tableId={'simpeTable'}
          // hideScrollbarX={true}
          leftBrickWidth={leftBrickWidth}
          headerData={[
            { title: 'A' },
            { title: 'B' },
            { title: 'C' },
            { title: 'D' },
            { title: 'E' },
            { title: 'F' },
            { title: 'G' },
            { title: 'H' },
            { title: 'I' },
            { title: 'J' },
            { title: 'K' },
            { title: 'L' },
            { title: 'M' },
          ]}
        >
          {(tableProvided) => {
            return (
              <>
                <Row
                  style={{ minHeight: 40 }}
                  {...tableProvided.rowProps}
                  leftBrickContent={<BrickTools />}
                >
                  <Col allowEdition>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                </Row>
                <Row
                  type="secondary"
                  style={{ minHeight: 40 }}
                  {...tableProvided.rowProps}
                >
                  <Col>834567</Col>
                  <Col>834567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                </Row>
                <Row style={{ minHeight: 40 }} {...tableProvided.rowProps}>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                </Row>
                <Row style={{ minHeight: 40 }} {...tableProvided.rowProps}>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                </Row>
                <Row style={{ minHeight: 40 }} {...tableProvided.rowProps}>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                </Row>
                <Row style={{ minHeight: 40 }} {...tableProvided.rowProps}>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                </Row>
                <Row style={{ minHeight: 40 }} {...tableProvided.rowProps}>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                </Row>
                <Row style={{ minHeight: 40 }} {...tableProvided.rowProps}>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                </Row>
                <Row style={{ minHeight: 40 }} {...tableProvided.rowProps}>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                </Row>
                <Row style={{ minHeight: 40 }} {...tableProvided.rowProps}>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                </Row>
                <Row style={{ minHeight: 40 }} {...tableProvided.rowProps}>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                </Row>
                <Row style={{ minHeight: 40 }} {...tableProvided.rowProps}>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                </Row>
                <Row style={{ minHeight: 40 }} {...tableProvided.rowProps}>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                </Row>
                <Row style={{ minHeight: 40 }} {...tableProvided.rowProps}>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                </Row>
                <Row style={{ minHeight: 40 }} {...tableProvided.rowProps}>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                </Row>
                <Row style={{ minHeight: 40 }} {...tableProvided.rowProps}>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                </Row>
                <Row style={{ minHeight: 40 }} {...tableProvided.rowProps}>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                </Row>
                <Row style={{ minHeight: 40 }} {...tableProvided.rowProps}>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                </Row>
                <Row style={{ minHeight: 40 }} {...tableProvided.rowProps}>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                </Row>
                <Row style={{ minHeight: 40 }} {...tableProvided.rowProps}>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                </Row>
                <Row style={{ minHeight: 40 }} {...tableProvided.rowProps}>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                </Row>
                <Row style={{ minHeight: 40 }} {...tableProvided.rowProps}>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                </Row>
                <Row style={{ minHeight: 40 }} {...tableProvided.rowProps}>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                </Row>
                <Row style={{ minHeight: 40 }} {...tableProvided.rowProps}>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                </Row>
                <Row style={{ minHeight: 40 }} {...tableProvided.rowProps}>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                </Row>
                <Row style={{ minHeight: 40 }} {...tableProvided.rowProps}>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                </Row>
                <Row style={{ minHeight: 40 }} {...tableProvided.rowProps}>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                </Row>
                <Row style={{ minHeight: 40 }} {...tableProvided.rowProps}>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                </Row>
                <Row style={{ minHeight: 40 }} {...tableProvided.rowProps}>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                </Row>
                <Row style={{ minHeight: 40 }} {...tableProvided.rowProps}>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                </Row>
                <Row style={{ minHeight: 40 }} {...tableProvided.rowProps}>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                </Row>
                <Row style={{ minHeight: 40 }} {...tableProvided.rowProps}>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                </Row>
                <Row style={{ minHeight: 40 }} {...tableProvided.rowProps}>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                </Row>
                <Row style={{ minHeight: 40 }} {...tableProvided.rowProps}>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                </Row>
                <Row style={{ minHeight: 40 }} {...tableProvided.rowProps}>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                </Row>
                <Row style={{ minHeight: 40 }} {...tableProvided.rowProps}>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                </Row>
                <Row style={{ minHeight: 40 }} {...tableProvided.rowProps}>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                </Row>
                <Row style={{ minHeight: 40 }} {...tableProvided.rowProps}>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                </Row>
                <Row style={{ minHeight: 40 }} {...tableProvided.rowProps}>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                </Row>
                <Row style={{ minHeight: 40 }} {...tableProvided.rowProps}>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                </Row>
                <Row style={{ minHeight: 40 }} {...tableProvided.rowProps}>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                  <Col>234567</Col>
                </Row>
              </>
            );
          }}
        </Table>
        <TableScrollbarX
          style={{ position: 'fixed', bottom: 0, zIndex: 100 }}
          tableId={'simpeTable'}
        />
      </div>
      <div
        style={{
          height: 500,
          background: 'gray',
        }}
      ></div>
    </TableProvider>
  );
}

export default ExampleSimple;
