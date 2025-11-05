
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CourseListScreen from './screens/CourseListScreen';
import CourseDetailScreen from './screens/CourseDetailScreen';
import WishlistScreen from './screens/WishlistScreen';
import ProfileScreen from './screens/ProfileScreen';
import { DrawerNavigationProp } from '@react-navigation/drawer';

export type CoursesStackParamList = {
  CourseList: undefined;
  CourseDetail: { courseId: string; title: string; description: string };
};

export type CoursesTabParamList = {
  AllCourses: undefined;
  Wishlist: undefined;
};

export type RootDrawerParamList = {
  Courses: undefined;
  MyProfile: undefined;
};


const Drawer = createDrawerNavigator<RootDrawerParamList>();
const Tab = createBottomTabNavigator<CoursesTabParamList>();
const Stack = createNativeStackNavigator<CoursesStackParamList>();

function DrawerHamburger() {
  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();
  return (
    <Pressable onPress={() => navigation.openDrawer()} style={{ paddingHorizontal: 16 }}>
      <Ionicons name="menu" size={24} />
    </Pressable>
  );
}

function CoursesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown : false, }}>
      <Stack.Screen name="CourseList" component={CourseListScreen} options={{ title: 'All Courses' }} />
      <Stack.Screen
        name="CourseDetail"
        component={CourseDetailScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
    </Stack.Navigator>
  );
}

function CoursesTabs() {
  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        headerLeft: () => <DrawerHamburger />,
        tabBarIcon: ({ size, focused }) => {
          const icons: Record<keyof CoursesTabParamList, string> = {
            AllCourses: focused ? 'book' : 'book-outline',
            Wishlist: focused ? 'heart' : 'heart-outline',
          };
          return (
            <Ionicons
              name={
                icons[route.name as keyof CoursesTabParamList] as keyof typeof Ionicons.glyphMap
              }
              size={size}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="AllCourses"
        component={CoursesStack}
        options={{ title: 'All Courses', headerShown: false }}
      />
      <Tab.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{ title: 'My Wishlist' }}
      />
    </Tab.Navigator>
  );
}

export default function Layout() {
  return (
    <Drawer.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      <Drawer.Screen
        name="Courses"
        component={CoursesTabs}
        options={{
          title: 'Courses',
          drawerIcon: ({ size }) => <Ionicons name="layers-outline" size={size} />,
        }}
      />
      <Drawer.Screen
        name="MyProfile"
        component={ProfileScreen}
        options={{
          title: 'My Profile',
          drawerIcon: ({ size }) => <Ionicons name="person-circle-outline" size={size} />,
        }}
      />
    </Drawer.Navigator>
  );
}