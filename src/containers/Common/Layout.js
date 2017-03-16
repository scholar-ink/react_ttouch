/**
 * Created by zhouchao on 16/11/26.
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import { ActivityIndicator } from 'antd-mobile';

class Common extends Component {
  render() {
    return (
      <div>
        <div className="container">
          {this.props.children}
        </div>
        <ActivityIndicator
          toast
          text={this.props.animatingText}
          animating={this.props.animating}
        />
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { animating, animatingText } = state.common;
  return {
    animating,
    animatingText,
  };
}
export default connect(mapStateToProps)(Common);
