import React, {Ref, useCallback, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  Dimensions,
  LayoutAnimation,
  View,
  ViewStyle,
  ColorValue,
} from 'react-native';
import {ImageDataType} from '../data';

export type ImageSliderProps = {
  data: ImageDataType[];
  width: number;
  height: number;
  separatorWidth: number;
  indicator?: boolean;
  indicatorStyle?: ViewStyle;
  indicatorContainerStyle?: ViewStyle;
  indicatorActiveColor?: ColorValue;
  indicatorInActiveColor?: ColorValue;
  contentContainerStyle?: ViewStyle;
};

const viewabilityConfig = {
  viewAreaCoveragePercentThreshold: 50,
};

const ImageSlider: React.FC<ImageSliderProps> = props => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageSliderRef: Ref<FlatList> = useRef<FlatList>(null);

  const totalImageWidth = props.width + props.separatorWidth;

  //   useEffect(() => {
  //     const flatListScrollInterval = setInterval(() => {
  //       setCurrentImageIndex(current => {
  //         return current < props.data.length - 1 ? current + 1 : 0;
  //       });

  //       imageSliderRef.current?.scrollToIndex({
  //         index: currentImageIndex,
  //         animated: true,
  //       });
  //     }, 1000);

  //     return () => clearInterval(flatListScrollInterval);
  //   }, [currentImageIndex]);

  const onViewableItemsChanged = useCallback(({viewableItems, changed}) => {
    if (viewableItems.length > 0) {
      let currentIndex = viewableItems[0].index;
      setCurrentImageIndex(currentIndex);
    }
  }, []);

  return (
    <View>
      <FlatList
        ref={imageSliderRef}
        data={props.data}
        keyExtractor={item => item.image}
        renderItem={({item}) => (
          <Image
            source={{uri: item.image}}
            style={{width: totalImageWidth, height: props.height}}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={totalImageWidth}
        ItemSeparatorComponent={() => (
          <View style={{width: props.separatorWidth}} />
        )}
        getItemLayout={(data, index) => ({
          length: props.height,
          offset: Dimensions.get('window').width * index,
          index,
        })}
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />

      {props.indicator && (
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            bottom: 10,
            alignSelf: 'center',
          }}>
          {props.data.map((item, index) => (
            <View
              key={index.toString()}
              style={{
                width: index === currentImageIndex ? 10 : 10,
                height: 10,
                borderRadius: 10,
                backgroundColor:
                  index === currentImageIndex ? '#3498db' : '#bdc3c7',
                marginRight: 4,
              }}></View>
          ))}
        </View>
      )}
    </View>
  );
};

export default ImageSlider;
