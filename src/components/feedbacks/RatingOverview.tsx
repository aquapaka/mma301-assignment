import { View } from "react-native";
import { ProgressBar, Text } from "react-native-paper";
import { calculateAvgRating } from "../../utils/utils";
import Rating from "../Rating";
import { ArtTool } from "../../types/artTool";

export default function RatingOverview({ artTool }: { artTool: ArtTool }) {
  const rating1Count = artTool.feedbacks.filter((fb) => fb.rating === 1).length;
  const rating2Count = artTool.feedbacks.filter((fb) => fb.rating === 2).length;
  const rating3Count = artTool.feedbacks.filter((fb) => fb.rating === 3).length;
  const rating4Count = artTool.feedbacks.filter((fb) => fb.rating === 4).length;
  const rating5Count = artTool.feedbacks.filter((fb) => fb.rating === 5).length;

  return (
    <View style={{ flex: 1, flexDirection: "row", gap: 16 }}>
      <View style={{ flex: 3, justifyContent: "center", alignItems: "center" }}>
        <Text variant="headlineLarge" style={{ fontWeight: "bold" }}>
          {artTool.feedbacks.length
            ? calculateAvgRating(artTool.feedbacks.map((fb) => fb.rating))
            : "None"}
        </Text>
        <Rating
          rating={
            artTool.feedbacks.length
              ? calculateAvgRating(artTool.feedbacks.map((fb) => fb.rating))
              : 0
          }
        />
        <Text variant="labelSmall">{artTool.feedbacks.length} ratings</Text>
      </View>
      <View style={{ flex: 7 }}>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            alignItems: "center",
            gap: 8,
          }}
        >
          <View style={{ flex: 1 }}>
            <ProgressBar
              progress={
                artTool.feedbacks.length > 0
                  ? rating5Count / artTool.feedbacks.length
                  : 0
              }
            />
          </View>
          <Text variant="labelSmall" style={{ fontWeight: "bold" }}>
            5.0
          </Text>
          <Text variant="labelSmall">{rating5Count} ratings</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            alignItems: "center",
            gap: 8,
          }}
        >
          <View style={{ flex: 1 }}>
            <ProgressBar
              progress={
                artTool.feedbacks.length > 0
                  ? rating4Count / artTool.feedbacks.length
                  : 0
              }
            />
          </View>
          <Text variant="labelSmall" style={{ fontWeight: "bold" }}>
            4.0
          </Text>
          <Text variant="labelSmall">{rating4Count} ratings</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            alignItems: "center",
            gap: 8,
          }}
        >
          <View style={{ flex: 1 }}>
            <ProgressBar
              progress={
                artTool.feedbacks.length > 0
                  ? rating3Count / artTool.feedbacks.length
                  : 0
              }
            />
          </View>
          <Text variant="labelSmall" style={{ fontWeight: "bold" }}>
            3.0
          </Text>
          <Text variant="labelSmall">{rating3Count} ratings</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            flex: 1,
            alignItems: "center",
            gap: 8,
          }}
        >
          <View style={{ flex: 1 }}>
            <ProgressBar
              progress={
                artTool.feedbacks.length > 0
                  ? rating2Count / artTool.feedbacks.length
                  : 0
              }
            />
          </View>
          <Text variant="labelSmall" style={{ fontWeight: "bold" }}>
            2.0
          </Text>
          <Text variant="labelSmall">{rating2Count} ratings</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            alignItems: "center",
            gap: 8,
          }}
        >
          <View style={{ flex: 1 }}>
            <ProgressBar
              progress={
                artTool.feedbacks.length > 0
                  ? rating1Count / artTool.feedbacks.length
                  : 0
              }
            />
          </View>
          <Text variant="labelSmall" style={{ fontWeight: "bold" }}>
            1.0
          </Text>
          <Text variant="labelSmall">{rating1Count} ratings</Text>
        </View>
      </View>
    </View>
  );
}
