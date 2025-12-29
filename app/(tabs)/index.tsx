import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '@/constants/theme';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.welcomeCard}>
        <Text style={styles.greeting}>Welcome to LearnSmart! 🎓</Text>
        <Text style={styles.subtitle}>
          Your journey to mastering every subject starts here
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Phase 1 Complete ✨</Text>
        <Text style={styles.cardText}>
          The foundation and aesthetic setup is complete with the Modern Zen theme.
          Future phases will add learning features, AI study buddy, and more!
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Coming Soon 🚀</Text>
        <Text style={styles.cardText}>
          • Concept Cards for bite-sized learning{'\n'}
          • Smarty AI Study Buddy{'\n'}
          • Subject selection (Class 1-12+){'\n'}
          • Progress tracking{'\n'}
          • Practice quizzes
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
  welcomeCard: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    marginBottom: Spacing.lg,
    ...Shadows.md,
  },
  greeting: {
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.bold,
    color: Colors.white,
    marginBottom: Spacing.sm,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: Typography.sizes.base,
    color: Colors.white,
    opacity: 0.9,
    lineHeight: Typography.sizes.base * 1.5,
  },
  card: {
    backgroundColor: Colors.lightSand,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  cardTitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  cardText: {
    fontSize: Typography.sizes.base,
    color: Colors.textOpacity(0.7),
    lineHeight: Typography.sizes.base * 1.6,
  },
});
