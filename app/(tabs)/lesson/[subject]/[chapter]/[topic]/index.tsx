import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '@/constants/theme';
import { useUserStore } from '@/stores/userStore';
import {
  getCurriculumForClass,
  Curriculum,
  Subject,
  Chapter,
  Topic,
  ConceptCard,
} from '@/constants/curriculumData';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

interface LessonData {
  curriculum: Curriculum;
  subject: Subject | null;
  chapter: Chapter | null;
  topic: Topic | null;
}

export default function LessonScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { selectedClass, selectedStream, isHydrated } = useUserStore();

  const subjectId = params.subject as string;
  const subjectName = params.subjectName as string;
  const chapterId = params.chapter as string;
  const chapterNumber = parseInt(params.chapterNumber as string, 10) || 0;
  const chapterTitle = params.chapterTitle as string;
  const topicId = params.topic as string;
  const topicTitle = params.topicTitle as string;
  const isPathway = params.isPathway === 'true';

  const [lessonData, setLessonData] = useState<LessonData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isHydrated && selectedClass) {
      const data = getCurriculumForClass(selectedClass, selectedStream);

      let foundSubject: Subject | null = null;
      let foundChapter: Chapter | null = null;
      let foundTopic: Topic | null = null;

      if (isPathway) {
        // For pathways, find topic in pathway categories
        for (const pathway of data.pathways || []) {
          for (const category of pathway.categories) {
            for (const course of category.courses) {
              if (course.id === topicId) {
                foundChapter = {
                  id: course.id,
                  number: 0,
                  title: course.title,
                  topics: [],
                };
                foundTopic = {
                  id: course.id,
                  title: course.title,
                  description: course.description,
                };
                break;
              }
            }
            if (foundChapter) break;
          }
          if (foundChapter) break;
        }
      } else {
        // For regular subjects
        foundSubject = data.subjects.find(s => s.id === subjectId) || null;

        if (foundSubject) {
          foundChapter = foundSubject.chapters.find(c => c.id === chapterId) || null;

          if (foundChapter) {
            foundTopic = foundChapter.topics.find(t => t.id === topicId) || null;
          }
        }
      }

      setLessonData({
        curriculum: data,
        subject: foundSubject,
        chapter: foundChapter,
        topic: foundTopic,
      });
      setLoading(false);
    } else if (isHydrated && !selectedClass) {
      setLoading(false);
    }
  }, [isHydrated, selectedClass, selectedStream, subjectId, chapterId, topicId, isPathway]);

  const handleSubjectPress = () => {
    if (isPathway) {
      router.replace({
        pathname: '/(tabs)/subjects/[subject]',
        params: { subject: subjectId, subjectName, isPathway: 'true' },
      });
    } else {
      router.replace({
        pathname: '/(tabs)/subjects/[subject]',
        params: { subject: subjectId, subjectName },
      });
    }
  };

  const handleChapterPress = () => {
    if (isPathway) {
      router.replace({
        pathname: '/(tabs)/subjects/[subject]/[chapter]',
        params: {
          subject: subjectId,
          subjectName: subjectName,
          chapter: chapterId,
          chapterNumber: chapterNumber,
          chapterTitle: chapterTitle,
          isPathway: 'true',
        },
      });
    } else {
      router.replace({
        pathname: '/(tabs)/subjects/[subject]/[chapter]',
        params: {
          subject: subjectId,
          subjectName: subjectName,
          chapter: chapterId,
          chapterNumber: chapterNumber,
          chapterTitle: chapterTitle,
          isPathway: 'false',
        },
      });
    }
  };

  const renderConceptCard = (card: ConceptCard, index: number) => (
    <View key={`${card.id}-${index}`} style={styles.conceptCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardIcon}>{card.icon}</Text>
        <Text style={styles.cardTitle}>{card.title}</Text>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardSummary}>{card.content.summary}</Text>
        <View style={styles.bulletContainer}>
          {card.content.bullets.map((bullet, bulletIndex) => (
            <View key={bulletIndex} style={styles.bulletRow}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.bulletText}>{bullet}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const renderSkeletonLoader = () => (
    <View style={styles.skeletonContainer}>
      {[1, 2, 3].map((item) => (
        <View key={item} style={styles.skeletonCard}>
          <View style={styles.skeletonHeader}>
            <View style={styles.skeletonIcon} />
            <View style={styles.skeletonTitle} />
          </View>
          <View style={styles.skeletonLine} />
          <View style={styles.skeletonLineShort} />
          <View style={styles.skeletonLine} />
          <View style={styles.skeletonLine} />
          <View style={styles.skeletonLineShort} />
        </View>
      ))}
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateIcon}>📖</Text>
      <Text style={styles.emptyStateTitle}>Content coming soon!</Text>
      <Text style={styles.emptyStateText}>Check back later for new concept cards.</Text>
    </View>
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
          <Text style={styles.emptyStateText}>Please select a class first</Text>
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
        <>
          {/* Header Skeleton */}
          <View style={styles.headerCard}>
            <View style={styles.skeletonLineShort} />
            <View style={styles.skeletonTitleSmall} />
          </View>
          {renderSkeletonLoader()}
        </>
      );
    }

    if (!lessonData?.topic) {
      return (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>Topic not found</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      );
    }

    const conceptCards = lessonData.topic.conceptCards || [];

    return (
      <>
        {/* Header */}
        <View style={styles.headerCard}>
          <Text style={styles.headerLabel}>Lesson</Text>
          <Text style={styles.headerTitle}>{lessonData.topic.title}</Text>
          {lessonData.topic.description && (
            <Text style={styles.headerDescription}>{lessonData.topic.description}</Text>
          )}
        </View>

        {/* Breadcrumb */}
        <View style={styles.breadcrumb}>
          <TouchableOpacity onPress={() => router.replace('/(tabs)')}>
            <Text style={styles.breadcrumbLink}>Home</Text>
          </TouchableOpacity>
          <Text style={styles.breadcrumbSeparator}> › </Text>
          <TouchableOpacity onPress={handleSubjectPress}>
            <Text style={styles.breadcrumbLink}>{subjectName}</Text>
          </TouchableOpacity>
          <Text style={styles.breadcrumbSeparator}> › </Text>
          <TouchableOpacity onPress={handleChapterPress}>
            <Text style={styles.breadcrumbLink}>
              {chapterNumber}. {chapterTitle}
            </Text>
          </TouchableOpacity>
          <Text style={styles.breadcrumbSeparator}> › </Text>
          <Text style={styles.breadcrumbCurrent}>{lessonData.topic.title}</Text>
        </View>

        {/* Concept Cards */}
        {conceptCards.length > 0 ? (
          <View style={styles.cardsContainer}>
            {conceptCards.map((card, index) => renderConceptCard(card, index))}
          </View>
        ) : (
          renderEmptyState()
        )}
      </>
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backNavButton}
        onPress={() => router.back()}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      >
        <Text style={styles.backNavIcon}>‹</Text>
        <Text style={styles.backNavText}>Back</Text>
      </TouchableOpacity>

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
      maxWidth: 700,
      alignSelf: 'center',
      width: '100%',
    }),
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 300,
  },
  // Back Navigation
  backNavButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
    paddingVertical: Spacing.sm,
    alignSelf: 'flex-start',
  },
  backNavIcon: {
    fontSize: 28,
    color: Colors.primary,
    lineHeight: 28,
  },
  backNavText: {
    fontSize: Typography.sizes.base,
    color: Colors.primary,
    fontWeight: Typography.weights.semibold,
    marginLeft: Spacing.xs,
  },
  // Header
  headerCard: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    marginBottom: Spacing.md,
    ...Shadows.md,
  },
  headerLabel: {
    fontSize: Typography.sizes.sm,
    color: Colors.whiteOpacity(0.8),
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: Spacing.xs,
  },
  headerTitle: {
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.bold,
    color: Colors.white,
    marginBottom: Spacing.sm,
    letterSpacing: -0.5,
  },
  headerDescription: {
    fontSize: Typography.sizes.base,
    color: Colors.whiteOpacity(0.9),
    lineHeight: Typography.sizes.base * 1.5,
  },
  // Breadcrumb
  breadcrumb: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    flexWrap: 'wrap',
  },
  breadcrumbLink: {
    fontSize: Typography.sizes.sm,
    color: Colors.primary,
  },
  breadcrumbSeparator: {
    fontSize: Typography.sizes.sm,
    color: Colors.textOpacity(0.4),
    marginHorizontal: Spacing.sm,
  },
  breadcrumbCurrent: {
    fontSize: Typography.sizes.sm,
    color: Colors.text,
    fontWeight: Typography.weights.medium,
  },
  // Concept Cards
  cardsContainer: {
    gap: Spacing.md,
  },
  conceptCard: {
    backgroundColor: Colors.lightSand,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...Shadows.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primaryOpacity(0.1),
  },
  cardIcon: {
    fontSize: 32,
    marginRight: Spacing.md,
  },
  cardTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.primary,
    flex: 1,
  },
  cardContent: {
    paddingHorizontal: Spacing.sm,
  },
  cardSummary: {
    fontSize: Typography.sizes.base,
    color: Colors.text,
    lineHeight: Typography.sizes.base * 1.6,
    marginBottom: Spacing.lg,
  },
  bulletContainer: {
    gap: Spacing.sm,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bulletPoint: {
    fontSize: Typography.sizes.base,
    color: Colors.primary,
    marginRight: Spacing.sm,
    lineHeight: Typography.sizes.base * 1.5,
  },
  bulletText: {
    flex: 1,
    fontSize: Typography.sizes.base,
    color: Colors.text,
    lineHeight: Typography.sizes.base * 1.5,
  },
  // Empty State
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing['3xl'],
    backgroundColor: Colors.lightSand,
    borderRadius: BorderRadius.lg,
    ...Shadows.sm,
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: Spacing.md,
  },
  emptyStateTitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.semibold,
    color: Colors.primary,
    marginBottom: Spacing.sm,
  },
  emptyStateText: {
    fontSize: Typography.sizes.base,
    color: Colors.textOpacity(0.7),
    textAlign: 'center',
    lineHeight: Typography.sizes.base * 1.5,
  },
  // Skeleton Loader
  skeletonContainer: {
    gap: Spacing.md,
  },
  skeletonCard: {
    backgroundColor: Colors.lightSand,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...Shadows.sm,
  },
  skeletonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primaryOpacity(0.1),
  },
  skeletonIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primaryOpacity(0.1),
    marginRight: Spacing.md,
  },
  skeletonTitle: {
    width: '60%',
    height: 20,
    borderRadius: 4,
    backgroundColor: Colors.primaryOpacity(0.15),
  },
  skeletonTitleSmall: {
    width: '50%',
    height: 28,
    borderRadius: 4,
    backgroundColor: Colors.whiteOpacity(0.2),
    marginTop: Spacing.sm,
  },
  skeletonLine: {
    width: '100%',
    height: 14,
    borderRadius: 4,
    backgroundColor: Colors.primaryOpacity(0.1),
    marginBottom: Spacing.sm,
  },
  skeletonLineShort: {
    width: '40%',
    height: 14,
    borderRadius: 4,
    backgroundColor: Colors.whiteOpacity(0.2),
    marginBottom: Spacing.sm,
  },
  // Buttons
  backButton: {
    marginTop: Spacing.md,
  },
  backButtonText: {
    fontSize: Typography.sizes.base,
    color: Colors.primary,
    fontWeight: Typography.weights.semibold,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.md + 6,
    paddingHorizontal: Spacing.xl,
    ...Shadows.md,
    marginTop: Spacing.md,
  },
  buttonText: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.white,
  },
});
