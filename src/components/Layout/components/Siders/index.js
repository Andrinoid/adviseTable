import React from 'react';
import { register } from 'swiper/element/bundle';
import useLayout from '../../hooks/useLayout';
import 'swiper/css';

register();

const Siders = ({ children }) => {
  let { siders, mobile } = useLayout();

  return (
    <>
      {children}

      <div
        style={{
          height: mobile ? '100%' : 'initial',
          width: mobile ? '100%' : 'initial',
        }}
      >
        <swiper-container>
          {siders.map((sider, siderIndex) => {
            let current = null;

            if (sider instanceof Function) {
              current = sider(siderIndex);
            } else {
              current = sider;
            }

            return (
              <swiper-slide>
                <div>{current}</div>
              </swiper-slide>
            );
          })}
        </swiper-container>
      </div>
    </>
  );
};

export default Siders;
