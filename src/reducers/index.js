import { combineReducers } from 'redux'
import authUser from './authed_user'
import users from './users'
import tweets from './tweets'

export default combineReducers({
  authUser,
  users,
  tweets
})
