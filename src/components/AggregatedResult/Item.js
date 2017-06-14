import React, { Component, PropTypes } from 'react';
import Detail from './Detail';

class Item extends Component {
  static propTypes = {
    result: PropTypes.object.isRequired,
    link_text: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  state = { expand: false };

  onClick(e) {
    e.preventDefault();
    this.setState({ expand: !this.state.expand });
  }

  render() {
    const { expand } = this.state;
    return (
      <div className="explorer__result-item">
        <a href="#" className="explorer__result-item__label" onClick={this.onClick}>{this.props.link_text}</a>
        {expand ? <Detail result={this.props.result} /> : null}
      </div>
    );
  }
}

export default Item;
