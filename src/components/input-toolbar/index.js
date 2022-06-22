import React from 'react';
import { InputToolbar, Send } from 'react-native-gifted-chat';

export const renderInputToolbar = props => (
  <InputToolbar
    {...props}
    containerStyle={{
      backgroundColor: '#FFF',
      paddingTop: 6,
      height: 60,
    }}
    primaryStyle={{ alignItems: 'center' }}
  />
);

export const renderSend = props => (
  <Send
    {...props}
    disabled={!props.text}
    containerStyle={{
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 4,
    }}
    textStyle={{ fontSize: 16, marginLeft: 0, marginRight: 0 }}></Send>
);
