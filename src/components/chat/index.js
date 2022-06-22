import React, { useState, useEffect, useRef } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { renderInputToolbar, renderSend } from '../input-toolbar';
import { renderLoadEarlier } from '../message';
import { useMutation } from '@apollo/client';
import GQLDefinitions from '../../services/gqlDefinitions';

const Chats = props => {
  const {
    channel,
    user,
    messagesData,
    onLoadEarlier,
    loadEarlier,
    isLoading,
    isLoadingEarlier,
  } = props;
  const [text, setText] = useState('');
  const chatRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState([]);

  useEffect(() => {
    chatRef.current.focusTextInput();
  }, [isLoading]);

  useEffect(() => {
    setMessages(messagesData);
  }, [messagesData]);

  const [postMessage] = useMutation(GQLDefinitions.Post_Message, {
    onError: () => {
      const newMessages = message;
      newMessages[0].pending = true;
      setMessages(prevMessages => GiftedChat.append(prevMessages, newMessages));
      setMessage([]);
    },
    onCompleted: results => {
      const newMessages = message;
      newMessages[0].sent = true;
      setMessages(prevMessages => GiftedChat.append(prevMessages, newMessages));
      setMessage([]);
    },
  });
  const postMessageRequest = async text => {
    await postMessage({
      variables: {
        channelId: `${channel.id}`,
        text: `${text}`,
        userId: `${user._id}`,
      },
    });
  };
  const onSend = (newMessages = []) => {
    newMessages[0].messageId = newMessages[0]._id;
    newMessages[0].datetime = newMessages[0].createdAt;
    newMessages[0].userId = user._id;
    setMessage(newMessages);
    postMessageRequest(newMessages[0].text);
  };
  return (
    <GiftedChat
      ref={chatRef}
      placeholder="Type your message here..."
      messages={messages}
      text={text}
      onInputTextChanged={setText}
      onSend={onSend}
      user={user}
      alwaysShowSend
      scrollToBottom
      showUserAvatar
      renderAvatarOnTop
      renderUsernameOnMessage
      bottomOffset={26}
      minInputToolbarHeight={60}
      minComposerHeight={40}
      renderInputToolbar={renderInputToolbar}
      onLoadEarlier={() =>
        onLoadEarlier(messages[messages.length - 1].messageId)
      }
      isLoadingEarlier={isLoadingEarlier}
      loadEarlier={loadEarlier}
      renderLoadEarlier={renderLoadEarlier}
      renderSend={renderSend}
    />
  );
};

export default Chats;
