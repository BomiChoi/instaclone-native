import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { useQuery, gql } from "@apollo/client";
import { logUserOut } from '../apollo';
import useMe from "../hooks/useMe";
import ScreenLayout from "../components/ScreenLayout";

const Container = styled.View`
    margin: 10px;
    display: flex;
    align-items: center;
`;
const UserAvatar = styled.Image`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin-bottom: 10px;
`;

const PROFILE_QUERY = gql`
    query seeProfile($username: String!) {
        seeProfile(username: $username){
            firstName
            lastName
            email
            bio
            avatar
        }
    }
`;

export default function Me() {
    const { data: userData, loading: userLoading } = useMe();
    let username = "";
    if (userData) {
        username = userData.me.username;
    }
    const { data, loading } = useQuery(PROFILE_QUERY, {
        variables: { username }
    });
    return (
        <ScreenLayout loading={(userLoading || loading)}>
            <Text style={{ color: "white", fontSize: 25 }}>Profile</Text>
            {data?.seeProfile !== undefined ? (<>
                <Container>
                    <UserAvatar resizeMode="cover" source={{ uri: data?.seeProfile?.avatar }} />
                    <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", }}>{data?.seeProfile?.firstName} {data?.seeProfile?.lastName}</Text>
                    <Text style={{ color: "white" }}>Email: {data?.seeProfile?.email}</Text>
                    {data?.seeProfile?.bio ?
                        <Text style={{ color: "white" }}>Bio: {data?.seeProfile?.bio}</Text>
                        : null
                    }

                </Container>
            </>) : null}
            <TouchableOpacity onPress={logUserOut}>
                <Text style={{
                    color: "black",
                    backgroundColor: "white",
                    padding: 5,
                    marginTop: 5,
                }}>Log Out</Text>
            </TouchableOpacity>
        </ScreenLayout>
    );
};