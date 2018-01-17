import React from 'react'
import { render } from 'react-dom'
import { combineReducers, createStore } from 'redux'
import { Provider, connect } from 'react-redux'

const reducer1 = (state = {counter:1}, action) => {
  switch (action.type) {
    case 'ACTION':
      return {counter:state.counter+1}
    default:
      return state
  }
}

const reducer2 = (state = {}, action) => {
  switch (action.type) {
    default:
      return state
  }
}

const reducers = combineReducers({
  reducer1,
  reducer2
})

const store = createStore(reducers)

const action = () => ({type: 'ACTION'})

class MyButton extends React.Component {
  render() {
    const {dispatch} = this.props;
    return <button
      onClick={()=>{dispatch(action())}}
    >MyButton</button>
  }
}

MyButton = connect()(MyButton)

class MyStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state={timerHandle:null}
  }
  componentDidMount() {
    this.state.timerHandle=setInterval(()=>{
      this.props.onIncrement()
    }, 1000)
  }
  componentWillUnmount() {
    clearInterval(this.state.timerHandle);
    this.state.timerHandle=null;
  }
  render() {
    return <div>Status : {this.props.content}</div>
  }
}

const MyConnectedStatus = connect(
  (state) => ({
    content: state.reducer1.counter
  }),
  {
    onIncrement: action
  }
)(MyStatus)

render(
  <Provider store={store}>
    <div>
      <MyButton />
      <MyConnectedStatus />
    </div>
  </Provider>,
  document.getElementById('root')
)
