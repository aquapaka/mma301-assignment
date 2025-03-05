import { Image, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { ArtTool } from "../types/artTool";
import { formatTwoDecimal } from "../utils/utils";

export default function ArtToolDetailCard({ artTool }: { artTool: ArtTool }) {
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
        <Text variant="labelSmall">{artTool.brand}</Text>
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
