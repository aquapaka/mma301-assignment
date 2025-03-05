import { useMemo, useState } from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { ActivityIndicator, Chip, Text } from "react-native-paper";
import { ArtTool } from "../types/artTool";
import ArtToolCard from "./ArtToolCard";

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
  const filteredArtTools = useMemo(
    () => artTools.filter((artTool) => selectedBrands.includes(artTool.brand)),
    [artTools, selectedBrands]
  );

  return (
    <FlatList
      ListHeaderComponent={
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
      }
      ListEmptyComponent={
        isFetching ? (
          <ActivityIndicator animating={true} />
        ) : (
          <Text style={{ textAlign: "center" }}>No item found</Text>
        )
      }
      data={filteredArtTools.length ? filteredArtTools : artTools}
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
