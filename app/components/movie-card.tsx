import { router } from 'expo-router';
import React from 'react';
import { View, FlatList, Image, StyleSheet, Pressable } from 'react-native';

interface MovieCardProps {
  data: any;
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  const renderItem = ({ item }: { item: any }) => (
    <Pressable onPress={() => router.push({
      pathname:"/details/[id]",
      params: {id:item.id}
    })} >
      <View style={styles.cardItem}>
      <Image style={styles.posterImage} source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} />
    </View>
    </Pressable>
    
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={styles.itemSeparator}></View>}
    />
  );
};

const styles = StyleSheet.create({
    cardItem: {},
  posterImage: {
    width: 100,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  itemSeparator: {
    margin: 10,
  },
});

export default MovieCard;
