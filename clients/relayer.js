import { HttpClient } from '@0xproject/connect';
import { cache, time } from '../decorators/cls';

export default class RelayerClient {
  constructor(relayerEndpoint, options = { network: null }) {
    this.relayerEndpoint = relayerEndpoint;
    this.network = (options || {}).network;
    this.client = new HttpClient(this.relayerEndpoint);
  }

  @time
  @cache('relayer:v2:pairs', 60 * 1)
  async getAssetPairs() {
    const result = await this.client.getAssetPairsAsync({
      networkId: this.network,
      perPage: 1000
    });
    return result.records;
  }

  @time
  @cache('relayer:v2:orders', 1)
  async getOrders() {
    const result = await this.client.getOrdersAsync({
      networkId: this.network,
      perPage: 1000
    });
    return result.records;
  }

  @time
  async getOrder(hash) {
    return await this.client.getOrderAsync(hash, { networkId: this.network });
  }

  @time
  @cache('relayer:v2:orderbook:{}:{}', 1)
  async getOrderbook(baseAssetData, quoteAssetData) {
    const result = await this.client.getOrderbookAsync(
      {
        baseAssetData,
        quoteAssetData
      },
      {
        networkId: this.network,
        perPage: 1000
      }
    );
    return {
      asks: result.asks.records,
      bids: result.bids.records
    };
  }
}
