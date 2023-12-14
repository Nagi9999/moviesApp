import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Rating } from "react-native-ratings";
import { getMovieDetails, getMovieVideo } from "../../api/data";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { WebView } from "react-native-webview";

const { width, height } = Dimensions.get("window");

interface MovieData {
  genres: any;
  poster_path: string;
  title: string;
  genre_ids: number[];
  vote_average: number;
  overview: string;
  release_date: string;
}

const Details = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [movieData, setMovieData] = useState<MovieData | null>(null);
  const [movieVideo, setMovieVideo] = useState<any | null>(null);
  const [isPlaying, setPlaying] = useState(false);
  const [videoKey, setVideoKey] = useState("");

  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  const fetchMovieDetails = async () => {
    try {
      const data = await getMovieDetails(id);
      const video = await getMovieVideo(id);

      setMovieData(data);
      setMovieVideo(video);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  console.log(movieData);

  const playTrailer = () => {
    if (movieVideo && movieVideo.results && movieVideo.results.length > 0) {
      const trailerKey = movieVideo.results[0].key;
      setPlaying(true);
      setVideoKey(trailerKey);
    } else {
      console.warn("No trailer available for this movie.");
    }
  };

  if (!movieData) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.backIcon}>
        <Pressable onPress={goBack}>
          <Ionicons name="chevron-back-sharp" size={30} color="gray" />
        </Pressable>
      </View>

      <View style={styles.playIcon}>
        <Pressable onPress={playTrailer}>
          <AntDesign name="play" size={50} color="#0E86D4" />
        </Pressable>
      </View>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/original${movieData.poster_path}`,
        }}
        style={styles.poster}
      />

      <Text style={styles.title}>{movieData.title}</Text>
      <View style={styles.genre}>
        {movieData.genres.map((genre: any) => (
          <Text key={genre.id} style={styles.genreText}>
            {genre.name}
          </Text>
        ))}
      </View>
      <Rating
        type="custom"
        ratingColor="#ffcc00"
        imageSize={30}
        ratingBackgroundColor="#d1dddf"
        readonly
        jumpValue={1}
        fractions={5}
        ratingCount={5}
        startingValue={movieData.vote_average / 2}
        tintColor="white"
      />
      <Text style={styles.overview}>{movieData.overview}</Text>
      <Text style={styles.releaseDate}>
        Release Date: {movieData.release_date}
      </Text>

      {videoKey && (
        <WebView
          style={{
            height: height * 0.25,
            position: "absolute",
            bottom: isPlaying ? 0 : -height * 0.25,
            left: 0,
            right: 0,
          }}
          source={{
            html: `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoKey}?autoplay=1" frameborder="0" allowfullscreen></iframe>`,
          }}
          useWebKit={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
      )}
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  poster: {
    width: "100%",
    height: height * 0.5,
    resizeMode: "stretch",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 8,
  },
  genre: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 8,
  },

  genreText: {
    fontSize: 16,
    marginRight: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  overview: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 8,
    paddingHorizontal: 15,
    marginTop: 20,
  },
  releaseDate: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 20,
  },

  backIcon: {
    position: "absolute",
    paddingVertical: 60,
    top: 10,
    left: 20,
    zIndex: 1,
  },
  playIcon: {
    position: "absolute",
    paddingVertical: -10,
    top: height * 0.5 - 25,
    right: 20,
    zIndex: 1,
    backgroundColor: "white",
    borderRadius: 50,
  },
});
