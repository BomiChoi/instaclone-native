import React, { useEffect, useRef } from "react";
import { Text } from "react-native";
import { useForm } from "react-hook-form";
import AuthLayout from "../components/auth/AuthLayout";
import AuthButton from "../components/auth/AuthButton";
import { TextInput } from "../components/auth/AuthShared";
import { useMutation, gql } from "@apollo/client";

const CREATE_ACCOUNT_MUTATION = gql`
    mutation createAccount(
        $firstName: String!
        $lastName: String!
        $username: String! 
        $email: String!
        $password: String!
    ){
    createAccount(
        firstName: $firstName
        lastName: $lastName
        username: $username
        email: $email
        password: $password
    ){
        ok
        error
    }
  }
`;

export default function CreateAccount({ navigation }) {
    const { register, handleSubmit, setValue, getValues, formState } = useForm();
    console.log(formState.isValid);

    const onCompleted = (data) => {
        console.log(data);
        const { createAccount: { ok } } = data;
        const { username, password } = getValues();
        if (ok) {
            navigation.navigate("LogIn", {
                username,
                password
            })
        } else {
            console.log("Failed");
        }
    };
    const [createAccountMutation, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
        onCompleted
    });


    const lastNameRef = useRef();
    const userNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const onNext = (nextOne) => {
        nextOne?.current?.focus();
    };
    const onValid = (data) => {
        if (!loading) {
            createAccountMutation({
                variables: {
                    ...data,
                }
            });
        }
    };
    useEffect(() => {
        register("firstName", { required: true, });
        register("lastName", { required: true, });
        register("username", { required: true, });
        register("email", { required: true, });
        register("password", { required: true, })
    }, [register]);

    return (
        <AuthLayout>
            <TextInput
                placeholder="First Name"
                placeholderTextColor="gray"
                returnKeyType="next"
                autoFocus
                onSubmitEditing={() => onNext(lastNameRef)}
                onChangeText={(text) => setValue("firstName", text)}
                placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
            />
            <TextInput
                placeholder="Last Name"
                placeholderTextColor="gray"
                returnKeyType="next"
                ref={lastNameRef}
                onSubmitEditing={() => onNext(userNameRef)}
                onChangeText={(text) => setValue("lastName", text)}
                placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
            />
            <TextInput
                placeholder="Username"
                placeholderTextColor="gray"
                returnKeyType="next"
                autoCapitalize="none"
                ref={userNameRef}
                onSubmitEditing={() => onNext(emailRef)}
                onChangeText={(text) => setValue("username", text)}
                placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
            />
            <TextInput
                placeholder="Email"
                placeholderTextColor="gray"
                keyboardType="email-address"
                returnKeyType="next"
                autoCapitalize="none"
                ref={emailRef}
                onSubmitEditing={() => onNext(passwordRef)}
                onChangeText={(text) => setValue("email", text)}
                placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
            />
            <TextInput
                placeholder="Password"
                placeholderTextColor="gray"
                secureTextEntry
                returnKeyType="done"
                ref={passwordRef}
                onSubmitEditing={handleSubmit(onValid)}
                onChangeText={(text) => setValue("password", text)}
                lastOne={true}
                placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
            />
            <AuthButton
                text="Create Account"
                loading={loading}
                disabled={false}
                onPress={handleSubmit(onValid)} />
        </AuthLayout>
    );
}