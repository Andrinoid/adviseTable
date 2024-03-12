import React from 'react';
import { register } from 'swiper/element/bundle';
import useLayout from '../../hooks/useLayout';
import 'swiper/css';

register();

const Siders = ({ children }) => {
  let { siders, mobile } = useLayout();

  const Swiper = mobile
    ? ({ children }) => <swiper-container>{children}</swiper-container>
    : React.Fragment;

  const SwiperSlide = mobile
    ? ({ children }) => <swiper-slide>{children}</swiper-slide>
    : React.Fragment;

  return (
    <>
      {children}

      <div style={mobile ? { height: '100%', width: '100%' } : {}}>
        <Swiper>
          {siders.map((sider, siderIndex) => {
            let current = null;

            if (sider instanceof Function) {
              current = sider(siderIndex);
            } else {
              current = sider;
            }

            return (
              <SwiperSlide>
                <div
                  style={{
                    height: '100vh',
                    zIndex: 9,
                  }}
                >
                  {current}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default Siders;
