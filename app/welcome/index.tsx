import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import WelcomeSlide from '@/components/welcome/WelcomeSlide';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '@/constants/theme';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: 1,
    title: 'Learn Faster, Not Harder',
    subtitle: 'Master concepts with bite-sized Concept Cards, not long videos',
    animation: require('@/assets/animations/rocket.json'),
  },
  {
    id: 2,
    title: 'Meet Smarty, Your Study Buddy',
    subtitle: "Get instant help whenever you're stuck, like talking to a friend",
    animation: require('@/assets/animations/robot.json'),
  },
  {
    id: 3,
    title: 'Excel in Every Subject',
    subtitle: 'From Class 1 to 12+, master every topic with confidence',
    animation: require('@/assets/animations/trophy.json'),
  },
];

export default function WelcomeScreen() {
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setCurrentIndex(index);
  };

  const scrollToNext = () => {
    if (currentIndex < slides.length - 1) {
      scrollViewRef.current?.scrollTo({
        x: width * (currentIndex + 1),
        animated: true,
      });
    }
  };

  const handleSkip = () => {
    router.replace('/auth');
  };

  const handleGetStarted = () => {
    router.replace('/auth');
  };

  const isLastSlide = currentIndex === slides.length - 1;

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {slides.map((slide) => (
          <WelcomeSlide
            key={slide.id}
            title={slide.title}
            subtitle={slide.subtitle}
            animationSource={slide.animation}
          />
        ))}
      </ScrollView>

      {/* Pagination Dots */}
      <View style={styles.paginationContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === currentIndex ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        {!isLastSlide ? (
          <>
            <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={scrollToNext} style={styles.nextButton}>
              <Text style={styles.nextText}>Next</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity onPress={handleGetStarted} style={styles.getStartedButton}>
            <Text style={styles.getStartedText}>Get Started</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: Colors.primary,
    width: 24,
  },
  inactiveDot: {
    backgroundColor: Colors.textOpacity(0.2),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    paddingBottom: Platform.OS === 'ios' ? Spacing.xl + 20 : Spacing.xl,
  },
  skipButton: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  skipText: {
    fontSize: Typography.sizes.base,
    color: Colors.textOpacity(0.6),
    fontWeight: Typography.weights.medium,
  },
  nextButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.lg,
    ...Shadows.sm,
  },
  nextText: {
    fontSize: Typography.sizes.base,
    color: Colors.white,
    fontWeight: Typography.weights.semibold,
  },
  getStartedButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md + 4,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    ...Shadows.md,
  },
  getStartedText: {
    fontSize: Typography.sizes.lg,
    color: Colors.white,
    fontWeight: Typography.weights.bold,
  },
});
