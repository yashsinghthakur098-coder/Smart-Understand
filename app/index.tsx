import { Redirect } from 'expo-router';

export default function Index() {
  // Start with the welcome screen
  return <Redirect href="/welcome" />;
}
