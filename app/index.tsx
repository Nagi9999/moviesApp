import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
} from "react-native";
import Carousel from "./components/carousel";
import MovieCard from "./components/movie-card";
import {
  getUpcomingMovies,
  getPopularMovies,
  getPopularTv,
  getDocumentaryMovies,
  getFamilyMovies,
} from "../api/data";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: any;
}

const HomePage = () => {
  const [upcoming, setUpcoming] = useState<Movie[]>([]);
  const [popularMovie, setPopularMovie] = useState<Movie[]>([]);
  const [popularTv, setPopularTv] = useState<Movie[]>([]);
  const [familyMovies, setFamilyMovies] = useState<Movie[]>([]);
  const [documentaryMovies, setDocumentaryMovies] = useState<Movie[]>([]);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const upcomingResult = await getUpcomingMovies();
      const popularMoviesResult = await getPopularMovies();
      const popularTvResult = await getPopularTv();
      const familyMoviesResult = await getFamilyMovies();
      const documentaryMoviesResult = await getDocumentaryMovies();

      setUpcoming(upcomingResult);
      setPopularMovie(popularMoviesResult);
      setPopularTv(popularTvResult);
      setFamilyMovies(familyMoviesResult);
      setDocumentaryMovies(documentaryMoviesResult);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // console.log(popularMovie)

  return (
    <ScrollView style={styles.container}>
     
          <Carousel data={upcoming} />
          <View style={styles.cardContainer}>
            <Text style={styles.cardText}>Popular Movies</Text>
            <MovieCard data={popularMovie} />
          </View>
          <View style={styles.cardContainer}>
            <Text style={styles.cardText}>Upcomping Movies</Text>
            <MovieCard data={upcoming} />
          </View>
          <View style={styles.cardContainer}>
            <Text style={styles.cardText}>Popular Tv Show</Text>
            <MovieCard data={popularTv} />
          </View>
          <View style={styles.cardContainer}>
            <Text style={styles.cardText}>Family Movies</Text>
            <MovieCard data={familyMovies} />
          </View>
          <View style={styles.cardContainer}>
            <Text style={styles.cardText}>Documaentary Movies</Text>
            <MovieCard data={documentaryMovies} />
          </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityIndicator: {},
  cardText: {
    fontSize: 24,
    marginVertical: 10,
    fontWeight: "bold",
  },
  cardContainer: {
    marginLeft: 20,
    marginVertical: 20,
  },
});

export default HomePage;
