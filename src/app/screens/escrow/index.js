import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
// import {View} from 'react-native';
import Loader from '../../components/loader';
import Transaction from './transaction';
// import Wollo from '../../components/wollo';
import {strings, SCREEN_BALANCE} from '../../constants';
import {loadEscrowAccount, validateTx} from '../../actions';
import ScrollList from '../../components/scroll-list';
// import Footer from '../../components/footer';
import StepModule from '../../components/step-module';

export class Escrow extends Component {
    async componentDidMount() {
        const {dispatch, transactions} = this.props;

        await dispatch(loadEscrowAccount());

        for (const transaction of transactions) {
            await dispatch(validateTx(transaction.xdr));
        }
    }

    onBack = () => this.props.navigation.navigate(SCREEN_BALANCE)

    render() {
        const {
            dispatch,
            // balance,
            transactions,
            submitting
        } = this.props;

        // console.log(JSON.stringify(this.props, null, 2));

        return (
            <Fragment>
                <StepModule
                    title={'Distribution lock-up'}
                    content={'Your Wollo release schedule:'}
                    icon="coins"
                    scroll={false}
                    // headerChildren={(
                    //     <View style={{marginBottom: -20}}>
                    //         <Wollo balance={balance}/>
                    //     </View>
                    // )}
                >
                    <ScrollList
                        items={transactions.map(t => ({...t, dispatch}))}
                        ItemComponent={Transaction}
                    />
                </StepModule>
                <Loader
                    isLoading={submitting}
                    message={strings.escrowSubmitting}
                    transparent
                />
            </Fragment>
        );
    }
}

export default connect(state => ({
    // balance: state.escrow.balance,
    transactions: state.escrow.transactions,
    loading: state.escrow.loading,
    error: state.escrow.error,
    submitting: state.escrow.submitting
}))(Escrow);
