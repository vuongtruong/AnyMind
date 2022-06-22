import React from 'react';
import {
  LoadEarlier,
} from 'react-native-gifted-chat';


export const renderLoadEarlier = props => (
  <LoadEarlier
    {...props}
    label="Read More"
    containerStyle={{ alignItems: 'flex-start', marginLeft: 8 }}
    wrapperStyle={{
      backgroundColor: '#17a2b8',
      height: 38,
      borderRadius: 4,
      paddingRight: 20,
      paddingLeft: 20,
    }}
    textStyle={{ fontSize: 16 }}
  />
);


