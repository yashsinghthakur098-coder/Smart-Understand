# LearnSmart - Educational App

An educational app designed with a Modern Zen aesthetic to help students from Class 1 to 12+ master concepts with bite-sized learning and AI assistance.

## 🎨 Phase 1: Foundation & Aesthetic (Complete)

Phase 1 establishes the foundational structure and implements the Modern Zen design system.

### ✅ Completed Features

#### Project Setup
- ✅ Expo app with TypeScript
- ✅ Expo Router for navigation
- ✅ Support for Android, iOS, and Web
- ✅ Lottie animations integrated

#### Modern Zen Theme
- **Primary Color (Sage Green)**: `#5A8B6F` - Focus and action elements
- **Background (Warm Sand)**: `#E8DCC4` - Eye-comfortable background
- **Text (Charcoal Grey)**: `#2C2C2C` - Sharp, readable contrast
- **Light Sand**: `#F5F1E8` - Card backgrounds
- **White**: `#FFFFFF` - High contrast elements

#### Design System
- Centralized theme configuration (`constants/theme.ts`)
- Consistent spacing and typography
- 16px border radius (Superellipse style) for all cards
- Glassmorphism styling for navigation bar
- Professional, minimalist aesthetic
- Smooth shadow system

#### Welcome Slider (3 Screens)
1. **Learn Faster**: Introduction to concept cards
2. **Meet Smarty**: Your AI Study Buddy
3. **Excel in Every Subject**: Class 1-12+ support

Features:
- Swipe gesture navigation
- Lottie animations for each screen
- Next/Skip buttons
- "Get Started" button on final screen

#### Authentication Screen
- Clean, minimal design
- Login and Sign Up modes
- Email and password fields
- Responsive layout
- Professional button styling

#### Navigation Structure
- Welcome Slider → Auth → Main App (Tabs)
- Smooth transitions between screens
- Custom themed tab navigation

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or later)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm start

# Run on specific platforms
npm run android  # Android
npm run ios      # iOS (macOS only)
npm run web      # Web
```

### Development Workflow

1. **Welcome Flow**: App starts with 3-screen welcome slider
2. **Authentication**: After welcome slider, users see the auth screen
3. **Main App**: After auth, users enter the main tabbed interface

## 📱 Screens

### Current Screens
- `/welcome` - 3-screen welcome slider
- `/auth` - Login/Sign up screen
- `/(tabs)/` - Main app with Home and Explore tabs

### Navigation Flow
```
Index (/) → Welcome Slider → Auth → Main App (Tabs)
```

## 🎯 Coming in Future Phases

- **Phase 2**: Core learning features
  - Concept Cards system
  - Subject and grade selection
  - Chapter browsing

- **Phase 3**: AI Integration
  - Smarty AI Study Buddy
  - Conversational help system
  - Smart suggestions

- **Phase 4**: Progress & Practice
  - Progress tracking
  - Practice quizzes
  - Achievement system

## 🎨 Design Guidelines

### Typography
- Headings: Bold, with negative letter-spacing
- Body: Regular weight, 1.5-1.6 line-height
- Sizes range from 12px (xs) to 36px (4xl)

### Spacing
- Consistent spacing scale (4px, 8px, 16px, 24px, 32px, 48px, 64px)
- Generous white space for minimalist feel

### Components
- All cards use 16px border radius
- Shadows for depth (small, medium, large)
- Glassmorphism for floating elements
- Professional color palette (no bright/childish colors)

### Animations
- Lottie for purposeful animations
- Smooth transitions between screens
- No noisy or distracting animations

## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: Expo Router (file-based routing)
- **Animations**: Lottie React Native
- **Platforms**: iOS, Android, Web

## 📂 Project Structure

```
/app
  /(tabs)          # Main tabbed interface
    index.tsx      # Home screen
    two.tsx        # Explore screen
    _layout.tsx    # Tab navigation config
  /auth            # Authentication screens
    index.tsx      # Login/Sign up
  /welcome         # Welcome slider screens
    index.tsx      # 3-screen slider
  index.tsx        # Entry point (redirects to welcome)
  _layout.tsx      # Root navigation config

/components
  /welcome         # Welcome-specific components
    WelcomeSlide.tsx

/constants
  theme.ts         # Modern Zen theme configuration
  Colors.ts        # Legacy colors (kept for compatibility)

/assets
  /animations      # Lottie animation files
    rocket.json
    robot.json
    trophy.json
```

## 🎯 Quality Assurance

✅ No console errors  
✅ Smooth animations without lag  
✅ Proper loading states  
✅ Professional color implementation  
✅ All UI elements properly themed  
✅ Responsive design (mobile-first)  
✅ Works on iOS, Android, and Web  

## 📝 Notes

- The app currently uses light mode only (Modern Zen aesthetic)
- Authentication is UI-only in Phase 1 (no backend)
- Lottie animations are simplified for Phase 1
- Future phases will add full functionality

## 🤝 Contributing

This is Phase 1 of the LearnSmart app. Future phases will add more features and functionality.

---

Built with ❤️ using React Native and Expo
