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
        // This function checks the scroll position and updates the context accordingly
        const updateScrollY = () => {
            // Check if the ref is currently being scrolled
            const isScrolled = ref.current.scrollTop > 0;
            setIsContentScrolled(isScrolled);
        };

        // Set up the event listener to call updateScrollY when the container is scrolled
        const handleScroll = () => {
            updateScrollY();
        };

        // Assuming the ref is attached to a scrollable element,
        // we need to add the event listener to the ref's current element
        const container = ref.current;
        container.addEventListener("scroll", handleScroll);

        // Remove the event listener on cleanup
        return () => container.removeEventListener("scroll", handleScroll);
    }, [setIsContentScrolled]);

    return (
        <Container width={width} ref={ref}>
            {children}
        </Container>
    );
};

export default Content;
