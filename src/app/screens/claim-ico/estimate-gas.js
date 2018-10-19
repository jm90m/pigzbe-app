import React, {Component} from 'react';
import {connect} from 'react-redux';
import {SCREEN_CLAIM_ICO_BURN} from 'app/constants';
import ClaimEstimateGas from '../claim-estimate-gas';
import {
    getGasEstimate,
    appAddWarningAlert,
} from '../../actions';

export class EstimateGas extends Component {
    state = {
        estimatedCost: null,
    }

    async componentDidMount() {
        try {
            const {estimatedCost, estimatedCostUSD} = await this.props.dispatch(getGasEstimate());

            this.setState({
                estimatedCost: `${estimatedCost} ETH ($${estimatedCostUSD})`,
            });
        } catch (err) {
            console.log('getGasEstimate error:');
            console.log(err);
            this.props.dispatch(appAddWarningAlert('Could not get gas estimate'));
        }
    }

    onCancel = () => this.props.navigation.goBack()

    onConfirm = () => this.props.navigation.navigate(SCREEN_CLAIM_ICO_BURN)

    render() {
        return (
            <ClaimEstimateGas
                estimatedCost={this.state.estimatedCost}
                onConfirm={this.onConfirm}
                onCancel={this.onCancel}
            />
        );
    }
}

export default connect()(EstimateGas);
