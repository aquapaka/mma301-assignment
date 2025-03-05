import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import artToolApi from "../../apis/artToolApi";
import ArtToolCard from "../../components/ArtToolCard";
import { ArtTool } from "../../types/artTool";

export default function HomeScreen() {
  const [artTools, setArtTools] = useState<ArtTool[]>([]);

  useEffect(() => {
    async function fetchApi() {
      const artTools = await artToolApi.getAll();
      setArtTools(artTools);
    }

    fetchApi();
  }, []);

  return (
    <View style={{ padding: 8 }}>
      <FlatList
        data={artTools}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{
          alignItems: "stretch",
        }}
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
        renderItem={({ item }) => (
          <View style={{ width: "49%", marginBottom: 8 }}>
            <ArtToolCard artTool={item} />
          </View>
        )}
      />
    </View>
  );
}
