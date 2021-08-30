import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { colors } from "../colors";
import AuthLayout from "../components/auth/AuthLayout";
import AuthButton from "../components/auth/AuthButton";


const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: black;
    padding: 0px 40px;
`;
const Logo = styled.Image`
    max-width: 50%;
    height: 100px;
`;
const LoginLink = styled.Text`
    color: ${colors.blue};
    font-weight: 600;
    margin-top: 20px;
    text-align: center;
`;

export default function Welcome({ navigation }) {
    const goToCreateAccount = () => navigation.navigate("CreateAccount");
    const goToLogIn = () => navigation.navigate("LogIn");
    return (
        <AuthLayout>
            <AuthButton text="Create New Account" dusabled={false} onPress={goToCreateAccount} />
            <TouchableOpacity onPress={goToLogIn}>
                <LoginLink>Log in</LoginLink>
            </TouchableOpacity>
        </AuthLayout>
    );
}