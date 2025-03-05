import "./gesture-handler";
import "@expo/metro-runtime";
import RootTabNavigator from "./src/navigation/RootTabNavigator";
import { PaperProvider } from "react-native-paper";
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
} from "react-native-paper";
import merge from "deepmerge";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const combinedDefaultTheme = merge(MD3LightTheme, LightTheme);
const combinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

export default function App() {
  return (
    <PaperProvider theme={combinedDarkTheme}>
      <NavigationContainer
        theme={{
          ...combinedDarkTheme,
          fonts: { ...NavigationDarkTheme.fonts },
        }}
      >
        <RootTabNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}
