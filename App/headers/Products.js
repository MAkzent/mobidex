import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import * as AssetService from '../../services/AssetService';
import NavigationService from '../../services/NavigationService';
import { colors } from '../../styles';
import FakeHeaderButton from '../components/FakeHeaderButton';
import ToggleForexButton from '../views/ToggleForexButton';

const DEFAULT_TITLE = 'Trade';

class ProductsHeader extends Component {
  render() {
    return (
      <Header
        backgroundColor={colors.background}
        statusBarProps={{ barStyle: 'light-content' }}
        leftComponent={
          this.props.showBackButton ? (
            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={() => NavigationService.goBack()}
            >
              <Icon name="arrow-back" color="black" size={15} />
            </TouchableOpacity>
          ) : (
            <FakeHeaderButton />
          )
        }
        centerComponent={{
          text: this.renderTitle(),
          style: { color: 'black', fontSize: 18 }
        }}
        rightComponent={
          this.props.showForexToggleButton ? <ToggleForexButton /> : null
        }
        outerContainerStyles={{ height: 60, paddingTop: 0 }}
      />
    );
  }

  renderTitle() {
    if (this.props.title) {
      return this.props.title;
    }

    if (this.props.product) {
      const quoteToken = AssetService.getQuoteAsset();
      const assetA = AssetService.findAssetByAddress(
        this.props.product.assetDataA.address
      );
      const tokenB = AssetService.findAssetByAddress(
        this.props.product.assetDataB.address
      );

      if (quoteToken && assetA && tokenB) {
        if (assetA.address === quoteToken.address) {
          return `Trade ${tokenB.name}`;
        }

        if (tokenB.address === quoteToken.address) {
          return `Trade ${assetA.name}`;
        }
      }
    }

    return DEFAULT_TITLE;
  }
}

ProductsHeader.propTypes = {
  showBackButton: PropTypes.bool,
  showForexToggleButton: PropTypes.bool,
  title: PropTypes.string,
  product: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

export default connect(
  state => ({
    assets: state.relayer.assets
  }),
  dispatch => ({ dispatch })
)(ProductsHeader);
