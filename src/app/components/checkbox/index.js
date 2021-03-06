import React from 'react';
import {TouchableOpacity, View, Switch, Image} from 'react-native';
import styles from './styles';
import {color} from 'app/styles';

export default ({children, value, onValueChange, alt}) => {
    if (alt) {
        return (
            <View style={styles.container}>
                <Switch
                    value={value}
                    onValueChange={onValueChange}
                    onTintColor={color.pink}
                />
                <View style={styles.text}>
                    {children}
                </View>
            </View>
        );
    }

    return (
        <TouchableOpacity style={styles.container} onPress={onValueChange}>
            <View style={styles.checkbox}>
                <View style={[styles.outer, value ? styles.outerActive : styles.outerInactive]}>
                    <View style={value ? styles.innerActive : styles.innerInactive}>
                        {value && <Image style={styles.check} source={require('./images/check.png')} />}
                    </View>
                </View>
            </View>
            <View style={styles.text}>
                {children}
            </View>
        </TouchableOpacity>
    );
};
