import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '@/constants/theme';
import { useUserStore } from '@/stores/userStore';

const { width } = Dimensions.get('window');

export default function AuthScreen() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleAuth = () => {
    // Store user credentials in the user store
    useUserStore.getState().setUserCredentials(
      isSignUp ? name : 'User',
      email
    );
    
    // Navigate to class selection
    router.replace('/(auth)/class-selection');
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>LearnSmart</Text>
          <Text style={styles.tagline}>
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </Text>
        </View>

        {/* Form Card */}
        <View style={styles.card}>
          {isSignUp && (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                placeholderTextColor={Colors.textOpacity(0.4)}
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>
          )}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor={Colors.textOpacity(0.4)}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor={Colors.textOpacity(0.4)}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          {!isSignUp && (
            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.primaryButton} onPress={handleAuth}>
            <Text style={styles.primaryButtonText}>
              {isSignUp ? 'Create Account' : 'Sign In'}
            </Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity style={styles.secondaryButton} onPress={toggleMode}>
            <Text style={styles.secondaryButtonText}>
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
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
    paddingTop: Platform.OS === 'ios' ? Spacing['3xl'] : Spacing.xl,
    paddingBottom: Spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing['2xl'],
  },
  logo: {
    fontSize: Typography.sizes['4xl'],
    fontWeight: Typography.weights.bold,
    color: Colors.primary,
    marginBottom: Spacing.sm,
    letterSpacing: -1,
  },
  tagline: {
    fontSize: Typography.sizes.lg,
    color: Colors.textOpacity(0.6),
    fontWeight: Typography.weights.medium,
  },
  card: {
    backgroundColor: Colors.lightSand,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    ...Shadows.md,
  },
  inputContainer: {
    marginBottom: Spacing.lg,
  },
  label: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
    color: Colors.text,
    marginBottom: Spacing.sm,
    letterSpacing: 0.3,
  },
  input: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md + 2,
    fontSize: Typography.sizes.base,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.textOpacity(0.1),
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: Spacing.lg,
  },
  forgotPasswordText: {
    fontSize: Typography.sizes.sm,
    color: Colors.primary,
    fontWeight: Typography.weights.medium,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.md + 4,
    alignItems: 'center',
    ...Shadows.sm,
  },
  primaryButtonText: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
    color: Colors.white,
    letterSpacing: 0.3,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.textOpacity(0.2),
  },
  dividerText: {
    marginHorizontal: Spacing.md,
    fontSize: Typography.sizes.sm,
    color: Colors.textOpacity(0.5),
    fontWeight: Typography.weights.medium,
  },
  secondaryButton: {
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: Typography.sizes.base,
    color: Colors.primary,
    fontWeight: Typography.weights.semibold,
  },
  footer: {
    marginTop: Spacing.xl,
    fontSize: Typography.sizes.xs,
    color: Colors.textOpacity(0.5),
    textAlign: 'center',
    lineHeight: Typography.sizes.xs * 1.5,
    paddingHorizontal: Spacing.lg,
  },
});
