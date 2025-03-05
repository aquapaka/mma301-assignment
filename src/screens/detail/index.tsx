import { useEffect, useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ActivityIndicator, Text } from "react-native-paper";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import artToolApi from "../../apis/artToolApi";
import ArtToolDetailCard from "../../components/ArtToolDetailCard";
import Feedbacks from "../../components/feedbacks";
import { ArtTool } from "../../types/artTool";
import { HomeStackParamList } from "../../types/navigationParamLists";

export default function DetailScreen({
  route,
}: NativeStackScreenProps<HomeStackParamList, "Detail">) {
  const [artTool, setArtTool] = useState<ArtTool | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const { id } = route.params;

  useEffect(() => {
    const fetchApi = async () => {
      setIsFetching(true);
      const data = await artToolApi.getById(id);
      if (!data.feedbacks) data.feedbacks = [];
      setArtTool(data);
      setIsFetching(false);
    };

    fetchApi();
  }, [id]);

  if (isFetching) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <ActivityIndicator animating={true} />
      </View>
    );
  }
  if (!artTool) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <Text>Can't find this item</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ padding: 8 }}>
      <ArtToolDetailCard artTool={artTool} />
      <Feedbacks artTool={artTool} />
    </ScrollView>
  );
}
