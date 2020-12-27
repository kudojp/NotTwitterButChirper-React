import { RECEIVE_TWEETS, TOGGLE_TWEET, ADD_TWEET } from '../actions/tweets'

export default function tweets(state = {}, action) {
  switch (action.type) {
    case RECEIVE_TWEETS:
      return {
        ...state,
        ...action.tweets
      }
    case TOGGLE_TWEET:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          likes: action.hasLiked === true
            ? state[action.id].likes.filter((uid) => uid !== action.authedUser)
            : state[action.id].likes.concat([action.authedUser])
        }
      }
    case ADD_TWEET:
      const { tweet } = action
      const repliedTweetId = tweet.replyingTo

      const replyingTo =
        (repliedTweetId === null)
        ? {}
        : {
          [repliedTweetId]: {
            ...state[repliedTweetId],
            replies: state[repliedTweetId].replies.concat([tweet.id])
            }
          }

      return {
        ...state,
        [tweet.id]: tweet, // 新しく作成されたTweet
        ...replyingTo,     // reply先の(既存の)Tweetを書き換えた
      }
    default:
      return state
  }
}
