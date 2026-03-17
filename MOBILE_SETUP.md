# Positive Tribe — Mobile App (Capacitor)

This project uses [Capacitor](https://capacitorjs.com) to wrap the Next.js web app as a native iOS and Android app.

## Prerequisites

- **Node.js** 18+
- **iOS**: macOS with Xcode 15+ and CocoaPods (`sudo gem install cocoapods`)
- **Android**: Android Studio with SDK 33+

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Build the web app

```bash
npm run build
```

This creates a static export in the `out/` directory.

### 3. Add native platforms

```bash
npx cap add ios
npx cap add android
```

### 4. Sync web assets to native projects

```bash
npx cap sync
```

### 5. Open in IDE

```bash
# iOS (opens Xcode)
npm run cap:open:ios

# Android (opens Android Studio)
npm run cap:open:android
```

### 6. Run on device/simulator

```bash
# iOS
npm run cap:run:ios

# Android
npm run cap:run:android
```

## Development Workflow

After making web changes:

```bash
npm run build:mobile
```

This builds the Next.js app and syncs to native platforms in one command.

## Project Structure

```
├── capacitor.config.ts      # Capacitor configuration
├── lib/capacitor.ts          # Native plugin initialization
├── components/
│   └── capacitor-provider.tsx # React provider for native features
├── ios/                      # iOS native project (gitignored, generated)
├── android/                  # Android native project (gitignored, generated)
└── out/                      # Static build output (webDir for Capacitor)
```

## App Configuration

Edit `capacitor.config.ts` to change:
- `appId`: Bundle ID (e.g., `com.positivetribe.app`)
- `appName`: Display name on device
- `plugins`: Native plugin settings (splash screen, status bar, etc.)

## App Store Submission

### iOS
1. Open `ios/App/App.xcworkspace` in Xcode
2. Set your Team in Signing & Capabilities
3. Replace app icons in `ios/App/App/Assets.xcassets/AppIcon.appiconset/`
4. Archive and submit via Xcode

### Android
1. Open `android/` in Android Studio
2. Update `android/app/src/main/AndroidManifest.xml` as needed
3. Replace app icons in `android/app/src/main/res/`
4. Build > Generate Signed Bundle/APK
