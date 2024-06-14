import { Animated, FlatList, View } from 'react-native';
import React, {useRef, useState} from 'react';
import Slides from '../../data';
import SlideItem from '../../components/slideItem';
import Pagination from '../../components/pagination';

// Slider component to display a horizontal list of slides with pagination
const Slider = () => {

  // State and ref hooks to track current index and animated scroll position
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  // Handles animated scroll events to sync scroll position with state
  const handleOnScroll = event => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      },
    )(event);
  };

  // Updates the current slide index based on viewed items
  const handleOnViewableItemsChanged = useRef(({viewableItems}) => {
    setIndex(viewableItems[0].index);
  }).current;

  // Configuration for determining when a slide is considered viewable
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  // Renders the slider with slides and pagination in a container view
  return (
    <View style={{backgroundColor: '#ffd166'}}>
      <FlatList
        data={Slides}
        renderItem={({item}) => <SlideItem item={item} />}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <Pagination data={Slides} scrollX={scrollX} index={index} />
    </View>
  );
};

export default Slider;
