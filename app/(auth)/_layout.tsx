import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="welcome" />
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
      <Stack.Screen name="forgot-password" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="contact-us" />
      <Stack.Screen name="edit-profile" />
      <Stack.Screen name="theme" />
    </Stack>
  );
}
