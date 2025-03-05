import { Image, TouchableOpacity, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { ArtTool } from "../types/artTool";
import { calculateAvgRating, formatTwoDecimal } from "../utils/utils";
import Rating from "./Rating";

export default function ArtToolCard({ artTool }: { artTool: ArtTool }) {
  function onCardPress() {}

  return (
    <TouchableOpacity style={{ flex: 1 }} onPress={onCardPress}>
      <Card style={{ flex: 1 }}>
        <Card.Content style={{ gap: 8, height: "100%" }}>
          <View
            style={{
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            <Image
              style={{ width: "100%", height: 160 }}
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
            <Rating
              rating={
                artTool.feedbacks
                  ? calculateAvgRating(artTool.feedbacks.map((fb) => fb.rating))
                  : 0
              }
            />
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
                {formatTwoDecimal(
                  artTool.price * (1 - artTool.limitedTimeDeal)
                )}
                $
              </Text>
              <Text
                variant="labelSmall"
                style={{ fontWeight: "bold", color: "lightgreen" }}
              >
                Save {artTool.limitedTimeDeal * 100}%
              </Text>
            </View>
          )}
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
}
