import React from "react";
import styled from "styled-components";

const TableFooter = styled.div`
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    width: 100%;
    height: 30px;
    background: #f5f5f5;

    padding: 0 10px;
    box-sizing: border-box;
    color: #333;
    font-size: 13px;
`;

const Left = styled.div`
    display: inline-flex;
`;
const Middle = styled.div`
    display: inline-flex;
`;
const Right = styled.div`
    display: inline-flex;
`;


const Box = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
    padding: 0 5px;
    span {
        font-weight: bold;
        margin-left: 5px;
    }
}`;

const Footer = ({ count, sum, min, max, avg }) => {

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    return (
        <TableFooter>
            <Left>

            </Left>
            <Middle></Middle>
            <Right>
                {count > 1 && <>
                    <Box>count: <span>{count}</span></Box>
                    {!isNaN(min) &&
                    <Box>min: <span>{numberWithCommas(min)}</span></Box>
                    }
                    {!isNaN(max) &&
                        <Box>max: <span>{numberWithCommas(max)}</span></Box>
                    }
                    {!isNaN(avg) &&
                    <Box>avg: <span>{numberWithCommas(avg)}</span></Box>
                    }
                    {!isNaN(sum) &&
                    <Box>sum: <span>{numberWithCommas(sum)}</span></Box>
                    }
                </>
                }
            </Right>
        </TableFooter>
    );
}

export default Footer;