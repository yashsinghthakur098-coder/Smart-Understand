import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors, Typography, Spacing, Shadows } from '@/constants/theme';
import { formatNumber, formatExpression } from '@/utils/numberFormatter';

interface Props {
  expression: string;
  display: string;
  result: string | null;
}

const CalculatorDisplay: React.FC<Props> = ({ expression, display, result }) => {
  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.expressionContainer}
      >
        <Text style={styles.expressionText}>
          {formatExpression(expression) || ' '}
        </Text>
      </ScrollView>
      <View style={styles.displayContainer}>
        <Text 
          numberOfLines={1} 
          adjustsFontSizeToFit 
          style={styles.displayText}
        >
          {isNaN(parseFloat(display)) ? display : formatNumber(display)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    padding: Spacing.lg,
    borderRadius: 24,
    minHeight: 160,
    justifyContent: 'flex-end',
    marginBottom: Spacing.md,
    ...Shadows.md,
  },
  expressionContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    minWidth: '100%',
  },
  expressionText: {
    fontSize: Typography.sizes.lg,
    color: 'rgba(44, 44, 44, 0.6)',
    fontFamily: 'System',
    textAlign: 'right',
  },
  displayContainer: {
    marginTop: Spacing.sm,
    alignItems: 'flex-end',
  },
  displayText: {
    fontSize: 48,
    fontWeight: Typography.weights.bold,
    color: Colors.text,
    textAlign: 'right',
  },
});

export default CalculatorDisplay;
