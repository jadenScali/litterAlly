import {StyleSheet, Animated, View, Dimensions} from 'react-native';
import React from 'react';

const {width} = Dimensions.get('screen');

// Pagination component for displaying animated dots as a visual indicator of the current slide
const Pagination = ({data, scrollX, index}) => {
  return (

    // Container for the pagination dots, positioned absolutely at the bottom of the screen
    <View style={styles.container}>
      {/* Mapping over the slides data to create a dot for each slide */}
      {data.map((_, idx) => {
        const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];

        // Dynamically interpolates the width of the dot based on the scroll position
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [12, 30, 12],
          extrapolate: 'clamp',
        });

        // Interpolates the background color of the dot based on the scroll position, highlighting the active dot
        const backgroundColor = scrollX.interpolate({

          // Defining the range of input scroll values for which the dot's animations apply
          inputRange,
          outputRange: ['#ef476f', '#000', '#ef476f'],
          extrapolate: 'clamp',
        });

        // Animated view for each dot, with interpolated width and background color based on scroll position
        return (
          <Animated.View
            key={idx.toString()}
            style={[
              styles.dot,
              {width: dotWidth, backgroundColor},
            ]}
          />
        );
      })}
    </View>
  );
};

export default Pagination;

// Styles for the pagination container
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 35,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 3,
  },
});
