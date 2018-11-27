import * as React from 'react';
import { ipcRenderer, remote } from 'electron';
import { fuzzyMatch } from './util/';
import SearchResult from './SearchResult';

const originData = remote.getGlobal('sharedObject').originData;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      data: [],
      result: [],
      mode: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.setState({
      data: originData
    });
  }

  handleChange(event) {
    // console.log(event.target.value);
    let ret = event.target.value.trim() === '' ? [] : fuzzyMatch.fuzzyList(event.target.value, originData, this.state.mode);
    // console.log(ret);
    // console.log(ret.length);
    this.setState({
      value: event.target.value,
      result: ret
    });
  }

  handleClick() {
    this.setState(state => {
      return {
        mode: state.mode === 0 ? 1 : 0
      };
    });
  }

  render() {
    const { value, result, mode } = this.state;
    // const arr = result.slice(0, 10);
    const arr = result;
    ipcRenderer.send('change-win', { listHeight: arr.length > 10 ? 10 : arr.length });
    console.log(arr.length, value);

    return (
      <div>
        <div id='inputWrapper'>
          <input id='searchInput' value={ value } onChange={ this.handleChange } />
          <div className={ `inputAfter ${ mode === 0 ? '' : 'toggle' }`} onClick={ this.handleClick }>
            <button aria-label='搜索' type='button' className='btn searchBar-searchIcon Button--primary'>
              <span></span>
            </button>
          </div>
        </div>
        <SearchResult value={ value } arr={ arr } originData={ originData } />
      </div>
    );
  }
}

export default App;
