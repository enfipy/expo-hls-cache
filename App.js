import { useRef, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import Video from "react-native-video";
import { DeviceEventEmitter, StyleSheet, Text, View } from "react-native";
import {
  HLS_CACHING_RESTART,
  CacheManagerProvider,
  LFUPolicy,
  useAsyncCache,
} from "react-native-cache-video";

export default function App() {
  const freePolicyRef = useRef(new LFUPolicy(5));
  const { setVideoPlayUrlBy, cachedVideoUrl } = useAsyncCache();

  const uri = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";
  useEffect(() => {
    const listener = DeviceEventEmitter.addListener(HLS_CACHING_RESTART, () => {
      setVideoPlayUrlBy(uri);
    });
    return () => {
      listener.remove();
    };
  }, [setVideoPlayUrlBy]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <CacheManagerProvider cachePolicy={freePolicyRef}>
        <Text>Hey, it's working!</Text>
        <Video
          style={styles.video}
          muted
          source={{ uri: cachedVideoUrl || uri }}
        />
      </CacheManagerProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  video: {
    height: 200,
    width: 200,
  },
});
