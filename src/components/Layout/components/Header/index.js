import React from "react";
import { Container } from "./styles";
import useLayout from "../../hooks/useLayout";

const Header = ({ children, ...rest }) => {
    const { isContentScrolled } = useLayout();

    return (
        <Container shadow={isContentScrolled} {...rest}>
            {children}
        </Container>
    );
};

export default Header;
