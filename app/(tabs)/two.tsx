import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '@/constants/theme';

export default function ExploreScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Explore Subjects</Text>
      <Text style={styles.description}>
        Subject selection and content browsing will be available in future phases
      </Text>

      <View style={styles.placeholderCard}>
        <Text style={styles.placeholderEmoji}>📚</Text>
        <Text style={styles.placeholderText}>
          Browse subjects, chapters, and topics
        </Text>
      </View>

      <View style={styles.placeholderCard}>
        <Text style={styles.placeholderEmoji}>🎯</Text>
        <Text style={styles.placeholderText}>
          Focus on your grade level
        </Text>
      </View>

      <View style={styles.placeholderCard}>
        <Text style={styles.placeholderEmoji}>⭐</Text>
        <Text style={styles.placeholderText}>
          Track your learning progress
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.lg,
  },
  title: {
    fontSize: Typography.sizes['3xl'],
    fontWeight: Typography.weights.bold,
    color: Colors.text,
    marginBottom: Spacing.sm,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: Typography.sizes.base,
    color: Colors.textOpacity(0.6),
    marginBottom: Spacing.xl,
    lineHeight: Typography.sizes.base * 1.5,
  },
  placeholderCard: {
    backgroundColor: Colors.lightSand,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    marginBottom: Spacing.md,
    alignItems: 'center',
    ...Shadows.sm,
  },
  placeholderEmoji: {
    fontSize: 48,
    marginBottom: Spacing.md,
  },
  placeholderText: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.medium,
    color: Colors.text,
    textAlign: 'center',
  },
});
