import {StackActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Registration from '../pages/Registration/index';
import MyPlace from '../pages/ListPlace/myPlace';
import Home from '../pages/Home/home';
import Feeds from '../pages/Recommendation/feeds';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyPlace"
        component={MyPlace}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Registration"
        component={Registration}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Feeds"
        component={Feeds}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
