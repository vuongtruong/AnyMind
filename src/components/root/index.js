import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useLazyQuery } from '@apollo/client';
import GQLDefinitions from '../../services/gqlDefinitions';
import Chat from '../chat';
import Channel from '../channel';
import channels from '../channel/channels';
import Users from '../user';
import users from '../user/users';
import styles from './styles';

const Root = () => {
  const [channel, setChannel] = useState(channels[0]);
  const [user, setUser] = useState(users[0]);
  const [messages, setMessages] = useState([]);
  const [loadEarlier, setLoadEarlier] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingEarlier, setIsLoadingEarlier] = useState(false);

  const [fetchLatestMessages] = useLazyQuery(
    GQLDefinitions.Fetch_Latest_Messages,
    {
      variables: {
        channelId: `${channel.id}`,
      },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'network-only',
      onError: () => {
        console.log('error');
        setIsLoading(false);
      },
      onCompleted: results => {
        const { fetchLatestMessages } = results;
        if (!!fetchLatestMessages.length) {
          setLoadEarlier(
            !!fetchLatestMessages.length && fetchLatestMessages.length == 10
              ? true
              : false,
          );
          const messages = fetchLatestMessages.map(item => {
            return {
              ...item,
              _id: item.messageId,
              createdAt: item.datetime,
              sent: true,
              user: {
                _id: item.userId,
                name: item.userId,
                avatar: 'https://placeimg.com/140/140/any',
              },
            };
          });
          setMessages(messages);
          setIsLoading(false);
        }
      },
    },
  );
  const [fetchMoreMessages] = useLazyQuery(GQLDefinitions.Fetch_More_Messages, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    onError: () => {
      console.log('error');
      setIsLoadingEarlier(false);
    },
    onCompleted: results => {
      const { fetchMoreMessages } = results;
      setLoadEarlier(
        !!fetchMoreMessages.length && fetchMoreMessages.length == 10
          ? true
          : false,
      );
      if (!!fetchMoreMessages.length) {
        const messages = fetchMoreMessages.map(item => {
          return {
            ...item,
            _id: item.messageId,
            createdAt: item.datetime,
            sent: true,
            user: {
              _id: item.userId,
              name: item.userId,
              avatar: 'https://placeimg.com/140/140/any',
            },
          };
        });
        setMessages(prevMessage => [...prevMessage, ...messages]);
        setIsLoadingEarlier(false);
      }
    },
  });
  const fetchMoreMessagesRequest = async (messageId = '') => {
    setIsLoadingEarlier(true);
    await fetchMoreMessages({
      variables: {
        channelId: `${channel.id}`,
        messageId: messageId,
        old: true,
      },
    });
  };
  useEffect(() => {
    fetchLatestMessages();
  }, [channel, user]);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <View style={styles.wrapper}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>1 day chat App</Text>
          <Text style={styles.headerDescription}>
            All messages will be deleted at every 00:00 UTC
          </Text>
        </View>
        <View style={styles.content}>
          <View style={styles.leftContent}>
            <View style={styles.leftContentWrapper}>
              <View style={styles.chooseUsername}>
                <Text style={styles.chooseUsernameText}>
                  1. Choose your user
                </Text>
                <Users users={users} user={user} setUser={setUser} />
              </View>
              <View>
                <Text style={styles.chooseUsernameText}>
                  2. Choose your Channel
                </Text>
                <Channel
                  channels={channels}
                  channel={channel}
                  setChannel={setChannel}
                />
              </View>
            </View>
          </View>
          <View style={styles.mainContent}>
            <View style={styles.channelHeader}>
              <Text style={styles.channelText}>{channel.name}</Text>
            </View>
            <Chat
              channel={channel}
              user={user}
              messagesData={messages}
              loadEarlier={loadEarlier}
              onLoadEarlier={fetchMoreMessagesRequest}
              isLoading={isLoading}
              isLoadingEarlier={isLoadingEarlier}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Root;
