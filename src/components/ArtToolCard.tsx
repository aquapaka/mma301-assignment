import { NavigationProp, useNavigation } from "@react-navigation/native";
import {
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Card, IconButton, Text } from "react-native-paper";
import { useStorage } from "../context/StorageProvider";
import { ArtTool } from "../types/artTool";
import {
  HomeStackParamList,
  RootTabParamList,
} from "../types/navigationParamLists";
import { calculateAvgRating, formatTwoDecimal } from "../utils/utils";
import Rating from "./Rating";

export default function ArtToolCard({ artTool }: { artTool: ArtTool }) {
  const navigation =
    useNavigation<NavigationProp<RootTabParamList & HomeStackParamList>>();
  const {
    storage,
    addFavorite,
    removeFavorite,
    loading: storageLoading,
  } = useStorage();
  const favoriteIds: string[] = storage.favoriteIds ? storage.favoriteIds : [];
  const isFavorited = favoriteIds.includes(artTool.id);

  function onCardPress(id: string) {
    // @ts-ignore
    navigation.navigate("HomeStack", { screen: "Detail", params: { id: id } });
  }

  return (
    <TouchableOpacity
      style={{ flex: 1 }}
      onPress={() => onCardPress(artTool.id)}
    >
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
          <View>
            <Text variant="labelSmall">{artTool.brand}</Text>
            <TouchableWithoutFeedback>
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
            </TouchableWithoutFeedback>
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
