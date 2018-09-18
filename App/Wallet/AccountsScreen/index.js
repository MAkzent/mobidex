import * as _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import {
  loadAllowances,
  loadBalances,
  updateForexTickers,
  updateTokenTickers
} from '../../../thunks';
import Row from '../../components/Row';
import PageRoot from '../../components/PageRoot';
import TokenList from './TokenList';
import PortfolioDetails from './PortfolioDetails';
import TokenDetails from './TokenDetails';

class AccountsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      asset: 'ETH'
    };
  }

  async componentDidMount() {
    await this.onRefresh(false);
  }

  render() {
    const asset = _.find(this.props.assets, { symbol: this.state.asset });
    const ethToken = _.find(this.props.assets, { symbol: 'ETH' });
    const assets = [ethToken].concat(
      _.filter(
        this.props.assets,
        asset => asset.symbol !== 'WETH' && asset.symbol !== 'ETH'
      )
    );

    return (
      <PageRoot>
        <Row>
          {asset ? (
            <TokenDetails asset={asset} />
          ) : (
            <PortfolioDetails assets={this.props.assets} />
          )}
        </Row>
        <ScrollView
          style={{ width: '100%' }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this.onRefresh()}
            />
          }
        >
          {this.props.assets.length ? (
            <Row>
              <TokenList
                asset={asset}
                assets={assets}
                onPress={asset =>
                  this.setState({
                    asset:
                      this.state.asset !== asset.symbol ? asset.symbol : null
                  })
                }
              />
            </Row>
          ) : null}
        </ScrollView>
      </PageRoot>
    );
  }

  async onRefresh(reload = true) {
    this.setState({ refreshing: true });
    await this.props.dispatch(loadAllowances(reload));
    await this.props.dispatch(loadBalances(reload));
    await this.props.dispatch(updateForexTickers(reload));
    await this.props.dispatch(updateTokenTickers(reload));
    this.setState({ refreshing: false });
  }
}

AccountsScreen.propTypes = {
  assets: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect(
  state => ({ ...state.wallet, ...state.relayer, ...state.device.layout }),
  dispatch => ({ dispatch })
)(AccountsScreen);
