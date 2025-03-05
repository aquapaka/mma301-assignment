import { useEffect, useMemo, useState } from "react";
import { FlatList, View } from "react-native";
import artToolApi from "../../apis/artToolApi";
import ArtToolCard from "../../components/ArtToolCard";
import { ArtTool } from "../../types/artTool";
import { Chip } from "react-native-paper";

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
        ListHeaderComponent={
          <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
            {brands.map((brand) => (
              <Chip
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
