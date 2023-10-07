import React from "react";
import useLayout from "./useLayout";
import produce from "immer";

const usePopSider = () => {
  const [siders, setSiders] = useLayout();

  return (index) => {
    setSiders(
      produce(siders, (draft) => {
        if (!index && typeof index != "number") {
          draft.pop();
        } else {
          if (Array.isArray(draft)) {
            draft = draft.slice(0, index);
          }
        }

        return draft;
      })
    );
  };
};

export default usePopSider;
