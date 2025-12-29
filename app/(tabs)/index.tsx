import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '@/constants/theme';
import { useUserStore } from '@/stores/userStore';
import {
  getCurriculumForClass,
  getClassLabel,
  Curriculum,
  Subject,
  Chapter,
  Topic,
} from '@/constants/curriculumData';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

// Grid configuration
const getGridColumns = () => (isWeb ? 4 : 2);

export default function HomeScreen() {
  const router = useRouter();
  const { selectedClass, selectedStream, isHydrated } = useUserStore();
  const [curriculum, setCurriculum] = useState<Curriculum | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isHydrated && selectedClass) {
      const data = getCurriculumForClass(selectedClass, selectedStream);
      setCurriculum(data);
      setLoading(false);
    } else if (isHydrated && !selectedClass) {
      setLoading(false);
    }
  }, [isHydrated, selectedClass, selectedStream]);

  const handleSubjectPress = (subject: Subject) => {
    router.push({
      pathname: '/(tabs)/subjects/[subject]',
      params: { subject: subject.id, subjectName: subject.name },
    });
  };

  const renderSubjectCard = (subject: Subject, index: number) => (
    <TouchableOpacity
      key={`${subject.id}-${index}`}
      style={styles.subjectCard}
      onPress={() => handleSubjectPress(subject)}
      activeOpacity={0.7}
    >
      <View style={styles.subjectIconContainer}>
        <Text style={styles.subjectIcon}>{subject.icon}</Text>
      </View>
      <Text style={styles.subjectName}>{subject.name}</Text>
      <Text style={styles.chapterCount}>
        {subject.chapters.length} Chapter{subject.chapters.length !== 1 ? 's' : ''}
      </Text>
      <View style={styles.arrowContainer}>
        <Text style={styles.arrowIcon}>›</Text>
      </View>
    </TouchableOpacity>
  );

  const renderContent = () => {
    if (!isHydrated) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      );
    }

    if (!selectedClass) {
      return (
        <View style={styles.centerContainer}>
          <View style={styles.welcomeCard}>
            <Text style={styles.greeting}>Welcome to LearnSmart! 🎓</Text>
            <Text style={styles.subtitle}>
              Please complete your profile to access personalized content
            </Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.replace('/(auth)/class-selection')}
          >
            <Text style={styles.buttonText}>Select Class</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (loading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      );
    }

    // 12+ Section - Pathways
    if (selectedClass === '12+') {
      return renderPathwaysContent();
    }

    // Regular classes - Subjects
    return renderSubjectsContent();
  };

  const renderPathwaysContent = () => (
    <View style={styles.section}>
      <View style={styles.headerCard}>
        <Text style={styles.headerTitle}>Welcome Back! 🌟</Text>
        <Text style={styles.headerSubtitle}>
          Continue your learning journey
        </Text>
      </View>

      <View style={styles.pathwaysContainer}>
        {curriculum?.pathways?.map((pathway) => (
          <TouchableOpacity
            key={pathway.id}
            style={styles.pathwayCard}
            onPress={() => {
              router.push({
                pathname: '/(tabs)/subjects/[subject]',
                params: { subject: pathway.id, subjectName: pathway.name, isPathway: 'true' },
              });
            }}
            activeOpacity={0.7}
          >
            <Text style={styles.pathwayIcon}>{pathway.icon}</Text>
            <Text style={styles.pathwayName}>{pathway.name}</Text>
            <Text style={styles.pathwayDescription}>{pathway.description}</Text>
            <View style={styles.pathwayArrow}>
              <Text style={styles.arrowIcon}>›</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderSubjectsContent = () => (
    <>
      {/* Header */}
      <View style={styles.headerCard}>
        <Text style={styles.headerTitle}>
          {getClassLabel(selectedClass || '')} 📚
        </Text>
        <Text style={styles.headerSubtitle}>
          Tap on a subject to explore chapters and topics
        </Text>
      </View>

      {/* Breadcrumb */}
      <View style={styles.breadcrumb}>
        <Text style={styles.breadcrumbText}>Home</Text>
      </View>

      {/* Subjects Grid */}
      {curriculum?.subjects && curriculum.subjects.length > 0 ? (
        <View style={styles.gridContainer}>
          {curriculum.subjects.map((subject, index) =>
            renderSubjectCard(subject, index)
          )}
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No subjects available</Text>
          <Text style={styles.emptyStateSubtext}>
            Please check your class selection
          </Text>
        </View>
      )}
    </>
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {renderContent()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flexGrow: 1,
    padding: Spacing.lg,
    paddingTop: Platform.OS === 'ios' ? Spacing.xl : Spacing.md,
    paddingBottom: Spacing['2xl'],
    ...(isWeb && {
      maxWidth: 1200,
      alignSelf: 'center',
      width: '100%',
    }),
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 400,
  },
  headerCard: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    marginBottom: Spacing.lg,
    ...Shadows.md,
  },
  headerTitle: {
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.bold,
    color: Colors.white,
    marginBottom: Spacing.sm,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: Typography.sizes.base,
    color: Colors.whiteOpacity(0.9),
    lineHeight: Typography.sizes.base * 1.5,
  },
  breadcrumb: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  breadcrumbText: {
    fontSize: Typography.sizes.sm,
    color: Colors.textOpacity(0.5),
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  subjectCard: {
    backgroundColor: Colors.lightSand,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    width: isWeb ? '23%' : '48%',
    minWidth: 140,
    ...Shadows.sm,
    alignItems: 'center',
    position: 'relative',
  },
  subjectIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primaryOpacity(0.1),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  subjectIcon: {
    fontSize: 28,
  },
  subjectName: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.semibold,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  chapterCount: {
    fontSize: Typography.sizes.sm,
    color: Colors.textOpacity(0.6),
    textAlign: 'center',
  },
  arrowContainer: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
  },
  arrowIcon: {
    fontSize: 24,
    color: Colors.primary,
    fontWeight: '300',
  },
  welcomeCard: {
    backgroundColor: Colors.lightSand,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    marginBottom: Spacing.lg,
    ...Shadows.md,
    maxWidth: 400,
    alignItems: 'center',
  },
  greeting: {
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.bold,
    color: Colors.text,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Typography.sizes.base,
    color: Colors.textOpacity(0.7),
    textAlign: 'center',
    lineHeight: Typography.sizes.base * 1.6,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.md + 6,
    paddingHorizontal: Spacing.xl,
    ...Shadows.md,
  },
  buttonText: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.white,
  },
  section: {
    flex: 1,
  },
  pathwaysContainer: {
    gap: Spacing.md,
  },
  pathwayCard: {
    backgroundColor: Colors.lightSand,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    ...Shadows.sm,
  },
  pathwayIcon: {
    fontSize: 40,
    marginRight: Spacing.md,
  },
  pathwayName: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.text,
    flex: 1,
  },
  pathwayDescription: {
    fontSize: Typography.sizes.sm,
    color: Colors.textOpacity(0.6),
    flex: 2,
    marginRight: Spacing.sm,
  },
  pathwayArrow: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primaryOpacity(0.1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing['3xl'],
  },
  emptyStateText: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.semibold,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  emptyStateSubtext: {
    fontSize: Typography.sizes.base,
    color: Colors.textOpacity(0.6),
  },
});
