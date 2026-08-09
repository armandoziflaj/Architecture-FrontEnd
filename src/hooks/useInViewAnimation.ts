import { useInView } from 'react-intersection-observer';

interface UseInViewAnimationOptions {
  triggerOnce?: boolean;
  threshold?: number;
}

export const useInViewAnimation = (options: UseInViewAnimationOptions = {}) => {
  const { triggerOnce = true, threshold = 0.1 } = options;

  const { ref, inView } = useInView({
    triggerOnce,
    threshold,
  });

  return { ref, inView };
};
