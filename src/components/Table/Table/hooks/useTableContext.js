import React, {useContext} from "react";
import { TableContext } from "../../TableContext";

const useTableContext = () => {
  return useContext(TableContext);
};

export default useTableContext;