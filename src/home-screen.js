import React, {Component} from 'react';
import {Button, Platform, Text, View, StyleSheet} from 'react-native';
import PlatformSpecific from './platform-specific';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: Platform.OS === 'web' ? 'red' : 'black',
        fontSize: 18
    }
});

export default class HomeScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Pigzbe</Text>
                <Button
                    title="Pixi"
                    onPress={() => this.props.navigation.navigate('Pixi')}
                />
                <Text>Open up App.js to start working on your app!</Text>
                <Text>Changes you make will automatically reload.</Text>
                <Text>Shake your phone to open the developer menu.</Text>
                <PlatformSpecific/>
            </View>
        );
    }
}
