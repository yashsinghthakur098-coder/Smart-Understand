import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { useUserStore } from '@/stores/userStore';

export default function Index() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [redirectPath, setRedirectPath] = useState('/welcome');

  const { selectedClass, selectedStream, isProfileComplete } = useUserStore();

  useEffect(() => {
    // Check if user data exists after hydration
    const unsubscribe = useUserStore.subscribe((state) => {
      setIsHydrated(true);
      
      if (state.isProfileComplete) {
        setRedirectPath('/(tabs)');
      } else if (state.selectedClass) {
        if ((state.selectedClass === '11' || state.selectedClass === '12') && !state.selectedStream) {
          setRedirectPath('/(auth)/stream-selection');
        } else if (!state.selectedStream) {
          setRedirectPath('/(auth)/class-selection');
        } else {
          setRedirectPath('/(tabs)');
        }
      }
    });

    // Initial check
    setTimeout(() => {
      if (isProfileComplete) {
        setRedirectPath('/(tabs)');
      }
    }, 100);

    return unsubscribe;
  }, [selectedClass, selectedStream, isProfileComplete]);

  return <Redirect href={redirectPath} />;
}
