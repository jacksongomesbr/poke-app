import { View } from "react-native";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { StyleSheet, Image, Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ExternalLink } from "@/components/ExternalLink";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Collapsible } from "@/components/Collapsible";


export default function Modal() {
  const insets = useSafeAreaInsets();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={310} name="help-circle" style={styles.headerImage} />
      }
    >
      <ThemedView
        style={{ flex: 1, paddingTop: insets.top, ...styles.titleContainer }}
      >
        <ThemedText type="title">Explorador de Pokémons</ThemedText>
      </ThemedView>
      <ThemedText>
        Este app apresenta informações sobre Pokémons obtidas a partir da{" "}
        <ExternalLink href="https://pokeapi.co/">
          <ThemedText type="link">Poké API</ThemedText>
        </ExternalLink>
        .
      </ThemedText>
      <ThemedText>
        Os principais recursos utilizados para construir este app são
        apresentados a seguir.
      </ThemedText>
      <Collapsible title="Rotas baseadas em pastas e arquivos">
        <ThemedText>
          Este app tem três telas:{" "}
          <ThemedText type="defaultSemiBold">app/index.tsx</ThemedText> ,{" "}
          <ThemedText type="defaultSemiBold">
            app/detalhes/[slug].tsx
          </ThemedText>
          , e <ThemedText type="defaultSemiBold">app/modal.tsx</ThemedText>.
        </ThemedText>
        <ThemedText>
          O arquivo de layout{" "}
          <ThemedText type="defaultSemiBold">app/_layout.tsx</ThemedText> define
          as rotas de navegação para as telas.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <ThemedText type="link">Saiba mais</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Suporte a tema claro e escuro">
        <ThemedText>
          O aplicativo suporta os modos de tema claro e escuro. O hook{" "}
          <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText>{" "}
          identifica o schema de cores do sistema do usuário para que seja
          possível ajustar o tema de cores do aplicativo.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <ThemedText type="link">Saiba mais</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Dados obtidos de uma API">
        <ThemedText>
          Este aplicativo obtém dados da PokéAPI por meio da função{" "}
          <ThemedText type="defaultSemiBold">fetch()</ThemedText>.
        </ThemedText>
        <ThemedText>
          São obtidas informações de dois endpoints da API:
        </ThemedText>
        <ThemedText>
          -{" "}
          <ThemedText type="defaultSemiBold">
            https://pokeapi.co/api/v2/pokemon
          </ThemedText>{" "}
          retorna uma lista dos Pokémons. Neste caso, a lista de nomes é
          utilizada para construir a tela inicial.
        </ThemedText>
        <ThemedText>
          -{" "}
          <ThemedText type="defaultSemiBold">
            https://pokeapi.co/api/v2/pokemon/name/
          </ThemedText>{" "}
          retorna informações de um Pokémon, identificado pelo parâmetro de rota{" "}
          <ThemedText type="defaultSemiBold">
            name
          </ThemedText>
          .{" "}
          Os detalhes do Pokémon são utilizados para construir
          a tela de detalhes.
        </ThemedText>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
