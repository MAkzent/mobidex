import React, { Component } from 'react';
import { connect } from 'react-redux';
import TransactionItem from './TransactionItem';
import { formatAmountWithDecimals } from '../../../utils';
import * as AssetService from '../../../services/AssetService';

class CancelledItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      makerToken: null,
      takerToken: null,
      ready: false
    };
  }

  async componentDidMount() {
    const makerToken = AssetService.findAssetByAddress(
      this.props.transaction.makerToken ||
        this.props.transaction.makerTokenAddress
    );
    const takerToken = AssetService.findAssetByAddress(
      this.props.transaction.takerToken ||
        this.props.transaction.takerTokenAddress
    );
    this.setState({
      makerToken,
      takerToken,
      ready: true
    });
  }

  render() {
    if (!this.state.ready) {
      return null;
    }

    let {
      id,
      cancelledMakerTokenAmount,
      cancelledTakerTokenAmount,
      makerTokenAmount,
      takerTokenAmount,
      timestamp
    } = this.props.transaction;
    let { makerToken, takerToken } = this.state;

    return (
      <TransactionItem
        action="CANCEL"
        label={'Cancelled'}
        source={{
          amount: formatAmountWithDecimals(
            cancelledMakerTokenAmount || makerTokenAmount,
            makerToken.decimals
          ),
          symbol: makerToken.symbol
        }}
        destination={{
          amount: formatAmountWithDecimals(
            cancelledTakerTokenAmount || takerTokenAmount,
            takerToken.decimals
          ),
          symbol: takerToken.symbol
        }}
        timestamp={timestamp}
      />
    );
  }
}

export default connect(
  state => ({ ...state.wallet, ...state.device.layout }),
  dispatch => ({ dispatch })
)(CancelledItem);
