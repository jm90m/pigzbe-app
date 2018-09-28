import React, {Component} from 'react';
import {TouchableOpacity, View, Text, Image} from 'react-native';
import styles from './styles';

export class Cloud extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    componentDidMount() {
    }

    render() {
        const {value, type, callback} = this.props;

        return (
            <TouchableOpacity style={styles.outer} onPress={callback}>
                <Image style={styles.cloud} source={require('./images/cloud.png')} />
                <View style={styles.content}>
                    <Text style={styles.value}>{value}</Text>
                    <Text style={styles.type}>{type}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

export default Cloud;
