import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MAIN_KEYPAD, MEMORY_BUTTONS } from '@/constants/calculatorConfig';
import CalculatorButton from './CalculatorButton';
import { Spacing } from '@/constants/theme';

interface Props {
  onButtonPress: (value: string, type: any) => void;
}

const CalculatorKeypad: React.FC<Props> = ({ onButtonPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.memoryRow}>
        {MEMORY_BUTTONS.map((btn) => (
          <CalculatorButton
            key={btn.value}
            label={btn.label}
            type={btn.type}
            onPress={() => onButtonPress(btn.value, btn.type)}
          />
        ))}
      </View>
      
      {MAIN_KEYPAD.map((row, rowIndex) => (
        <View key={`row-${rowIndex}`} style={styles.row}>
          {row.map((btn) => (
            <CalculatorButton
              key={btn.value}
              label={btn.label}
              type={btn.type}
              gridSpan={btn.gridSpan}
              onPress={() => onButtonPress(btn.value, btn.type)}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  memoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default CalculatorKeypad;
