import React, { Component } from 'react';
import { connect } from 'dva';

class Index extends Component {
  
  constructor(props) {
    super(props);
    
    props.dispatch({type: 'home/getCities'});
    
  }
  
  render() {
    
    return (
      
      <div>22211222111</div>
    );
  }
  
}

Index.propTypes = {
};
function mapStateToProps(state) {
  
  const { ads,cities } = state.home;
  return {
    ads,
    cities
  };
}
export default connect(mapStateToProps)(Index);
