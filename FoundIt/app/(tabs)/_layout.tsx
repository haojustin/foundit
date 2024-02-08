import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

	return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color="black" />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <SimpleLineIcons name="location-pin" size={24} color={Colors[colorScheme ?? 'light'].text}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}/>
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Post',
          tabBarIcon: ({ color }) => <AntDesign name="camerao" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="account/profile"
        options={{ 
          title: "Profile",
          tabBarIcon: ({ color }) => <AntDesign name="user" size={24} color="black" />,
          headerRight: () => (
            <Link href="/(tabs)/account/settings" asChild>
              <Pressable>
                {({ pressed }) => (
                  <AntDesign name="setting" size={24} color="black" style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}/>
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
	  <Tabs.Screen
        name="account/settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <AntDesign name="setting" size={24} color="black" />,
          href : null
        }}
      />
		<Tabs.Screen
			name="post"
			options={{
				title: "Post",
				tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        href : null,
			}}
		/>
    </Tabs>
  );
}
