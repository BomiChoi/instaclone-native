import React, { useState } from "react";
import { FlatList } from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import { gql, useQuery } from "@apollo/client";
import { PHOTO_FRAGMENT, COMMENT_FRAGMENT } from "../fragments";
import Photo from "../components/Photo";
import styled from "styled-components/native";

const Title = styled.Text`
  color: white;
`;

const FEED_QUERY = gql`
  query seeFeed($offset: Int!) {
    seeFeed(offset: $offset) {
      ...PhotoFragment
      user {
        id
        username
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

export default function Feed() {
  const { data, loading, refetch, fetchMore } = useQuery(FEED_QUERY, {
    variables: {
      offset: 0,
    },
  });
  const renderPhoto = ({ item: photo }) => {
    return <Photo {...photo} />;
  };
  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
    alert("Refreshed");
  };
  const [refreshing, setRefreshing] = useState(false);
  return (
    <ScreenLayout loading={loading}>
      {!data ?
        <Title>Feed</Title>
        : <FlatList
          onEndReachedThreshold={0.05}
          onEndReached={() =>
            fetchMore({
              variables: {
                offset: data?.seeFeed?.length,
              },
            })
          }
          refreshing={refreshing}
          onRefresh={refresh}
          style={{ width: "100%" }}
          showsVerticalScrollIndicator={false}
          data={data?.seeFeed}
          keyExtractor={(photo) => "" + photo.id}
          renderItem={renderPhoto}
        />}
    </ScreenLayout>
  );
};