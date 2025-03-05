import { View } from "react-native";
import { Avatar, Text } from "react-native-paper";
import { Feedback } from "../../types/artTool";
import { timeAgo } from "../../utils/utils";
import Rating from "../Rating";

export default function FeedbacksList({
  feedbacks,
}: {
  feedbacks: Feedback[];
}) {
  return (
    <View
      style={{
        alignItems: "stretch",
        gap: 32,
        paddingVertical: 16,
      }}
    >
      {feedbacks.map((fb) => (
        <View style={{ gap: 8 }}>
          <View
            key={fb.author + fb.date}
            style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
          >
            <Avatar.Text size={32} label={fb.author.substring(0, 2)} />
            <Text variant="labelLarge" style={{ fontWeight: "bold" }}>
              {fb.author}
            </Text>
            <Text variant="labelSmall" style={{ fontWeight: "light" }}>
              {timeAgo(new Date(fb.date))}
            </Text>
            <View style={{ flex: 1, flexDirection: "row-reverse" }}>
              <Rating rating={fb.rating} />
            </View>
          </View>
          <Text variant="bodySmall">{fb.comment}</Text>
        </View>
      ))}
    </View>
  );
}
