import { useState } from "react";
import { View } from "react-native";
import { Menu, Divider, Button } from "react-native-paper";

export default function FavoriteScreen() {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <View
      style={{
        paddingTop: 50,
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Button onPress={openMenu}>Show menu</Button>}
      >
        <Menu.Item
          leadingIcon={"lock-alert-outline"}
          onPress={() => {}}
          title="Item 1"
        />
        <Menu.Item leadingIcon={"redo"} onPress={() => {}} title="Item 2" />
        <Divider />
        <Menu.Item onPress={() => {}} title="Item 3" />
      </Menu>
    </View>
  );
}
