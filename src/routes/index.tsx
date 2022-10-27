import {StackActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Registration from '../pages/Registration/index';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Registration"
        component={Registration}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
