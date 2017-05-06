import React, { Component } from 'react';
import { connect } from 'dva';

class Share extends Component {
  render() {
    const { params } = this.props;
    
    console.log(params);
    return (
      
      <div>
        <img alt="111" src={require('../../assets/yay.jpg')} />
        <div>User</div>
      </div>
    );
  }
}
Share.propTypes = {
};
function mapStateToProps(state) {
  console.log(state);
  // const { ads } = state.home;
  // return {
  //   ads
  // };
}
export default connect(mapStateToProps)(Share);
