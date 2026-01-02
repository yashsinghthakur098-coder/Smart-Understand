import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
} from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '@/constants/theme';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

interface CalculatorState {
  display: string;
  previousValue: string | null;
  operation: string | null;
  shouldResetDisplay: boolean;
}

export default function CalculatorScreen() {
  const [state, setState] = useState<CalculatorState>({
    display: '0',
    previousValue: null,
    operation: null,
    shouldResetDisplay: false,
  });

  const handleNumberPress = (num: string) => {
    setState((prev) => {
      if (prev.shouldResetDisplay) {
        return {
          ...prev,
          display: num,
          shouldResetDisplay: false,
        };
      }

      if (prev.display === '0' && num !== '.') {
        return { ...prev, display: num };
      }

      if (prev.display.includes('.') && num === '.') {
        return prev;
      }

      if (prev.display.length >= 12) {
        return prev;
      }

      return {
        ...prev,
        display: prev.display + num,
      };
    });
  };

  const handleOperationPress = (op: string) => {
    setState((prev) => {
      if (prev.operation !== null && !prev.shouldResetDisplay) {
        const result = calculate(
          parseFloat(prev.previousValue || '0'),
          parseFloat(prev.display),
          prev.operation
        );
        return {
          display: String(result),
          previousValue: String(result),
          operation: op,
          shouldResetDisplay: true,
        };
      }

      return {
        ...prev,
        previousValue: prev.display,
        operation: op,
        shouldResetDisplay: true,
      };
    });
  };

  const handleEqualsPress = () => {
    setState((prev) => {
      if (prev.previousValue === null || prev.operation === null) {
        return prev;
      }

      const result = calculate(
        parseFloat(prev.previousValue),
        parseFloat(prev.display),
        prev.operation
      );

      return {
        display: String(result),
        previousValue: null,
        operation: null,
        shouldResetDisplay: true,
      };
    });
  };

  const handleClearPress = () => {
    setState({
      display: '0',
      previousValue: null,
      operation: null,
      shouldResetDisplay: false,
    });
  };

  const handleDeletePress = () => {
    setState((prev) => {
      if (prev.display.length === 1 || (prev.display.length === 2 && prev.display.startsWith('-'))) {
        return { ...prev, display: '0' };
      }

      return {
        ...prev,
        display: prev.display.slice(0, -1),
      };
    });
  };

  const handlePercentPress = () => {
    setState((prev) => {
      const value = parseFloat(prev.display);
      return {
        ...prev,
        display: String(value / 100),
      };
    });
  };

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '×':
        return a * b;
      case '÷':
        return b !== 0 ? a / b : 0;
      default:
        return b;
    }
  };

  const formatDisplay = (value: string): string => {
    const num = parseFloat(value);
    if (isNaN(num)) return '0';
    
    if (value.includes('.')) {
      return value;
    }
    
    if (value.length > 9) {
      return num.toExponential(5);
    }
    
    return value;
  };

  const getOperationDisplay = (): string => {
    if (state.operation && state.previousValue) {
      return `${state.previousValue} ${state.operation}`;
    }
    return '';
  };

  return (
    <View style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.operationText}>{getOperationDisplay()}</Text>
        <Text style={styles.displayText} numberOfLines={1}>
          {formatDisplay(state.display)}
        </Text>
      </View>

      <View style={styles.buttonGrid}>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.functionButton]}
            onPress={handleClearPress}
            activeOpacity={0.7}
          >
            <Text style={[styles.buttonText, styles.functionButtonText]}>C</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.functionButton]}
            onPress={handleDeletePress}
            activeOpacity={0.7}
          >
            <Text style={[styles.buttonText, styles.functionButtonText]}>⌫</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.functionButton]}
            onPress={handlePercentPress}
            activeOpacity={0.7}
          >
            <Text style={[styles.buttonText, styles.functionButtonText]}>%</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.operationButton]}
            onPress={() => handleOperationPress('÷')}
            activeOpacity={0.7}
          >
            <Text style={[styles.buttonText, styles.operationButtonText]}>÷</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.numberButton]}
            onPress={() => handleNumberPress('7')}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>7</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.numberButton]}
            onPress={() => handleNumberPress('8')}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>8</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.numberButton]}
            onPress={() => handleNumberPress('9')}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>9</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.operationButton]}
            onPress={() => handleOperationPress('×')}
            activeOpacity={0.7}
          >
            <Text style={[styles.buttonText, styles.operationButtonText]}>×</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.numberButton]}
            onPress={() => handleNumberPress('4')}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>4</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.numberButton]}
            onPress={() => handleNumberPress('5')}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>5</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.numberButton]}
            onPress={() => handleNumberPress('6')}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>6</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.operationButton]}
            onPress={() => handleOperationPress('-')}
            activeOpacity={0.7}
          >
            <Text style={[styles.buttonText, styles.operationButtonText]}>−</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.numberButton]}
            onPress={() => handleNumberPress('1')}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>1</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.numberButton]}
            onPress={() => handleNumberPress('2')}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>2</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.numberButton]}
            onPress={() => handleNumberPress('3')}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>3</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.operationButton]}
            onPress={() => handleOperationPress('+')}
            activeOpacity={0.7}
          >
            <Text style={[styles.buttonText, styles.operationButtonText]}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.numberButton, styles.zeroButton]}
            onPress={() => handleNumberPress('0')}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>0</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.numberButton]}
            onPress={() => handleNumberPress('.')}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>.</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.equalsButton]}
            onPress={handleEqualsPress}
            activeOpacity={0.7}
          >
            <Text style={[styles.buttonText, styles.equalsButtonText]}>=</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.lg,
    justifyContent: 'flex-end',
    ...(isWeb && {
      maxWidth: 500,
      alignSelf: 'center',
      width: '100%',
    }),
  },
  displayContainer: {
    backgroundColor: Colors.lightSand,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    marginBottom: Spacing.lg,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    minHeight: 140,
    ...Shadows.md,
  },
  operationText: {
    fontSize: Typography.sizes.lg,
    color: Colors.textOpacity(0.6),
    marginBottom: Spacing.sm,
    minHeight: 24,
  },
  displayText: {
    fontSize: Typography.sizes['4xl'],
    fontWeight: Typography.weights.bold,
    color: Colors.text,
    letterSpacing: -1,
  },
  buttonGrid: {
    gap: Spacing.sm,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  button: {
    height: isWeb ? 72 : 64,
    borderRadius: BorderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.sm,
    flex: 1,
  },
  numberButton: {
    backgroundColor: Colors.white,
  },
  operationButton: {
    backgroundColor: Colors.primary,
  },
  functionButton: {
    backgroundColor: Colors.lightSand,
  },
  equalsButton: {
    backgroundColor: Colors.primary,
  },
  zeroButton: {
    flex: 2,
  },
  buttonText: {
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.semibold,
    color: Colors.text,
  },
  operationButtonText: {
    color: Colors.white,
    fontSize: Typography.sizes['3xl'],
  },
  functionButtonText: {
    color: Colors.primary,
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
  },
  equalsButtonText: {
    color: Colors.white,
    fontSize: Typography.sizes['3xl'],
  },
});
