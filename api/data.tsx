import axios from "axios";

const apiKey = "7c99cfebf4292690b90c3af6dc126a20";
const baseApiUrl = "https://api.themoviedb.org/3";

export const getUpcomingMovies = async () => {
  try {
    const response = await axios.get(
      `${baseApiUrl}/movie/upcoming?api_key=${apiKey}`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    throw error;
  }
};
export const getPopularMovies = async () => {
  try {
    const response = await axios.get(
      `${baseApiUrl}/movie/popular?api_key=${apiKey}`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw error;
  }
};
export const getPopularTv = async () => {
  try {
    const response = await axios.get(
      `${baseApiUrl}/tv/popular?api_key=${apiKey}`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching popular tv show:", error);
    throw error;
  }
};

export const getFamilyMovies = async () => {
  try {
    const response = await axios.get(
      `${baseApiUrl}/discover/movie?api_key=${apiKey}&with_genres=10751`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching family movies:", error);
    throw error;
  }
};

export const getDocumentaryMovies = async () => {
  try {
    const response = await axios.get(
      `${baseApiUrl}/discover/movie?api_key=${apiKey}&with_genres=99`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching documentary movies:", error);
    throw error;
  }
};

export const getMovieDetails = async (movieId: any) => {
  try {
    const response = await axios.get(
      `${baseApiUrl}/movie/${movieId}?api_key=${apiKey}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie details for ID ${movieId}:`, error);
    throw error;
  }
};

export const getMovieVideo = async (movieId: any) => {
  try {
    const response = await axios.get(
      `${baseApiUrl}/movie/${movieId}/videos?api_key=${apiKey}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie video for ID ${movieId}:`, error);
    throw error;
  }
};


export const searchMovies = async (query: string) => {
  try {
    const response = await axios.get(
      `${baseApiUrl}/search/movie?api_key=${apiKey}&query=${query}`
    );
    return response.data.results;
  } catch (error) {
    console.error(`Error searching movies for query ${query}:`, error);
    throw error;
  }
};
