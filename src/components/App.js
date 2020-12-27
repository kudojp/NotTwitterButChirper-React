import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <div>
        <Dashboard />
      </div>
    )
  }
}

// mapStateToPropsとmapDispatchToPropsのどちらも引数に渡されていないので、
// 全てのstateにAppからアクセスできる？
// dispatchはどうだろう？
export default connect()(App)
