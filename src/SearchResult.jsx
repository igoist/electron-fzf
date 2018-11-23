import * as React from 'react';
import { scroll } from './util/';

class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      targetIndex: 0
    };
  }

  componentDidMount() {

    window.addEventListener('keydown', (e) => {
      console.log('The key code is: ' + e.keyCode);
      // if ((e.key === 'b' || e.key === 'B') && e.metaKey) {
      //   ctrlPanel.classList.toggle('closed')
      // }
      if (e.keyCode === 74 || e.keyCode === 40) {
        this.setState((state, props) => {
          return {
            targetIndex: state.targetIndex + 1 > props.arr.length - 1 ? state.targetIndex : state.targetIndex + 1
          }
        });
      }
      if (e.keyCode === 75 || e.keyCode === 38) {
        this.setState((state) => {
          return {
            targetIndex: state.targetIndex > 0 ? state.targetIndex - 1 : 0
          }
        });
      }
    });
  }

  componentDidUpdate() {
    let item = document.querySelector('li.selected');
    if (item) {
      let searchResult = document.getElementById('searchResult');
      // console.log('here');
      scroll.animateScroll2(searchResult, parseInt(searchResult.dataset.s));
      // searchResult.scrollTop = parseInt(searchResult.dataset.s);
    }
  }

  handleItemClick(item, index) {
    const { originData } = this.props;
    // console.log(item);
    // console.log(originData[item.originalIndex].date);
    console.log(originData[item.originalIndex].link);
    this.setState({
      targetIndex: index
    });
  }

  render() {
    const { targetIndex } = this.state;
    const { arr } = this.props;

    return (
      <ul id='searchResult' data-s={ 56 * (targetIndex - 9 > 0 ? targetIndex - 9 : 0) }>
        {
          arr.map((item, i) => {
            item.index = i;
            return <li key={ i.toString() } className={ targetIndex === i ? 'selected': '' } onClick={ () => this.handleItemClick(item, i) } dangerouslySetInnerHTML={{ __html: item.colored }}></li>
          })
        }
      </ul>
    );
  }
}

export default SearchResult;
