import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Colors, Typography, Spacing, Shadows, BorderRadius } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { formatExpression, formatNumber } from '@/utils/numberFormatter';

interface HistoryItem {
  expression: string;
  result: string;
  timestamp: number;
}

interface Props {
  visible: boolean;
  onClose: () => void;
  history: HistoryItem[];
  onClear: () => void;
  onSelect: (item: HistoryItem) => void;
}

const CalculatorHistory: React.FC<Props> = ({ visible, onClose, history, onClear, onSelect }) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.title}>Calculation History</Text>
              <View style={styles.headerButtons}>
                <TouchableOpacity onPress={onClear} style={styles.iconButton}>
                  <Ionicons name="trash-outline" size={24} color={Colors.text} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onClose} style={styles.iconButton}>
                  <Ionicons name="close" size={28} color={Colors.text} />
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
              {history.length === 0 ? (
                <View style={styles.emptyState}>
                  <Ionicons name="time-outline" size={48} color="rgba(44, 44, 44, 0.2)" />
                  <Text style={styles.emptyText}>No history yet</Text>
                </View>
              ) : (
                history.map((item, index) => (
                  <TouchableOpacity 
                    key={index} 
                    style={styles.historyItem}
                    onPress={() => onSelect(item)}
                  >
                    <Text style={styles.itemExpression}>{formatExpression(item.expression)}</Text>
                    <Text style={styles.itemResult}>= {formatNumber(item.result)}</Text>
                    <Text style={styles.itemTime}>
                      {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Text>
                  </TouchableOpacity>
                ))
              )}
            </ScrollView>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    height: '70%',
    padding: Spacing.lg,
    ...Shadows.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.text,
  },
  headerButtons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: Spacing.md,
    padding: Spacing.xs,
  },
  scrollContent: {
    paddingBottom: Spacing.xl,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 64,
  },
  emptyText: {
    marginTop: Spacing.md,
    fontSize: Typography.sizes.base,
    color: 'rgba(44, 44, 44, 0.4)',
  },
  historyItem: {
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(44, 44, 44, 0.05)',
    alignItems: 'flex-end',
  },
  itemExpression: {
    fontSize: Typography.sizes.base,
    color: 'rgba(44, 44, 44, 0.6)',
    marginBottom: Spacing.xs,
  },
  itemResult: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.primary,
  },
  itemTime: {
    fontSize: Typography.sizes.xs,
    color: 'rgba(44, 44, 44, 0.3)',
    marginTop: Spacing.xs,
  },
});

export default CalculatorHistory;
