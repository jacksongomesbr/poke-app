import ParallaxScrollView from "@/components/ParallaxScrollView";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { ThemedView } from "@/components/ThemedView";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";

export default function Details() {
  const { slug } = useLocalSearchParams();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [erro, setErro] = useState();
  const insets = useSafeAreaInsets();

  const getData = async () => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${slug}/`
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
      setErro(`Erro ao obter os dados: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: `center` }}>
          <ActivityIndicator />
        </View>
      ) : data ? (
        <ParallaxScrollView
          headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
          headerImage={
            <Image
              source={{ uri: data.sprites.front_default }}
              style={{ ...styles.headerImage }}
            ></Image>
          }
        >
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">{data.name}</ThemedText>
            <ThemedText>Height {data.height}</ThemedText>
            <ThemedText>Weight {data.weight}</ThemedText>
          </ThemedView>
        </ParallaxScrollView>
      ) : (
        <ThemedView
          style={{ flex: 1, paddingTop: insets.top, ...styles.titleContainer }}
        >
          <Text>{erro}</Text>
        </ThemedView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    height: "100%",
    width: "100%",
    bottom: -50,
    position: "absolute",
  },
  titleContainer: {
    gap: 8,
  },
});
