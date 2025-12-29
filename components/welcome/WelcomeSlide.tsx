import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/theme';

const { width, height } = Dimensions.get('window');

interface WelcomeSlideProps {
  title: string;
  subtitle: string;
  animationSource: any;
}

export default function WelcomeSlide({ title, subtitle, animationSource }: WelcomeSlideProps) {
  return (
    <View style={styles.container}>
      <View style={styles.animationContainer}>
        <LottieView
          source={animationSource}
          autoPlay
          loop
          style={styles.animation}
        />
      </View>
      
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height: height * 0.85,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  animationContainer: {
    width: width * 0.7,
    height: height * 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
  },
  animation: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
  },
  title: {
    fontSize: Typography.sizes['3xl'],
    fontWeight: Typography.weights.bold,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.md,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.regular,
    color: Colors.textOpacity(0.7),
    textAlign: 'center',
    lineHeight: Typography.sizes.lg * 1.5,
    maxWidth: width * 0.8,
  },
});
