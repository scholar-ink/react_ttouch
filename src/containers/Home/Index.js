import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd-mobile';
// import { routerRedux } from 'dva/router';


class Index extends React.Component {
  constructor(props) {
    super(props);
    // props.dispatch(routerRedux.push({
    //   pathname: '/logout',
    //   query: {
    //     page: 2,
    //   },
    // }));
  
    props.dispatch({ type: 'home/getCities' });
  }
  onClick() {
    console.log(this);
  }
  render() {
    return (
      <div>
        <Icon type="check" />
        <div onClick={this.onClick}>22211222111</div>

      </div>
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
