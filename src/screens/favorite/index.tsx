import { useEffect, useState } from "react";
import { View } from "react-native";
import artToolApi from "../../apis/artToolApi";
import ArtToolList from "../../components/ArtToolList";
import { useStorage } from "../../context/StorageProvider";
import { ArtTool } from "../../types/artTool";

export default function FavoriteScreen() {
  const [artTools, setArtTools] = useState<ArtTool[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const { storage, loading: storageLoading } = useStorage();
  const favoriteIds: string[] = storage.favoriteIds;
  const favoriteArtTools = favoriteIds
    ? artTools.filter((at) => favoriteIds.includes(at.id))
    : [];

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      const artTools = await artToolApi.getAll();
      setArtTools(artTools);
      setIsFetching(false);
    }

    fetchData();
  }, []);

  return (
    <View>
      <ArtToolList
        artTools={favoriteArtTools}
        isFetching={isFetching || storageLoading}
      />
    </View>
  );
}
