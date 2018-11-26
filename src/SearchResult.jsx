import * as React from 'react';
import { scroll } from './util/';


class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      targetIndex: 0,
      current: 0
    };
  }

  componentDidMount() {
    console.log('init');
    window.addEventListener('keydown', (e) => {
      console.log('The key code is: ' + e.keyCode);

      if (e.keyCode === 74 || e.keyCode === 40) {
        this.setState((state, props) => {
          const newTargetIndex = state.targetIndex + 1 > props.arr.length - 1 ? state.targetIndex : state.targetIndex + 1;
          return {
            targetIndex: newTargetIndex,
            current: scroll.returnCurrent(this.state.current, newTargetIndex)
          }
        });
      }
      if (e.keyCode === 75 || e.keyCode === 38) {
        this.setState((state) => {
          const newTargetIndex = state.targetIndex > 0 ? state.targetIndex - 1 : 0;
          return {
            targetIndex: newTargetIndex,
            current: scroll.returnCurrent(this.state.current, newTargetIndex)
          }
        });
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({
        targetIndex: 0,
        current: 0
      })
    } else {
      let item = document.querySelector('li.selected');
      // 触发时间需要调整 写给函数专门进行判断
      if (item) {
        let searchResult = document.getElementById('searchResult');
        searchResult.scrollTop = parseInt(56 * this.state.current);
      }
    }
  }

  handleItemClick(item, index) {
    const { originData } = this.props;
    // console.log(item);
    // console.log(originData[item.originalIndex].date);
    console.log(originData[item.originalIndex].link);
    console.log(scroll.returnCurrent(this.state.current, index));

    this.setState({
      targetIndex: index,
      current: scroll.returnCurrent(this.state.current, index)
    });
  }

  render() {
    const { targetIndex } = this.state;
    const { arr } = this.props;

    return (
      <ul id='searchResult'>
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
