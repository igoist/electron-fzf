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
      result: []
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      data: originData
    });
  }

  handleChange(event) {
    // console.log(event.target.value);
    let ret = event.target.value.trim() === '' ? [] : fuzzyMatch.fuzzyList(event.target.value, originData);
    // console.log(ret);
    // console.log(ret.length);
    this.setState({
      value: event.target.value,
      result: ret
    });
  }


  render() {
    const { value, result } = this.state;
    // const arr = result.slice(0, 10);
    const arr = result;
    ipcRenderer.send('change-win', { listHeight: arr.length > 10 ? 10 : arr.length });
    console.log(arr.length);

    return (
      <div>
        <input id='searchInput' value={ value } onChange={ this.handleChange } />
        <SearchResult arr={ arr } originData={ originData } />
      </div>
    );
  }
}

export default App;
