import { useEffect, useState } from "react";
import { View } from "react-native";
import artToolApi from "../../apis/artToolApi";
import ArtToolList from "../../components/ArtToolList";
import { ArtTool } from "../../types/artTool";

export default function HomeScreen() {
  const [artTools, setArtTools] = useState<ArtTool[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    async function fetchApi() {
      setIsFetching(true);
      const artTools = await artToolApi.getAll();
      setArtTools(artTools);
      setIsFetching(false);
    }

    fetchApi();
  }, []);

  return (
    <View>
      <ArtToolList artTools={artTools} isFetching={isFetching} />
    </View>
  );
}
