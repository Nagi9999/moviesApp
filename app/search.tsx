import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Image, SafeAreaView,StyleSheet, Pressable } from 'react-native';
import { searchMovies } from '../api/data';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';



interface Movie {
  id: number;
  poster_path: string;
  data: any;

}

const SearchPage: React.FC<Movie> = ({ data }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Movie[]>([]);


  //just for handling backward navigation use
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query) {
        try {
          const results = await searchMovies(query);
          setSuggestions(results);
        } catch (error) {
          console.error('Error fetching search suggestions:', error);
        }
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [query]);

  return (
    <SafeAreaView>
       <View style={styles.backIcon}>
      <Pressable onPress={goBack}>
          <Ionicons name="chevron-back-sharp" size={30} color="gray" />
        </Pressable>
      </View>
      <TextInput
        placeholder="Type to search..."
        placeholderTextColor={"#afc1c4"}
        value={query}
        onChangeText={(text) => setQuery(text)}
        style={styles.input}
        autoCorrect={false}
      autoCapitalize={"none"}
      />
      <View >
      <FlatList
      style={styles.searchList}
        data={suggestions}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }: { item: any }) => (
          
          <View key={item.id} style={styles.ImageCard}>
            <Pressable onPress={() => router.push({
            pathname:"/details/[id]",
            params: {id:item.id}
          })} >
            <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }}
            />
            </View>
            </Pressable>

          </View>
        )}
      />
      </View>
      
    </SafeAreaView>
  );
};

export default SearchPage;

const styles = StyleSheet.create({
  backIcon: {
    paddingVertical: 30,
    top: 10,
    left: 20,
    zIndex: 1,
  },
  input: {
    height: 56,
    width: 335,
    marginHorizontal: 20,
    marginBottom: 30,
    opacity: 0.5,
    borderRadius: 218,
    backgroundColor: "gray",
    paddingHorizontal: 20,
    fontSize: 17,
    fontWeight: "500",
    textAlign: "auto",
    letterSpacing: 1,
    color:"#242126",
    borderWidth:2
  },
  searchList: {
  },
  listContainer: {
    flex:1,
    marginHorizontal: 13,
    marginTop:10
  },

  ImageCard: {
    flex: 1,
    backgroundColor: "white",
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: "rgba(0, 0, 0, 0.15)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
  },
  imageContainer: {
    borderRadius: 4,
    overflow: "hidden", // Ensure the shadow is applied to the container, not the image
    borderWidth: 0.5,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  image: {
    width: "100%",
    height: 200,
    
  },
})