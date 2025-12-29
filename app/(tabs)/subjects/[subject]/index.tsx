import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '@/constants/theme';
import { useUserStore } from '@/stores/userStore';
import {
  getCurriculumForClass,
  getClassLabel,
  Curriculum,
  Subject,
  Chapter,
} from '@/constants/curriculumData';

const isWeb = Platform.OS === 'web';

export default function SubjectScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { selectedClass, selectedStream, isHydrated } = useUserStore();

  const subjectId = params.subject as string;
  const subjectName = params.subjectName as string;
  const isPathway = params.isPathway === 'true';

  const [curriculum, setCurriculum] = useState<Curriculum | null>(null);
  const [subject, setSubject] = useState<Subject | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isHydrated && selectedClass) {
      const data = getCurriculumForClass(selectedClass, selectedStream);
      setCurriculum(data);

      if (isPathway) {
        // For pathways, find the pathway data
        const pathway = data.pathways?.find(p => p.id === subjectId);
        setSubject(null); // We'll handle pathways differently
      } else {
        // For regular subjects
        const foundSubject = data.subjects.find(s => s.id === subjectId);
        setSubject(foundSubject || null);
      }
      setLoading(false);
    } else if (isHydrated && !selectedClass) {
      setLoading(false);
    }
  }, [isHydrated, selectedClass, selectedStream, subjectId, isPathway]);

  const handleChapterPress = (chapter: Chapter) => {
    router.push({
      pathname: '/(tabs)/subjects/[subject]/[chapter]',
      params: {
        subject: subjectId,
        subjectName: subjectName,
        chapter: chapter.id,
        chapterNumber: chapter.number,
        chapterTitle: chapter.title,
        isPathway: isPathway ? 'true' : 'false',
      },
    });
  };

  const handlePathwayCategoryPress = (categoryId: string, categoryName: string) => {
    router.push({
      pathname: '/(tabs)/subjects/[subject]',
      params: {
        subject: categoryId,
        subjectName: categoryName,
        isPathway: 'true',
        parentSubject: subjectName,
      },
    });
  };

  const renderChapterCard = (chapter: Chapter) => (
    <TouchableOpacity
      key={chapter.id}
      style={styles.chapterCard}
      onPress={() => handleChapterPress(chapter)}
      activeOpacity={0.7}
    >
      <View style={styles.chapterNumberContainer}>
        <Text style={styles.chapterNumber}>{chapter.number}</Text>
      </View>
      <View style={styles.chapterInfo}>
        <Text style={styles.chapterTitle}>{chapter.title}</Text>
        <Text style={styles.topicCount}>
          {chapter.topics.length} Topic{chapter.topics.length !== 1 ? 's' : ''}
        </Text>
      </View>
      <View style={styles.chapterArrow}>
        <Text style={styles.arrowIcon}>›</Text>
      </View>
    </TouchableOpacity>
  );

  const renderPathwaysContent = () => {
    const pathway = curriculum?.pathways?.find(p => p.id === subjectId);

    if (!pathway) {
      return (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>Pathway not found</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.pathwaysContent}>
        <View style={styles.pathwayHeader}>
          <Text style={styles.pathwayIcon}>{pathway.icon}</Text>
          <Text style={styles.pathwayTitle}>{pathway.name}</Text>
        </View>
        <Text style={styles.pathwayDescription}>{pathway.description}</Text>

        {pathway.categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryCard}
            onPress={() => handlePathwayCategoryPress(category.id, category.name)}
            activeOpacity={0.7}
          >
            <View style={styles.categoryInfo}>
              <Text style={styles.categoryName}>{category.name}</Text>
              <Text style={styles.courseCount}>
                {category.courses.length} Course{category.courses.length !== 1 ? 's' : ''}
              </Text>
            </View>
            <View style={styles.chapterArrow}>
              <Text style={styles.arrowIcon}>›</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

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
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      );
    }

    // If it's a pathway, show pathway content
    if (isPathway) {
      return renderPathwaysContent();
    }

    // If subject not found
    if (!subject) {
      return (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>Subject not found</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <>
        {/* Header */}
        <View style={styles.headerCard}>
          <View style={styles.subjectHeaderRow}>
            <Text style={styles.subjectIcon}>{subject.icon}</Text>
            <View style={styles.subjectTitleContainer}>
              <Text style={styles.subjectTitle}>{subject.name}</Text>
              <Text style={styles.classLabel}>{getClassLabel(selectedClass || '')}</Text>
            </View>
          </View>
        </View>

        {/* Breadcrumb */}
        <View style={styles.breadcrumb}>
          <TouchableOpacity onPress={() => router.replace('/(tabs)')}>
            <Text style={styles.breadcrumbLink}>Home</Text>
          </TouchableOpacity>
          <Text style={styles.breadcrumbSeparator}> › </Text>
          <Text style={styles.breadcrumbCurrent}>{subject.name}</Text>
        </View>

        {/* Chapters List */}
        <View style={styles.chaptersContainer}>
          <Text style={styles.sectionTitle}>Chapters</Text>
          {subject.chapters.map((chapter) => renderChapterCard(chapter))}
        </View>
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
      maxWidth: 800,
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
  headerCard: {
    backgroundColor: Colors.lightSand,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  subjectHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subjectIcon: {
    fontSize: 48,
    marginRight: Spacing.md,
  },
  subjectTitleContainer: {
    flex: 1,
  },
  subjectTitle: {
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.bold,
    color: Colors.text,
    letterSpacing: -0.5,
  },
  classLabel: {
    fontSize: Typography.sizes.sm,
    color: Colors.primary,
    marginTop: Spacing.xs,
  },
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
  chaptersContainer: {
    gap: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  chapterCard: {
    backgroundColor: Colors.lightSand,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    ...Shadows.sm,
  },
  chapterNumberContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  chapterNumber: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.white,
  },
  chapterInfo: {
    flex: 1,
  },
  chapterTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.semibold,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  topicCount: {
    fontSize: Typography.sizes.sm,
    color: Colors.textOpacity(0.6),
  },
  chapterArrow: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primaryOpacity(0.1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowIcon: {
    fontSize: 24,
    color: Colors.primary,
    fontWeight: '300',
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
    marginBottom: Spacing.md,
  },
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
  },
  buttonText: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.white,
  },
  pathwaysContent: {
    flex: 1,
  },
  pathwayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  pathwayIcon: {
    fontSize: 40,
    marginRight: Spacing.md,
  },
  pathwayTitle: {
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.bold,
    color: Colors.text,
  },
  pathwayDescription: {
    fontSize: Typography.sizes.base,
    color: Colors.textOpacity(0.7),
    marginBottom: Spacing.xl,
    lineHeight: Typography.sizes.base * 1.5,
  },
  categoryCard: {
    backgroundColor: Colors.lightSand,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    ...Shadows.sm,
    marginBottom: Spacing.md,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.semibold,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  courseCount: {
    fontSize: Typography.sizes.sm,
    color: Colors.textOpacity(0.6),
  },
});
