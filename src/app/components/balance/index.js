import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Text,
    View,
    Image
} from 'react-native';
import Avatar from '../avatar';
import styles from './styles';
import {
    strings,
    SCREEN_ESCROW
} from '../../constants';
import ConvertBalance from '../convert-balance';
import Graph from '../balance-graph';
import Loader from '../loader';
import BaseView from '../base-view';
import Pig from '../pig';
import Button from '../button';
import Alert from '../alert';

const coins = ['xlm', 'btc', 'eth', 'eur', 'usd', 'jpy', 'gbp'];

export const Wollo = ({balance}) => (
    <View style={styles.wolloContainer}>
        <View style={styles.balanceContainer}>
            <Image style={styles.currencyLogo} source={require('./images/currency_logo.png')} />
            <Text style={styles.balance}>{Number(balance).toFixed(2)}</Text>
        </View>
        <Text style={styles.label}>{strings.walletBalance}</Text>
    </View>
);

class Balance extends Component {

  state = {
      exchange: null,
      error: null
  }

  componentWillMount() {
      this.getExchange();
  }

  getExchange = async () => {
      try {
          const values = await (await fetch(`https://min-api.cryptocompare.com/data/price?fsym=XLM&tsyms=${coins.toString().toUpperCase()}`, {
              method: 'GET'
          })).json();

          this.setState({
              exchange: {...values},
              error: null
          });
      } catch (error) {
          this.setState({
              error: new Error('Network error')
          });
      }
  }

  render () {
      const {exchange, error} = this.state;
      const {
          balance,
          escrow,
          name,
          image,
          navigation
      } = this.props;

      if (!exchange && !error) {
          return <Loader isLoading />;
      }

      return (
          <BaseView showSettings navigation={navigation} scrollViewStyle={styles.container}>
              <Avatar image={image}/>
              <Text style={styles.welcome}>{strings.walletGreeting} {name}</Text>
              <Wollo balance={balance}/>
              <Pig style={styles.pig}/>
              <Graph balance={balance} balanceConvert={balance * exchange.USD}/>
              <ConvertBalance coins={coins.filter(c => c !== 'usd')} exchange={exchange} balance={balance}/>
              {escrow ? (
                  <View style={styles.escrow}>
                      <Button
                          label={'Escrow account'}
                          onPress={() => navigation.navigate(SCREEN_ESCROW)}
                      />
                  </View>
              ) : null}
              <Alert
                  error={error}
              />
          </BaseView>
      );
  }
}

// export for test
export const BalanceComponent = Balance;

export default connect(
    state => ({
        balance: state.wollo.balance,
        escrow: state.escrow.escrowPublicKey,
        name: state.profile.name,
        image: state.profile.image
    })
)(Balance);
