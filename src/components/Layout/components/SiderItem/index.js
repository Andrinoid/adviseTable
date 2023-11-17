import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { Container, SmallTile, Tile, Icon } from "./styles";
import useControls from "../../hooks";

const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
};

const SiderItem = ({
    id,
    active,
    link,
    children,
    onClick,
    icon,
    size,
    shouldAnimateChildren = false,
    outstanding = false,
    ...rest
}) => {
    const { backup, setBackup, popSider, setLinks, links } = useControls();
    return (
        <Container
            id={id}
            onClick={() => {
                if (link) {
                    popSider(0);
                    setLinks([id]);
                } else {
                    if (links.length > 0) {
                        setLinks([]);
                    }
                }
                if (backup.length > 0) {
                    setBackup([]);
                }
                onClick();
            }}
            {...rest}
        >
            {size == "small" ? (
                <SmallTile active={active} outstanding={outstanding}>
                    {icon && <Icon>{icon}</Icon>}
                    {children}
                </SmallTile>
            ) : (
                <Tile active={active}>
                    {icon && <Icon>{icon}</Icon>}
                    {shouldAnimateChildren && (
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeIn}
                        >
                            {children}
                        </motion.div>
                    )}
                    {!shouldAnimateChildren && children}
                </Tile>
            )}
        </Container>
    );
};

SiderItem.propTypes = {
    onClick: PropTypes.func,
    id: PropTypes.oneOf(PropTypes.string, PropTypes.number),
    active: PropTypes.bool,
    link: PropTypes.bool,
};

export default SiderItem;
