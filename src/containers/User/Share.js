import React, { Component } from 'react';
import { connect } from 'dva';


class Index extends Component {
  
  constructor(props) {
    super(props);
    
    
    console.log(props.params.rid);
    
  }
  
  render() {
    
    return (
      <div>Share</div>
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
