import "@expo/metro-runtime";
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import merge from "deepmerge";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  adaptNavigationTheme,
} from "react-native-paper";
import "./gesture-handler";
import RootTabNavigator from "./src/navigation/RootTabNavigator";
import { StorageProvider } from "./src/context/StorageProvider";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const combinedDefaultTheme = merge(MD3LightTheme, LightTheme);
const combinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

export default function App() {
  return (
    <GestureHandlerRootView>
      <PaperProvider theme={combinedDarkTheme}>
        <NavigationContainer
          theme={{
            ...combinedDarkTheme,
            fonts: { ...NavigationDarkTheme.fonts },
          }}
        >
          <StorageProvider>
            <RootTabNavigator />
          </StorageProvider>
        </NavigationContainer>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
