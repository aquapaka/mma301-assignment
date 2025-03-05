import { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import artToolApi from "../../apis/artToolApi";
import ArtToolCard from "../../components/ArtToolCard";
import { ArtTool } from "../../types/artTool";
import { ActivityIndicator, Chip, Text } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";

export default function HomeScreen() {
  const [artTools, setArtTools] = useState<ArtTool[]>([]);
  const brands = useMemo(
    () => [...new Set(artTools.map((artTool) => artTool.brand))],
    [artTools]
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const filteredArtTools = useMemo(
    () => artTools.filter((artTool) => selectedBrands.includes(artTool.brand)),
    [artTools, selectedBrands]
  );
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    async function fetchApi() {
      setIsFetching(true);
      const artTools = await artToolApi.getAll();
      setArtTools(artTools);
      setIsFetching(false);
    }

    fetchApi();
  }, []);

  return (
    <View style={{ padding: 8 }}>
      <FlatList
        ListHeaderComponent={
          <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
            {brands.map((brand) => (
              <Chip
                key={brand}
                selected={selectedBrands.includes(brand)}
                onPress={() =>
                  setSelectedBrands((selectedBrands) =>
                    selectedBrands.includes(brand)
                      ? selectedBrands.filter((b) => b !== brand)
                      : [brand, ...selectedBrands]
                  )
                }
              >
                {brand}
              </Chip>
            ))}
          </View>
        }
        ListEmptyComponent={
          isFetching ? (
            <ActivityIndicator animating={true} />
          ) : (
            <Text>No item found</Text>
          )
        }
        data={filteredArtTools.length ? filteredArtTools : artTools}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{
          alignItems: "stretch",
          gap: 8,
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
