import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Diet } from '@screens/Diet';
import {Home} from '@screens/Home';
import { Treinos } from '@screens/Treinos';
import {User} from '@screens/User';
import {
  Barbell,
  ForkKnife,
  House,
  Note,
  User as Person,
} from 'phosphor-react-native';
import { TouchableOpacity } from 'react-native';

const T = createBottomTabNavigator();


const CustomTabTreino = (props : any) => (
  <TouchableOpacity 
  onPress={props.onPress}
  style={{
    backgroundColor : "#5ED25C",
    width: 60,
    height: 60,
    borderRadius: 60,
    alignItems: "center",
    position : 'relative',
    top: -20,
    justifyContent: "center",
    zIndex: 99999
  }}
  activeOpacity={1}
 >
    {props.children}
  </TouchableOpacity>
)
export function Tabs() {
  return (
    <T.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor : '#5ED25C',
        tabBarInactiveTintColor: '#fff',
        tabBarIcon: ({focused, color, size}) => {
           if (route.name === 'Home') {
            return (
              <House
                size={size}
                color={color}
                weight={focused ? 'bold' : 'regular'}
              />
            );
          } else if (route.name === 'User') {
            return (
              <Person
                size={size}
                color={color}
                weight={focused ? 'bold' : 'regular'}
              />
            );
          } else if (route.name === 'Dieta') {
            return (
              <ForkKnife
                size={size}
                color={color}
                weight={focused ? 'bold' : 'regular'}
              />
            );
          } else if (route.name === 'Treino') {
            return (
              <Barbell
                size={35}
                color={color}
                weight={focused ? 'regular' : 'regular'}
              />
            );
          } else if (route.name === 'Treino') {
            return (
              <Barbell
                size={size}
                color={color}
                weight={focused ? 'bold' : 'regular'}
              />
            );
          } else if (route.name === 'Posts') {
            return (
              <Note
                size={size}
                color={color}
                weight={focused ? 'bold' : 'regular'}
              />
            );
          }
          return null;
        },
        tabBarStyle: {
          borderColor: 'transparent',
          backgroundColor: '#18181b',
          position: 'absolute',
          bottom: 15,
          left: 20,
          right: 20,
          elevation: 0,
          borderRadius: 15,
          height: 60,
        },
      })}>
      <T.Screen name="Home" component={Home}/>
      <T.Screen name="Dieta" component={Diet} />
      <T.Screen name="Treino" component={Treinos}
       options={{
        tabBarActiveTintColor : '#000',
        tabBarButton : (props) =>(
          <CustomTabTreino {...props} />
        )
      }}/>
      <T.Screen name="Posts" component={User} />
      <T.Screen name="User" component={User} />
    </T.Navigator>
  );
}
