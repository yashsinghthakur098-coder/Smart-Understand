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
  Topic,
} from '@/constants/curriculumData';

const isWeb = Platform.OS === 'web';

export default function ChapterScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { selectedClass, selectedStream, isHydrated } = useUserStore();

  const subjectId = params.subject as string;
  const subjectName = params.subjectName as string;
  const chapterId = params.chapter as string;
  const chapterNumber = parseInt(params.chapterNumber as string, 10) || 0;
  const chapterTitle = params.chapterTitle as string;
  const isPathway = params.isPathway === 'true';

  const [curriculum, setCurriculum] = useState<Curriculum | null>(null);
  const [subject, setSubject] = useState<Subject | null>(null);
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isHydrated && selectedClass) {
      const data = getCurriculumForClass(selectedClass, selectedStream);
      setCurriculum(data);

      if (isPathway) {
        // For pathways, find chapter in pathway categories
        let foundChapter: Chapter | null = null;
        for (const pathway of data.pathways || []) {
          for (const category of pathway.categories) {
            // Check if any course in category matches chapterId
            const course = category.courses.find(c => c.id === chapterId);
            if (course) {
              foundChapter = {
                id: course.id,
                number: 0,
                title: course.title,
                topics: course.description
                  ? [{ id: `${course.id}-desc`, title: 'Overview', description: course.description }]
                  : [],
              };
              break;
            }
          }
          if (foundChapter) break;
        }
        setSubject(null);
        setChapter(foundChapter);
      } else {
        // For regular subjects
        const foundSubject = data.subjects.find(s => s.id === subjectId);
        setSubject(foundSubject || null);

        if (foundSubject) {
          const foundChapter = foundSubject.chapters.find(c => c.id === chapterId);
          setChapter(foundChapter || null);
        } else {
          setChapter(null);
        }
      }
      setLoading(false);
    } else if (isHydrated && !selectedClass) {
      setLoading(false);
    }
  }, [isHydrated, selectedClass, selectedStream, subjectId, chapterId, isPathway]);

  const handleTopicPress = (topic: Topic) => {
    router.push({
      pathname: '/(tabs)/lesson/[subject]/[chapter]/[topic]',
      params: {
        topicId: topic.id,
        topicTitle: topic.title,
        subject: subjectId,
        subjectName: subjectName,
        chapter: chapterId,
        chapterNumber: chapterNumber,
        chapterTitle: chapterTitle,
        isPathway: isPathway ? 'true' : 'false',
      },
    });
  };

  const renderTopicCard = (topic: Topic, index: number) => (
    <TouchableOpacity
      key={`${topic.id}-${index}`}
      style={styles.topicCard}
      onPress={() => handleTopicPress(topic)}
      activeOpacity={0.7}
    >
      <View style={styles.topicIndexContainer}>
        <Text style={styles.topicIndex}>{index + 1}</Text>
      </View>
      <View style={styles.topicInfo}>
        <Text style={styles.topicTitle}>{topic.title}</Text>
        {topic.description && (
          <Text style={styles.topicDescription}>{topic.description}</Text>
        )}
      </View>
      <View style={styles.topicArrow}>
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

    if (!chapter) {
      return (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>Chapter not found</Text>
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
          <Text style={styles.chapterLabel}>
            Chapter {chapterNumber}
          </Text>
          <Text style={styles.chapterTitle}>{chapter.title}</Text>
          <View style={styles.topicCountBadge}>
            <Text style={styles.topicCountText}>
              {chapter.topics.length} Topic{chapter.topics.length !== 1 ? 's' : ''}
            </Text>
          </View>
        </View>

        {/* Breadcrumb */}
        <View style={styles.breadcrumb}>
          <TouchableOpacity onPress={() => router.replace('/(tabs)')}>
            <Text style={styles.breadcrumbLink}>Home</Text>
          </TouchableOpacity>
          <Text style={styles.breadcrumbSeparator}> › </Text>
          <TouchableOpacity
            onPress={() =>
              router.replace({
                pathname: '/(tabs)/subjects/[subject]',
                params: { subject: subjectId, subjectName },
              })
            }
          >
            <Text style={styles.breadcrumbLink}>{subjectName}</Text>
          </TouchableOpacity>
          <Text style={styles.breadcrumbSeparator}> › </Text>
          <Text style={styles.breadcrumbCurrent}>
            {chapter.number}. {chapter.title}
          </Text>
        </View>

        {/* Topics List */}
        <View style={styles.topicsContainer}>
          <Text style={styles.sectionTitle}>Topics</Text>
          {chapter.topics.map((topic, index) => renderTopicCard(topic, index))}
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
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    marginBottom: Spacing.md,
    ...Shadows.md,
  },
  chapterLabel: {
    fontSize: Typography.sizes.sm,
    color: Colors.whiteOpacity(0.8),
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: Spacing.xs,
  },
  chapterTitle: {
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.bold,
    color: Colors.white,
    marginBottom: Spacing.md,
    letterSpacing: -0.5,
  },
  topicCountBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.whiteOpacity(0.2),
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  topicCountText: {
    fontSize: Typography.sizes.sm,
    color: Colors.white,
    fontWeight: Typography.weights.medium,
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
  topicsContainer: {
    gap: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  topicCard: {
    backgroundColor: Colors.lightSand,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    ...Shadows.sm,
  },
  topicIndexContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primaryOpacity(0.1),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  topicIndex: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.bold,
    color: Colors.primary,
  },
  topicInfo: {
    flex: 1,
  },
  topicTitle: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.semibold,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  topicDescription: {
    fontSize: Typography.sizes.sm,
    color: Colors.textOpacity(0.6),
    lineHeight: Typography.sizes.sm * 1.5,
  },
  topicArrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primaryOpacity(0.1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowIcon: {
    fontSize: 20,
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
});
