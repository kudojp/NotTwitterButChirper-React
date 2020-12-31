import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatTweet, formatDate } from '../utils/helpers'
import { TiArrowBackOutline, TiHeartOutline, TiHeartFullOutline } from 'react-icons/ti/index'
import { handleToggleTweet } from '../actions/tweets'
import { Link, withRouter } from 'react-router-dom'

class Tweet extends Component {
  handleLike = (e) => {
    e.preventDefault()

    const { dispatch, tweet, authedUser } = this.props

    dispatch(handleToggleTweet({
      id: tweet.id,
      hasLiked: tweet.hasLiked, // もともとLikeされているかどうか
      authedUser,
    }))
  }

  toParent = (e, id) => {
    e.preventDefault()
    // Redirect to parent Tweet.
    this.props.history.push(`/tweet/${id}`)
  }

  render() {
    const { tweet } = this.props

    if (tweet === null) {
      return <p>This Tweet does not exist.</p>
    }

    const {
      name, avatar, timestamp, text, hasLiked, likes, replies, id, parent
    } = tweet

    return (
      <Link to={`/tweet/${id}`} className='tweet'>
        <img
          src={avatar}
          alt={`Avatar of ${name}`}
          className='avatar'
        />

        <div className='tweet-info'>
          <span>{name}</span>
          <div>
            <div>{formatDate(timestamp)}</div>
            {parent && (
              <button
                className='replying-to'
                onClick={(e) => this.toParent(
                  e, parent.id
                )}>
                Replying to @{parent.author}
              </button>
            )}
            <p>{text}</p>
          </div>

          <div className='tweet-icons'>
            <TiArrowBackOutline className='tweet-icon' />
            <span>{replies !== 0 && replies}</span>

            <button className='heart-button' onClick={this.handleLike}>
              {hasLiked === true
                ? <TiHeartFullOutline color='#e0245e' className='tweet-icon' />
                : <TiHeartOutline className='tweet-icon' />
              }
            </button>
            <span>{likes !== 0 && likes}</span>
          </div>
        </div>
      </Link>
    )
  }
}

// mapStateToPropsの第二引数は、そのComponent自身のprops(要はthis.props)が渡される
function mapStateToProps({ authedUser, users, tweets }, { id }) {
  const tweet = tweets[id]
  const parentTweet = tweet ? tweets[tweet.replyingTo] : null

  return {
    authedUser,
    tweet: tweet
      ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
      : null
  }
}

export default withRouter(connect(mapStateToProps)(Tweet))
