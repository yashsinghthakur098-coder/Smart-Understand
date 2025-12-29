import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { useUserStore } from '@/stores/userStore';

export function useAuthRedirect() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState<string | null>(null);

  const { selectedClass, selectedStream, isProfileComplete } = useUserStore();

  useEffect(() => {
    // Wait for Zustand hydration to complete
    const unsubscribe = useUserStore.subscribe((state) => {
      if (state.isHydrated) {
        setIsReady(true);
        
        if (state.isProfileComplete) {
          setShouldRedirect('/(tabs)');
        } else if (state.selectedClass) {
          if ((state.selectedClass === '11' || state.selectedClass === '12') && !state.selectedStream) {
            setShouldRedirect('/(auth)/stream-selection');
          } else {
            setShouldRedirect('/(auth)/class-selection');
          }
        }
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (isReady && shouldRedirect) {
      router.replace(shouldRedirect);
    }
  }, [isReady, shouldRedirect, router]);

  return { isReady };
}