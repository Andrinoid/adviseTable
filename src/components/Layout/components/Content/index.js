import React, { useEffect, useRef } from "react";
import { Container } from "./styles";
import useLayout from "../../hooks/useLayout";

const Content = ({ children }) => {
    const { width } = useLayout();
    const ref = useRef(null);
    const { isContentScrolled, setIsContentScrolled } = useLayout();

    useEffect(() => {
        console.log(isContentScrolled);
    }, [isContentScrolled]);

    useEffect(() => {
        const updateScrollY = () => {
            const isScrolled = ref.current.scrollTop > 0;
            setIsContentScrolled(isScrolled);
        };

        const handleScroll = () => {
            updateScrollY();
        };

        const container = ref.current;
        container.addEventListener("scroll", handleScroll);

        return () => container.removeEventListener("scroll", handleScroll);
    }, [setIsContentScrolled]);

    return (
        <Container width={width} ref={ref}>
            {children}
        </Container>
    );
};

export default Content;
