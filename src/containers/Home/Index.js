import React from 'react';
import { connect } from 'dva';

class Index extends React.Component {
  constructor(props) {
    super(props);
    props.dispatch({ type: 'home/getCities' });
  }
  onClick() {
    console.log(this);
  }
  render() {
    return (
      <div onClick={this.onClick}>22211222111</div>
    );
  }
}

Index.propTypes = {
};
function mapStateToProps(state) {
  const { ads, cities } = state.home;
  return {
    ads,
    cities,
  };
}
export default connect(mapStateToProps)(Index);
