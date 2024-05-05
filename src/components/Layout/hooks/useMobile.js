import { useViewportSize } from '@mantine/hooks';

export default function useMobile() {
  const { width } = useViewportSize();

  return width < 600;
}
