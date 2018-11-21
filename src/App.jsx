import * as React from 'react';
import { ipcRenderer, remote } from 'electron';
import { fuzzyMatch } from './util/';

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
    const arr = result.slice(0, 10);
    ipcRenderer.send('change-win', { listHeight: arr.length });
    console.log(arr);

    return (
      <div>
        <input id='searchInput' value={ value } onChange={ this.handleChange } />
        <ul id='searchResult'>
          {
            arr.map((item, i) => {
              return <li key={ i.toString() } dangerouslySetInnerHTML={{ __html: item.colored }}></li>
            })
          }
        </ul>
      </div>
    );
  }
}

export default App;