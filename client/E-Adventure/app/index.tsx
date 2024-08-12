import styles from '@/stylesheets/default';

import React from 'react';
import { LinearGradient } from 'expo-linear-gradient'
import { Link, useRouter } from "expo-router"


import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  View, 
  Text, 
  Button, 
  StatusBar 
} from 'react-native';

const {width, height} = Dimensions.get('window');

const COLORS = {primary: '#282534', white: '#fff'};

const slides = [
    {
      id: '1',
      image: require('../assets/img/view.jpg'),
      title: 'Mountain Majesty',
      subtitle: 'Embark on a journey across Jamaica’s mountainous terrains. ',
    },
    {
      id: '2',
      image: require('../assets/img/trail.jpg'),
      title: 'Trails',
      subtitle: 'Journey through dense greenery, past exotic flora and fauna.',
    },
    {
      id: '3',
      image: require('../assets/img/hikers.jpg'),
      title: 'Make Friends',
      subtitle: 'Socialize with hikers from all around jamaica and the world.',
    },
  ];

  const Slide = ({item}) => {
    return (
      <View style={{alignItems: 'center'}}>
        <Image
          source={item?.image}
          style={{height: '75%', width, resizeMode: 'contain'}}
        />
        <View>
          <Text style={styles.title}>{item?.title}</Text>
          <Text style={styles.subtitle}>{item?.subtitle}</Text>
        </View>
      </View>
    );
  };

  const OnboardingScreen = ({navigation}) => {
    const router = useRouter();
    const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
    const ref = React.useRef();
    const updateCurrentSlideIndex = e => {
      const contentOffsetX = e.nativeEvent.contentOffset.x;
      const currentIndex = Math.round(contentOffsetX / width);
      setCurrentSlideIndex(currentIndex);
    };
  
    const goToNextSlide = () => {
      const nextSlideIndex = currentSlideIndex + 1;
      if (nextSlideIndex != slides.length) {
        const offset = nextSlideIndex * width;
        ref?.current.scrollToOffset({offset});
        setCurrentSlideIndex(currentSlideIndex + 1);
      }
    };
  
    const skip = () => {
      const lastSlideIndex = slides.length - 1;
      const offset = lastSlideIndex * width;
      ref?.current.scrollToOffset({offset});
      setCurrentSlideIndex(lastSlideIndex);
    };
  
    const Footer = () => {
      return (
        <View
          style={{
            height: height * 0.25,
            justifyContent: 'space-between',
            paddingHorizontal: 20,
          }}>
          {/* Indicator container */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            {/* Render indicator */}
            {slides.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  currentSlideIndex == index && {
                    backgroundColor: COLORS.white,
                    width: 25,
                  },
                ]}
              />
            ))}
          </View>
  
          {/* Render buttons */}
          <View style={{marginBottom: 20}}>
            {currentSlideIndex == slides.length - 1 ? (
              <View style={{height: 50}}>
                <TouchableOpacity
                  style={styles.btn}
                  // onPress={() => navigation.replace('Landing')}>
                    onPress={() => router.push('/landing')}>
                  <Text style={{fontWeight: 'bold', fontSize: 15}}>
                    GET STARTED
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[
                    styles.btn,
                    {
                      borderColor: COLORS.white,
                      borderWidth: 1,
                      backgroundColor: 'transparent',
                    },
                  ]}
                  onPress={skip}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 15,
                      color: COLORS.white,
                    }}>
                    SKIP
                  </Text>
                </TouchableOpacity>
                <View style={{width: 15}} />
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={goToNextSlide}
                  style={styles.btn}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 15,
                    }}>
                    NEXT
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      );
    };
  
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: COLORS.primary}}>
        <StatusBar backgroundColor={COLORS.primary} />
        <FlatList
          ref={ref}
          onMomentumScrollEnd={updateCurrentSlideIndex}
          contentContainerStyle={{height: height * 0.75}}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={slides}
          pagingEnabled
          renderItem={({item}) => <Slide item={item} />}
        />
        <Footer />
      </SafeAreaView>
    );
  };

// export default function Landing() {
//     return (
//         <View style={styles.container}>
//         <Text>Welcome to Elite Excursions</Text>
//         </View>

//     );
// }


export default OnboardingScreen;