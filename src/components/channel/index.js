import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Channel = props => {
  const { channels, channel, setChannel } = props;
  return (
    <View>
      {channels.map((item, index) => {
        return (
          <TouchableOpacity
          key={index}
            activeOpacity={0.7}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 16,
              borderBottomWidth: 1,
              borderBottomColor: '#f0f4f8',
              backgroundColor: item.id == channel.id ? '#FFF' : '#f4f5fb',
            }}
            onPress={() => setChannel(item)}>
            <View style={{ marginBottom: 12, marginTop: 6 }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '600',
                  lineHeight: 21,
                }}>
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Channel;
