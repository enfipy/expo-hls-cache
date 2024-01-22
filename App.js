import { StatusBar } from 'expo-status-bar';
import Video from 'react-native-video';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Hey, it's working!</Text>
      <Video style={styles.video} muted source={{ uri: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    height: 200,
    width: 200,
  },
});
