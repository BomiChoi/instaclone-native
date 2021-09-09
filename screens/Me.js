import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { logUserOut } from '../apollo';

export default function Me() {
    return (
        <View
            style={{
                backgroundColor: "black",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Text style={{ color: "white" }}>Me</Text>
            <TouchableOpacity onPress={logUserOut}>
                <Text style={{
                    color: "black",
                    backgroundColor: "white",
                    padding: 5,
                    marginTop: 5,
                }}>Log Out</Text>
            </TouchableOpacity>
        </View >
    );
}