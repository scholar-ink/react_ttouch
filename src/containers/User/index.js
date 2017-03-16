import React, { Component } from 'react';
import { connect } from 'dva';

class Index extends Component {
  render() {
    return (
      <div>User</div>
    );
  }
}
Index.propTypes = {
};
function mapStateToProps(state) {
  console.log(state);
  // const { ads } = state.home;
  // return {
  //   ads
  // };
}
export default connect(mapStateToProps)(Index);
