import { Card, Text } from "react-native-paper";
import { ArtTool } from "../../types/artTool";
import RatingOverview from "./RatingOverview";

export default function Feedbacks({ artTool }: { artTool: ArtTool }) {
  return (
    <Card style={{ marginTop: 8 }}>
      <Card.Content style={{ gap: 8 }}>
        <Text variant="titleMedium">Feedbacks</Text>

        <RatingOverview artTool={artTool} />
      </Card.Content>
    </Card>
  );
}
