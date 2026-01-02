import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '@/constants/theme';
import { ButtonType } from '@/constants/calculatorConfig';

interface Props {
  label: string;
  onPress: () => void;
  type: ButtonType;
  gridSpan?: number;
}

const CalculatorButton: React.FC<Props> = ({ label, onPress, type, gridSpan = 1 }) => {
  const animatedValue = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(animatedValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animatedValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
    onPress();
  };

  const getButtonStyle = () => {
    switch (type) {
      case 'number':
        return styles.numberButton;
      case 'operator':
        return styles.operatorButton;
      case 'function':
        return styles.functionButton;
      case 'action':
        return styles.actionButton;
      default:
        return styles.numberButton;
    }
  };

  const getTextStyle = () => {
    switch (type) {
      case 'operator':
        return styles.operatorText;
      case 'action':
        return styles.actionText;
      default:
        return styles.buttonText;
    }
  };

  return (
    <Animated.View 
      style={[
        styles.container, 
        { flex: gridSpan, transform: [{ scale: animatedValue }] }
      ]}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.button, getButtonStyle()]}
      >
        <Text style={[styles.buttonText, getTextStyle()]}>{label}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: Spacing.xs,
    height: 64,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BorderRadius.lg,
    ...Shadows.sm,
  },
  numberButton: {
    backgroundColor: Colors.lightSand,
  },
  operatorButton: {
    backgroundColor: Colors.primary,
  },
  functionButton: {
    backgroundColor: Colors.background,
  },
  actionButton: {
    backgroundColor: 'rgba(44, 44, 44, 0.1)',
  },
  buttonText: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.text,
  },
  operatorText: {
    color: Colors.white,
  },
  actionText: {
    color: Colors.text,
    fontSize: Typography.sizes.lg,
  },
});

export default CalculatorButton;
