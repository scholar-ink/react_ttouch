import React, { Component } from 'react';
import { connect } from 'dva';

class Share extends Component {
  render() {
    return (
      <div>User</div>
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
