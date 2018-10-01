
import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import SelectInput from 'app/components/select-input';
import Button from 'app/components/button';
import WolloSlider from 'app/components/wollo-slider';
import {moveGoalWollo} from 'app/actions';
import styles from './styles';

export class GameGoalWolloMove extends Component {
    static defaultProps = {
        goals: [],
    }
    state = {
        goalAddress: null,
        amount: 0,
    }
    render() {
        const {goals, goalBalance} = this.props;
        return (
            <View style={styles.box}>
                <SelectInput
                    value={this.state.goalAddress}
                    placeholder={'Move to tree'}
                    onChangeSelection={goalAddress => this.setState({goalAddress})}
                    options={goals.reduce((obj, goal) => {
                        obj[goal.address] = goal.name;
                        return obj;
                    }, {})}
                />

                <WolloSlider
                    actionLabel="Select amount to move"
                    sliderValueToAmount={value => {
                        // between 0 and goalBalance
                        return Math.round(goalBalance * value);
                    }}
                    onChange={amount => this.setState({amount})}
                />
                <Button
                    label="Move Wollo"
                    disabled={this.state.amount === 0 || !this.state.goalAddress}
                    onPress={() => {
                        this.props.moveWollo(this.state.goalAddress, this.state.amount);
                    }}
                />
            </View>
        )
    }
}

export default connect(
    state => ({
        loading: state.kids.goalLoading,
    }),
    (dispatch, ownProps) => ({
        moveWollo: (destinationGoalAddress, amount) => dispatch(moveGoalWollo(ownProps.goalAddress, destinationGoalAddress, amount))
    })
)(GameGoalWolloMove);
