import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import useLayout from '../../hooks/useLayout';
import 'swiper/css';

const Siders = ({ children }) => {
  let { siders, mobile } = useLayout();

  const SwiperDecorator = mobile ? Swiper : React.Fragment;

  const SwiperSlideDecorator = mobile ? SwiperSlide : React.Fragment;

  const Container =
    mobile && siders.length >= 1
      ? ({ children }) => (
          <div
            style={{
              height: '100%',
              width: '100%',
              position: 'relative',
              display: 'flex',
            }}
          >
            {children}
          </div>
        )
      : React.Fragment;

  return (
    <>
      {children}

      <Container>
        <SwiperDecorator>
          {siders.map((sider, siderIndex) => {
            let current = null;

            if (sider instanceof Function) {
              current = sider(siderIndex);
            } else {
              current = sider;
            }

            return (
              <SwiperSlideDecorator>
                <div
                  style={{
                    height: '100vh',
                    zIndex: 9,
                  }}
                >
                  {current}
                </div>
              </SwiperSlideDecorator>
            );
          })}
        </SwiperDecorator>
      </Container>
    </>
  );
};

export default Siders;
