import React from "react";
import PropTypes from "prop-types";

import { Container } from "./styles";
import useControls from "../../hooks";

const SiderItem = ({ id, active, link, children, onClick }) => {
  const { backup, setBackup, popSider, setLinks, links } = useControls();
  return (
    <Container
      id={id}
      active={active}
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
    >
      {children}
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
