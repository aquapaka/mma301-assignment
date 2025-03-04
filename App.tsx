import { NavigationContainer } from "@react-navigation/native";
import RootTabNavigator from "./src/navigation/RootTabNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <RootTabNavigator />
    </NavigationContainer>
  );
}
