import React, { useEffect } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { logUserOut } from '../apollo';
import useMe from "../hooks/useMe";

export default function Me({ navigation }) {
    const { data } = useMe();
    useEffect(() => {
        navigation.setOptions({
            title: data?.me?.username,
        });
    }, []);
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