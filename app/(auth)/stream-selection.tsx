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

// Stream options for Classes 11-12
const streamOptions = [
  { label: 'Science', value: 'Science', color: '#4A90E2' },
  { label: 'Commerce', value: 'Commerce', color: '#E74C3C' },
  { label: 'Arts', value: 'Arts', color: '#F39C12' },
];

export default function StreamSelectionScreen() {
  const router = useRouter();
  const { selectedStream, setSelectedStream } = useUserStore();
  const [localSelection, setLocalSelection] = useState<string | null>(selectedStream);

  const handleStreamSelect = (streamValue: string) => {
    setLocalSelection(streamValue);
  };

  const handleContinue = () => {
    if (localSelection) {
      setSelectedStream(localSelection);
      useUserStore.getState().completeProfile();
      router.replace('/(tabs)');
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
          <Text style={styles.title}>Select Your Stream</Text>
          <Text style={styles.subtitle}>
            Choose your academic stream to get specialized content for Class 11/12
          </Text>
        </View>

        {/* Stream Options */}
        <View style={styles.optionsContainer}>
          {streamOptions.map((option) => {
            const isSelected = localSelection === option.value;
            return (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.streamButton,
                  isSelected && styles.streamButtonSelected,
                  isSelected && { backgroundColor: option.color },
                ]}
                onPress={() => handleStreamSelect(option.value)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.streamButtonText,
                    isSelected && styles.streamButtonTextSelected,
                  ]}
                >
                  {option.label}
                </Text>
                <Text
                  style={[
                    styles.streamDescription,
                    isSelected && styles.streamDescriptionSelected,
                  ]}
                >
                  {option.value === 'Science' && 'Physics, Chemistry, Biology, Mathematics (Botany)'}
                  {option.value === 'Commerce' && 'Accountancy, Business Studies, Economics (ABC)'}
                  {option.value === 'Arts' && 'History, Geography, Political Science, Economics (HGP)'}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Text style={styles.backButtonText}>
            Back to Class Selection
          </Text>
        </TouchableOpacity>
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
            Continue to App
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
    gap: Spacing.md,
  },
  streamButton: {
    backgroundColor: Colors.lightSand,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.sm,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  streamButtonSelected: {
    borderColor: '#FFFFFF',
    ...Shadows.md,
  },
  streamButtonText: {
    fontSize: Typography.sizes['2xl'],
    fontWeight: Typography.weights.bold,
    color: Colors.text,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  streamButtonTextSelected: {
    color: Colors.white,
  },
  streamDescription: {
    fontSize: Typography.sizes.sm,
    color: Colors.textOpacity(0.6),
    textAlign: 'center',
    lineHeight: Typography.sizes.sm * 1.5,
  },
  streamDescriptionSelected: {
    color: Colors.whiteOpacity(0.8),
  },
  backButton: {
    marginTop: Spacing.xl,
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: Typography.sizes.base,
    color: Colors.primary,
    fontWeight: Typography.weights.semibold,
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