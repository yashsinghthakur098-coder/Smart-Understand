import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useUserStore } from '@/stores/userStore';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '@/constants/theme';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

// Class options including 12+ for lifelong learners
const classOptions = [
  { label: 'Class 1', value: '1' },
  { label: 'Class 2', value: '2' },
  { label: 'Class 3', value: '3' },
  { label: 'Class 4', value: '4' },
  { label: 'Class 5', value: '5' },
  { label: 'Class 6', value: '6' },
  { label: 'Class 7', value: '7' },
  { label: 'Class 8', value: '8' },
  { label: 'Class 9', value: '9' },
  { label: 'Class 10', value: '10' },
  { label: 'Class 11', value: '11' },
  { label: 'Class 12', value: '12' },
  { label: '12+', value: '12+' },
];

export default function ClassSelectionScreen() {
  const router = useRouter();
  const { selectedClass, setSelectedClass } = useUserStore();
  const [localSelection, setLocalSelection] = useState<string | null>(selectedClass);

  const handleClassSelect = (classValue: string) => {
    setLocalSelection(classValue);
  };

  const handleContinue = () => {
    if (localSelection) {
      setSelectedClass(localSelection);
      
      // If Class 11 or 12 is selected, show stream selection
      if (localSelection === '11' || localSelection === '12') {
        router.push('/(auth)/stream-selection');
      } else {
        // For other classes, mark profile as complete and go to main app
        useUserStore.getState().completeProfile();
        router.replace('/(tabs)');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>Select Your Class</Text>
          <Text style={styles.subtitle}>
            Choose your current grade level to get personalized content
          </Text>
        </View>

        {/* Class Options Grid */}
        <View style={styles.optionsContainer}>
          {classOptions.map((option) => {
            const isSelected = localSelection === option.value;
            return (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.classButton,
                  isSelected && styles.classButtonSelected,
                ]}
                onPress={() => handleClassSelect(option.value)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.classButtonText,
                    isSelected && styles.classButtonTextSelected,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            !localSelection && styles.continueButtonDisabled,
          ]}
          onPress={handleContinue}
          disabled={!localSelection}
          activeOpacity={0.8}
        >
          <Text style={styles.continueButtonText}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Platform.OS === 'ios' ? Spacing.xl : Spacing.md,
    paddingBottom: Platform.OS === 'ios' ? Spacing['3xl'] : Spacing['2xl'],
    // Web-specific centering
    ...(isWeb && {
      maxWidth: 600,
      alignSelf: 'center',
      width: '100%',
    }),
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
    marginTop: Spacing.md,
  },
  title: {
    fontSize: Typography.sizes['3xl'],
    fontWeight: Typography.weights.bold,
    color: Colors.text,
    marginBottom: Spacing.sm,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Typography.sizes.base,
    color: Colors.textOpacity(0.6),
    textAlign: 'center',
    lineHeight: Typography.sizes.base * 1.6,
    paddingHorizontal: Spacing.md,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  classButton: {
    width: (width - Spacing.lg * 2 - Spacing.sm) / 3,
    aspectRatio: 1,
    backgroundColor: Colors.lightSand,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.sm,
    borderWidth: 2,
    borderColor: 'transparent',
    ...(isWeb && {
      width: '32%',
      minWidth: 100,
      maxWidth: 150,
    }),
  },
  classButtonSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
    ...Shadows.md,
  },
  classButtonText: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.text,
    textAlign: 'center',
  },
  classButtonTextSelected: {
    color: Colors.white,
  },
  footer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Platform.OS === 'ios' ? Spacing.xl : Spacing.md,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.textOpacity(0.05),
    paddingTop: Spacing.md,
    ...(isWeb && {
      maxWidth: 600,
      alignSelf: 'center',
      width: '100%',
    }),
  },
  continueButton: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.md + 6,
    alignItems: 'center',
    ...Shadows.md,
  },
  continueButtonDisabled: {
    backgroundColor: Colors.textOpacity(0.2),
    ...Shadows.sm,
  },
  continueButtonText: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.white,
    letterSpacing: 0.3,
  },
});