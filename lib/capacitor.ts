import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Keyboard } from '@capacitor/keyboard';
import { App } from '@capacitor/app';

export const isNative = Capacitor.isNativePlatform();
export const platform = Capacitor.getPlatform();

export async function initCapacitor() {
  if (!isNative) return;

  // Hide splash screen after app loads
  await SplashScreen.hide();

  // Configure status bar
  if (platform !== 'web') {
    await StatusBar.setStyle({ style: Style.Dark });

    if (platform === 'android') {
      await StatusBar.setBackgroundColor({ color: '#111827' });
    }
  }

  // Handle keyboard events on iOS
  if (platform === 'ios') {
    Keyboard.addListener('keyboardWillShow', () => {
      document.body.classList.add('keyboard-open');
    });
    Keyboard.addListener('keyboardWillHide', () => {
      document.body.classList.remove('keyboard-open');
    });
  }

  // Handle back button on Android
  if (platform === 'android') {
    App.addListener('backButton', ({ canGoBack }) => {
      if (canGoBack) {
        window.history.back();
      } else {
        App.exitApp();
      }
    });
  }
}

// Update status bar based on theme
export async function updateStatusBarTheme(isDark: boolean) {
  if (!isNative || platform === 'web') return;

  await StatusBar.setStyle({
    style: isDark ? Style.Dark : Style.Light,
  });

  if (platform === 'android') {
    await StatusBar.setBackgroundColor({
      color: isDark ? '#030712' : '#ffffff',
    });
  }
}
