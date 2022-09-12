import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import ImageSlider from './components/ImageSlider';
import {imageData} from './data';

const App = () => {
  return (
    <View>
      <ImageSlider
        data={imageData}
        width={Dimensions.get('window').width}
        height={230}
        separatorWidth={0}
        indicator={true}
      />
    </View>
  );
};

export default App;
