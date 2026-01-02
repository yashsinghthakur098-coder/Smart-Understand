import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Keyboard, Platform } from 'react-native';
import { Colors, Spacing } from '@/constants/theme';
import CalculatorDisplay from '@/components/calculator/CalculatorDisplay';
import CalculatorKeypad from '@/components/calculator/CalculatorKeypad';
import ScientificFunctions from '@/components/calculator/ScientificFunctions';
import CalculatorHistory from '@/components/calculator/CalculatorHistory';
import { useCalculator } from '@/hooks/useCalculator';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CalculatorScreen() {
  const {
    display,
    expression,
    result,
    isScientific,
    history,
    toggleScientific,
    handleButtonPress,
    clearHistory,
    setExpression,
    setDisplay,
    calculate
  } = useCalculator();

  const [historyVisible, setHistoryVisible] = useState(false);

  // Keyboard support for Web and physical keyboards
  useEffect(() => {
    if (Platform.OS === 'web' || Platform.OS === 'ios' || Platform.OS === 'android') {
      const handleKeyDown = (e: any) => {
        const key = e.key;
        if (/[0-9]/.test(key)) handleButtonPress(key, 'number');
        else if (['+', '-', '*', '/', '%'].includes(key)) handleButtonPress(key, 'operator');
        else if (key === 'Enter') handleButtonPress('=', 'operator');
        else if (key === 'Backspace') handleButtonPress('delete', 'action');
        else if (key === 'Escape') handleButtonPress('clear', 'action');
        else if (key === '.') handleButtonPress('.', 'number');
        else if (key === '(' || key === ')') handleButtonPress(key, 'function');
      };

      if (Platform.OS === 'web') {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
      }
    }
  }, [handleButtonPress]);

  const onHistorySelect = (item: any) => {
    setExpression(item.expression);
    setDisplay(item.result);
    setHistoryVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
           <TouchableOpacity 
            style={styles.historyToggle}
            onPress={() => setHistoryVisible(true)}
          >
            <Ionicons name="time-outline" size={24} color={Colors.text} />
          </TouchableOpacity>
        </View>

        <CalculatorDisplay 
          expression={expression}
          display={display}
          result={result}
        />

        <ScientificFunctions 
          isExpanded={isScientific}
          onToggle={toggleScientific}
          onButtonPress={handleButtonPress}
        />

        <View style={styles.keypadContainer}>
          <CalculatorKeypad onButtonPress={handleButtonPress} />
        </View>
      </View>

      <CalculatorHistory 
        visible={historyVisible}
        onClose={() => setHistoryVisible(false)}
        history={history}
        onClear={clearHistory}
        onSelect={onHistorySelect}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    padding: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: Spacing.sm,
  },
  historyToggle: {
    padding: Spacing.xs,
  },
  keypadContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
