import { useViewportSize } from '@mantine/hooks';

export default function useSmallScreen() {
  const { width } = useViewportSize();

  return width < 600 && width > 0;
}
