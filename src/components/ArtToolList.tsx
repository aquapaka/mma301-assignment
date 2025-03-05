import { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { ActivityIndicator, Chip, Searchbar, Text } from "react-native-paper";
import { ArtTool } from "../types/artTool";
import ArtToolCard from "./ArtToolCard";
import { fuzzySearch } from "../utils/fuzzySearch";

export default function ArtToolList({
  artTools,
  isFetching,
}: {
  artTools: ArtTool[];
  isFetching: boolean;
}) {
  const brands = useMemo(
    () => [...new Set(artTools.map((artTool) => artTool.brand))],
    [artTools]
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredArtTools = useMemo(() => {
    const filtered = artTools.filter((artTool) =>
      selectedBrands.includes(artTool.brand)
    );
    return fuzzySearch(
      filtered.length ? filtered : artTools,
      ["artName", "brand"],
      searchQuery + " "
    ).map(({ item }) => item);
  }, [artTools, selectedBrands, searchQuery]);

  return (
    <FlatList
      ListHeaderComponent={
        <View style={{ gap: 8 }}>
          <Searchbar
            placeholder="Search art tool..."
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
          <View
            style={{
              flexDirection: "row",
              gap: 8,
              flexWrap: "wrap",
              paddingBottom: 8,
            }}
          >
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
        </View>
      }
      ListEmptyComponent={
        isFetching ? (
          <ActivityIndicator animating={true} />
        ) : (
          <Text style={{ textAlign: "center" }}>No item found</Text>
        )
      }
      data={
        !searchQuery.length && !selectedBrands.length
          ? artTools
          : filteredArtTools
      }
      keyExtractor={(item) => item.id}
      numColumns={2}
      contentContainerStyle={{
        alignItems: "stretch",
        padding: 8,
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
  );
}
