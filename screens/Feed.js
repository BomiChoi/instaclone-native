import React from "react";
import { View, Text } from "react-native";

export default function Feed({ navigation }) {
    return (
        <View style={{
            backgroundColor: "black",
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
        }}>
            <Text style={{ color: "white" }}>Feed</Text>
        </View>
    );
}