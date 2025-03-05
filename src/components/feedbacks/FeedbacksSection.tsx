import { useMemo, useState } from "react";
import { View } from "react-native";
import { Chip } from "react-native-paper";
import { Feedback } from "../../types/artTool";
import FeedbacksList from "./FeedbacksList";

export default function FeedbacksSection({
  feedbacks,
}: {
  feedbacks: Feedback[];
}) {
  const [selectedRating, setSelectedRating] = useState<number | null>();
  const ratings = [5, 4, 3, 2, 1];
  const filteredFeedbacks = useMemo(
    () => feedbacks.filter((fb) => selectedRating === fb.rating),
    [feedbacks, selectedRating]
  );

  return (
    <View style={{ paddingTop: 12 }}>
      <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
        {ratings.map((rating) => (
          <Chip
            key={rating}
            selected={selectedRating === rating}
            style={{ flex: 1, borderWidth: 0 }}
            icon="star"
            mode={selectedRating === rating ? "flat" : "outlined"}
            onPress={() => {
              if (selectedRating === rating) {
                setSelectedRating(null);
                return;
              }
              setSelectedRating(rating);
            }}
          >
            {rating}
          </Chip>
        ))}
      </View>

      <FeedbacksList
        feedbacks={selectedRating ? filteredFeedbacks : feedbacks}
      />
    </View>
  );
}
