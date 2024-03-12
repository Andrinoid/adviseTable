import { register } from 'swiper/element/bundle';

import Layout from './components/Layout';
import Sider from './components/Sider';
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';
import Siders from './components/Siders';
import Drawer from './components/Drawer';
import useControls from './hooks';

register();

export default {
  Layout,
  Sider,
  Header,
  Content,
  Footer,
  Siders,
  Drawer,
  useControls,
};
