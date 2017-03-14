import React, { Component } from 'react';
import { connect } from 'dva';


class Index extends Component {
  
  constructor(props) {
    super(props);
    
    console.log(props.params.uid);
    
  }
  
  render() {
    
    return (
      <div>list{this.props.params.uid}</div>
    );
  }
  
}

Index.propTypes = {
};
function mapStateToProps(state) {
  
  // const { ads } = state.home;
  // return {
  //   ads
  // };
}
export default connect(mapStateToProps)(Index);
