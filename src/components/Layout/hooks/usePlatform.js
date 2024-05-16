import { useOs } from '@mantine/hooks';

const usePlatform = () => {
  const os = useOs();
  return os === 'ios' || os === 'android' ? 'mobile' : 'web';
};

export default usePlatform;
