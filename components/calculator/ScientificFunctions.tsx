import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Colors, Typography, Spacing } from '@/constants/theme';
import { SCIENTIFIC_KEYPAD } from '@/constants/calculatorConfig';
import CalculatorButton from './CalculatorButton';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  isExpanded: boolean;
  onToggle: () => void;
  onButtonPress: (value: string, type: any) => void;
}

const ScientificFunctions: React.FC<Props> = ({ isExpanded, onToggle, onButtonPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onToggle} style={styles.toggleHeader}>
        <Text style={styles.toggleText}>
          {isExpanded ? 'Standard Mode' : 'Scientific Mode'}
        </Text>
        <Ionicons 
          name={isExpanded ? 'chevron-up' : 'chevron-down'} 
          size={20} 
          color={Colors.primary} 
        />
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.expandedContent}>
          {SCIENTIFIC_KEYPAD.map((row, rowIndex) => (
            <View key={`sci-row-${rowIndex}`} style={styles.row}>
              {row.map((btn) => (
                <CalculatorButton
                  key={btn.value}
                  label={btn.label}
                  type={btn.type}
                  onPress={() => onButtonPress(btn.value, btn.type)}
                />
              ))}
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.sm,
  },
  toggleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
  },
  toggleText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
    color: Colors.primary,
    marginRight: Spacing.xs,
  },
  expandedContent: {
    marginTop: Spacing.xs,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ScientificFunctions;
