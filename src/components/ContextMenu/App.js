//ContextMenu.js

import React from "react";
import ContextMenu from "./ContextMenu";
import { ContextMenuProvider } from "./ContextMenuProvider";
import ContextMenuContainer from "./ContextMenuContainer";

const App = () => {
  return (
    <ContextMenuProvider>
      <ContextMenuContainer id="menu1" color="lightgray">
        Container 1
        <ContextMenu
          menuId="menu1"
          items={[
            { key: "1", label: "Option 1.1" },
            { key: "2", label: "Option 1.2" },
          ]}
        />
      </ContextMenuContainer>

      <ContextMenuContainer id="menu2" color="lightblue">
        Container 2
        <ContextMenu
          menuId="menu2"
          items={[
            { key: "1", label: "Option 2.1" },
            { key: "2", label: "Option 2.2" },
          ]}
        />
      </ContextMenuContainer>
    </ContextMenuProvider>
  );
};

export default App;
