import React from 'react';
import {View} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import Balance from '../../src/app/components/balance';

const style = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 40,
};

const grey = {
    backgroundColor: 'rgb(180, 180, 180)'
};

const props = {
    balance: '100',
    baseCurrency: 'USD',
    exchange: {
        XLM: 0.3936,
        BTC: 0.0000147,
        ETH: 0.00025584,
        EUR: 0.102828,
        USD: 0.12,
        JPY: 13.8984,
        GBP: 0.091956,
        GOLD: 0.0031452
    },
};

storiesOf('Balance')
    .add('default', () => (
        <View style={[style, grey]}>
            <Balance {...props}/>
        </View>
    ))
    .add('dark', () => (
        <View style={[style, grey]}>
            <Balance {...{
                ...props,
                dark: true,
            }}/>
        </View>
    ))
    .add('no exchange', () => (
        <View style={[style, grey]}>
            <Balance {...{
                ...props,
                exchange: null,
            }}/>
        </View>
    ))
    .add('dark no exchange', () => (
        <View style={[style, grey]}>
            <Balance {...{
                ...props,
                dark: true,
                exchange: null,
            }}/>
        </View>
    ))
    .add('label', () => (
        <View style={[style, grey]}>
            <Balance {...{
                ...props,
                dark: true,
                exchange: null,
                label: 'Wollo balance',
            }}/>
        </View>
    ));
