import React from "react";
import { View, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feed from "../screens/Feed";
import Search from "../screens/Search";
import Notifications from "../screens/Notifications";
import Profile from "../screens/Profile";
import TabIcon from "../components/nav/TabIcon";

const Tabs = createBottomTabNavigator();

export default function LoggedInNav() {
    return (
        <Tabs.Navigator
            screenOptions={{
                tabBarActiveTintColor: "white",
                tabBarStyle: {
                    borderTopColor: "rgba(255, 255, 255, 0.3)",
                    backgroundColor: "black",
                },
                tabBarShowLabel: false,
            }}>
            <Tabs.Screen name="Feed" component={Feed} options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <TabIcon iconName={"home"} color={color} focused={focused} />
                ),
            }} />
            <Tabs.Screen name="Search" component={Search} options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <TabIcon iconName={"search"} color={color} focused={focused} />
                ),
            }} />
            <Tabs.Screen name="Camera" component={View} options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <TabIcon iconName={"camera"} color={color} focused={focused} />
                ),
            }} />
            <Tabs.Screen name="Notifications" component={Notifications} options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <TabIcon iconName={"heart"} color={color} focused={focused} />
                ),
            }} />
            <Tabs.Screen name="Profile" component={Profile} options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <TabIcon iconName={"person"} color={color} focused={focused} />
                ),
            }} />
        </Tabs.Navigator>
    );
}