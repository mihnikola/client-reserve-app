import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Animated, { Easing, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';

const Loader = () => {
  // Animacija za rotaciju
  const rotation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: withRepeat(
            withTiming('360deg', { duration: 1500, easing: Easing.linear }),
            -1,
            false
          ),
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.loader, rotation]} />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    marginTop:40
  },
  loader: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 10,
    borderColor: 'gray',
    borderTopColor: 'transparent',
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
});

export default Loader;
