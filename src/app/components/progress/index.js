import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles';
import Bar from './bar';
import Button from '../button';

export default class Progress extends Component {
    state = {
        active: false
    }

    activate() {
        this.setState({active: true});
    }

    componentDidMount() {
        if (this.props.active) {
            this.activate();
        }
    }

    componentDidUpdate() {
        if (this.props.active && !this.state.active) {
            this.activate();
        }
    }

    render() {
        const {active} = this.state;

        if (!active) {
            return null;
        }

        const {
            title,
            text,
            buttonLabel,
            onPress,
            complete,
            error = null
        } = this.props;

        const errorMessage = (error && error.message) || error;

        return (
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>{title}</Text>
                    {complete ? (
                        <Image style={styles.check} source={require('./images/check.png')}/>
                    ) : (
                        <Bar active={active} error={error}/>
                    )}
                    <View style={styles.inner}>
                        <Text style={errorMessage ? [styles.text, styles.error] : styles.text}>
                            {errorMessage || text}
                        </Text>
                        {buttonLabel &&
                            <Button
                                disabled={!error && !complete}
                                label={buttonLabel}
                                outline
                                onPress={onPress}
                            />}
                    </View>
                </View>
            </View>
        );
    }
}
