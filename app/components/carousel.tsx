import React from "react";
import { View, Image, StyleSheet, Dimensions, Text } from "react-native";
import Swiper from "react-native-swiper";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";

const { width, height } = Dimensions.get("window");

interface CarouselProps {
  data: { id: number; poster_path: string }[];
}

const Carousel: React.FC<CarouselProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      <Link style={styles.textLogo} href={"/"}>
        <Text>M</Text>
      </Link>

      <View style={styles.searchIcon}>
        <Link href={"/search"}>
          <AntDesign name="search1" size={24} color="rgba(128,128,128,1)" />
        </Link>
      </View>

      <Swiper
        autoplay={true}
        autoplayTimeout={4}
        showsButtons={false}
        loop={true}
        showsPagination={false}
        horizontal
        style={styles.swiperContainer}
      >
        {data.map((item) => (
          <View key={item.id} style={styles.slide}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
              }}
              style={styles.image}
            />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  swiperContainer: {
    height: height * 0.7,
  },
  slide: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
  },
  searchIcon: {
    position: "absolute",
    paddingVertical: 60,
    top: 10,
    right: 20,
    zIndex: 1,
  },
  textLogo: {
    position: "absolute",
    paddingVertical: 40,
    top: 10,
    left: 20,
    zIndex: 1,
    fontSize: 45,
    fontWeight: "bold",
    color: "#00ffff",
    opacity: 0.7,
  },
});

export default Carousel;
