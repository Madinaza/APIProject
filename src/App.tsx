/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useRef, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import SearchIcon from './assets/search.svg';
import MoviesIcon from './assets/film-solid.svg';
import CancelBtn from './assets/trash-solid.svg';
import Star from './assets/star-solid.svg';
// import Arrow from './assets/chevron-down-solid.svg';

const url = 'https://api.tvmaze.com/search/shows?q=';
const App = () => {
  const [value, setValue] = useState('');
  const [movies, setMovies] = useState([]);
  const ref = useRef<TextInput>();
  const getData = async () => {
    const response = await fetch(url + value, {
      method: 'GET',
    });
    const result = await response.json();
    setMovies(result);
  };

  const changeMovie = (text: string) => {
    setValue(text);
  };

  const onClear = () => {
    ref.current?.clear();
    setValue('');
    setMovies([]);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.movieFlex}>
          <Text style={styles.heading}>Movies</Text>
          <MoviesIcon style={styles.moviesIcon} />
        </View>
        <View style={styles.inputStyle}>
          <TextInput
            placeholder="Search Movies..."
            style={{paddingLeft: 15}}
            placeholderTextColor={'black'}
            onChangeText={changeMovie}
            ref={ref}></TextInput>
          <TouchableOpacity style={styles.search} onPress={getData}>
            <SearchIcon style={styles.searchIcon} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.TrashBtn} onPress={onClear}>
          <CancelBtn style={styles.trash} />
        </TouchableOpacity>
        <ScrollView style={{width: '100%', marginTop: 20}}>
          {movies?.map(item => (
            <View style={styles.card}>
              <Image
                style={{width: 150, height: 150, borderRadius: 20}}
                source={{
                  uri: item.show.image?.medium,
                }}
              />
              <View style={styles.about}>
                <Text style={styles.movieName}>{item.show.name}</Text>
                <Text style={styles.type}>Language:{item?.show.language}</Text>
                <View style={styles.starView}>
                  <Star style={styles.star} />
                  <Star style={styles.star} />
                  <Star style={styles.star} />
                  <Star style={styles.star} />
                  <Star style={styles.star} />
                </View>
                <Text style={styles.time}>IMDb:{item.show.rating.average}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  inputStyle: {
    width: '100%',
    height: 60,
    borderColor: '#0E1367',
    borderWidth: 2,
    borderStyle: 'solid',
    marginTop: 20,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 30,
    color: '#0E1367',
    fontWeight: '900',
  },
  movieFlex: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 15,
  },
  moviesIcon: {
    width: 30,
    height: 30,
    fill: '#0E1367',
  },
  searchIcon: {
    width: 25,
    height: '100%',
    fill: '#fff',
  },
  search: {
    backgroundColor: '#0E1367',
    borderRadius: 25,
    width: 60,
    alignItems: 'center',
  },
  trash: {
    width: 20,
    height: 40,
    fill: 'red',
  },
  TrashBtn: {
    borderWidth: 2,
    borderColor: 'red',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 10,
  },
  card: {
    backgroundColor: '#E0E4FE',
    borderRadius: 30,
    marginTop: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    width: 15,
    height: 15,
    fill: '#F97F05',
    marginTop: 5,
    marginRight: 5,
  },
  starView: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  about: {
    marginLeft: 20,
  },
  movieName: {
    fontSize: 17,
    width: '90%',
    color: 'black',
    fontWeight: '900',
  },
  type: {
    fontSize: 16,
    color: '#3E403E',
    fontWeight: '700',
    marginTop: 5,
  },
  time: {
    fontSize: 14,
    color: '#3E403E',
    fontWeight: '500',
    marginTop: 5,
  },
});
