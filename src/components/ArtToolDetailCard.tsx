import { Image, View } from "react-native";
import { Card, IconButton, Text } from "react-native-paper";
import { ArtTool } from "../types/artTool";
import { formatTwoDecimal } from "../utils/utils";
import { useStorage } from "../context/StorageProvider";

export default function ArtToolDetailCard({ artTool }: { artTool: ArtTool }) {
  const {
    storage,
    addFavorite,
    removeFavorite,
    loading: storageLoading,
  } = useStorage();
  const favoriteIds: string[] = storage.favoriteIds ? storage.favoriteIds : [];
  const isFavorited = favoriteIds.includes(artTool.id);

  return (
    <Card>
      <Card.Content style={{ gap: 8 }}>
        <View
          style={{
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          <Image
            style={{ width: "100%", height: 280 }}
            source={{ width: 300, height: 300, uri: artTool.image }}
          />
        </View>

        {/* Title, price and rating */}
        <View>
          <Text variant="labelSmall">{artTool.brand}</Text>
          <IconButton
            style={{
              position: "absolute",
              top: -8,
              right: -4,
              justifyContent: "center",
              padding: 0,
              margin: 0,
              aspectRatio: 1,
            }}
            onPress={() => {
              if (isFavorited) {
                removeFavorite(artTool.id);
                return;
              }
              addFavorite(artTool.id);
            }}
            icon={isFavorited ? "heart" : "heart-outline"}
            iconColor="crimson"
            size={20}
          />
        </View>

        <Text variant="titleSmall" style={{ textAlign: "justify" }}>
          {artTool.artName}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            variant="titleLarge"
            style={{
              fontWeight: "bold",
              ...(artTool.limitedTimeDeal > 0
                ? {
                    textDecorationLine: "line-through",
                    color: "gray",
                  }
                : {
                    color: "lightgreen",
                  }),
            }}
          >
            {artTool.price}$
          </Text>
        </View>

        {/* Limited time deal row */}
        {artTool.limitedTimeDeal > 0 && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              variant="titleLarge"
              style={{ fontWeight: "bold", color: "orange" }}
            >
              {formatTwoDecimal(artTool.price * (1 - artTool.limitedTimeDeal))}$
            </Text>
            <Text
              variant="labelSmall"
              style={{ fontWeight: "bold", color: "lightgreen" }}
            >
              Save {artTool.limitedTimeDeal * 100}%
            </Text>
          </View>
        )}

        {/* Detail information */}
        <View style={{ gap: 8, marginTop: 8 }}>
          <Text variant="labelMedium" style={{ fontWeight: "bold" }}>
            Description
          </Text>
          <Text variant="bodySmall">{artTool.description}</Text>

          <Text variant="labelMedium" style={{ fontWeight: "bold" }}>
            Brand
          </Text>
          <Text variant="bodySmall">{artTool.brand}</Text>

          <Text variant="labelMedium" style={{ fontWeight: "bold" }}>
            Glass surface
          </Text>
          <Text variant="bodySmall">{artTool.glassSurface ? "Yes" : "No"}</Text>
        </View>
      </Card.Content>
    </Card>
  );
}
