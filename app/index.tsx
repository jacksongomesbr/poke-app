import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { Divider } from "react-native-paper";

export default function Index() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [erro, setErro] = useState();

  const getData = async () => {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0"
      );
      const json = await response.json();
      setData(json.results);
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

  const getListItem = ({ item }) => (
    <ThemedView style={{ marginBottom: 15, marginTop: 15 }}>
      <Link href={`/detalhes/${item.name}`}>
        <ThemedText>{item.name}</ThemedText>
      </Link>
    </ThemedView>
  );

  return (
    <ThemedView style={{ flex: 1, padding: 24 }}>
      <ThemedText type="title">Lista de Pokémons</ThemedText>
      <ThemedText style={{ marginBottom: 20 }}>
        Pressione um item da lista para ver detalhes
      </ThemedText>
      {isLoading ? (
        <ActivityIndicator />
      ) : data ? (
        <FlatList
          data={data}
          keyExtractor={({ name }) => name}
          renderItem={getListItem}
          ItemSeparatorComponent={() => <Divider></Divider>}
        />
      ) : (
        <ThemedView
          style={{ flex: 1, paddingTop: insets.top, ...styles.titleContainer }}
        >
          <ThemedText>{erro}</ThemedText>
        </ThemedView>
      )}
    </ThemedView>
  );
}
