import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {authCreate} from '../../actions';
// import Button from '../../components/button';
import Loader from '../../components/loader';
// import {strings} from '../../constants';
// import {SCREEN_CREATE_KEYS} from '../../constants';
import StepModule from '../../components/step-module';
import NumPad from '../../components/num-pad';
import Dots from '../../components/dots';

const PASSCODE_LENGTH = 6;

class SetPasscode extends Component {
    state = {
        input: '',
        code: null,
        confirmed: false,
        error: false,
    }

    onInput = input => this.setState({input})

    onCodeEntered = code => {
        console.log('onCodeEntered code:', code);

        this.setState({code, input: ''});
    }

    onCodeConfirmed = code => {
        console.log('onCodeConfirmed code:', code, this.state.code);

        const confirmed = code === this.state.code;

        this.setState({
            confirmed,
            error: !confirmed
        });

        if (confirmed) {
            this.props.dispatch(authCreate(this.state.code));
        }
    }

    onReset = () => {
        this.setState({
            confirmed: false,
            error: false,
            code: null,
            input: '',
        });
    }

    onSkip = () => this.props.dispatch(authCreate('111111'))

    render() {
        const {isLoading} = this.props;

        return (
            <StepModule
                title={this.state.code ? 'Re-enter Passcode' : 'Passcode needed'}
                icon="touch-id"
                scroll={false}
                tagline="Please create a back-up passcode to log in in the event your Touch ID doesn’t work."
            >
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
                    <View style={{position: 'absolute', top: -330, left: 0, alignItems: 'center', backgroundColor: 'red', width: '100%'}}>
                        <Dots length={PASSCODE_LENGTH} progress={this.state.input.length}/>
                    </View>
                    <NumPad
                        key={this.state.code ? 'confirm' : 'enter'}
                        length={PASSCODE_LENGTH}
                        onInput={this.onInput}
                        onFull={this.state.code ? this.onCodeConfirmed : this.onCodeEntered}
                    />
                    {/* {this.state.code && (
                        <Fragment>
                            <Button
                                label={strings.loginSubmitButtonLabel}
                                onPress={this.onSubmit}
                                disabled={!this.state.confirmed}
                            />
                            <Button
                                secondary
                                label={'Reset'}
                                onPress={this.onReset}
                            />
                        </Fragment>
                    )} */}
                </View>
                <Loader
                    white
                    isLoading={isLoading}
                />

            </StepModule>

        );
    }
}

export default connect(
    state => ({
        isLoading: state.loader.isLoading,
        error: state.auth.error
    })
)(SetPasscode);
