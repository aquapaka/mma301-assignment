import { createStackNavigator } from "@react-navigation/stack";
import DetailScreen from "../screens/detail";
import HomeScreen from "../screens/home";
import { HomeStackParamList } from "../types/navigationParamLists";

const HomeStack = createStackNavigator<HomeStackParamList>();

export default function HomeStackNavigator() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Detail" component={DetailScreen} />
    </HomeStack.Navigator>
  );
}
