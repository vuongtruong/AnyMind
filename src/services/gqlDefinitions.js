import { gql } from '@apollo/client';

export default class GQLDefinitions {
  static Fetch_Latest_Messages = gql`
    query fetchLatestMessages($channelId: String!) {
      fetchLatestMessages(channelId: $channelId) {
        userId
        text
        messageId
        datetime
      }
    }
  `;
  static Post_Message = gql`
    mutation postMessage(
      $channelId: String!
      $text: String!
      $userId: String!
    ) {
      postMessage(channelId: $channelId, text: $text, userId: $userId) {
        userId
        text
        messageId
        datetime
      }
    }
  `;
  static Message_Post = gql`
    mutation MessagePost(
      $channelId: ChannelId!
      $text: String!
      $userId: UserId!
    ) {
      MessagePost(channelId: $channelId, text: $text, userId: $userId) {
        userId
        text
        messageId
        datetime
      }
    }
  `;
  static Messages_Fetch_More = gql`
    query MessagesFetchMore(
      $channelId: ChannelId!
      $messageId: String!
      $old: Boolean!
    ) {
      MessagesFetchMore(
        channelId: $channelId
        messageId: $messageId
        old: $old
      ) {
        userId
        text
        messageId
        datetime
      }
    }
  `;
  static Fetch_More_Messages = gql`
    query fetchMoreMessages(
      $channelId: String!
      $messageId: String!
      $old: Boolean!
    ) {
      fetchMoreMessages(
        channelId: $channelId
        messageId: $messageId
        old: $old
      ) {
        userId
        text
        messageId
        datetime
      }
    }
  `;
}
