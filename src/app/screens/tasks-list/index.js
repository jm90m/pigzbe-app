import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, FlatList, Dimensions} from 'react-native';
import Button from '../../components/button';
import {SCREEN_BALANCE} from '../../constants';
import StepModule from '../../components/step-module';
import TextInput from '../../components/text-input';
import Toggle from '../../components/toggle';
import {color} from '../../styles';
import {tasksAddTask, loadTasks} from '../../actions';

const buttonStyle = {
    background: 'transparent',
    border: color.blue,
    fontSize: 14,
    paddingTop: 10,
    height: 45,
    lineHeight: 40,
    marginBottom: 20,
    width: Dimensions.get('window').width * 0.35,
    textAlign: 'center',
};

const innerStyle = {
    borderRadius: 22.5,
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    height: 45,
};

export class TasksList extends Component {
    state = {
        loading: false,
        showingInput: false,
        tasks: ['wash dishes', 'clean room', 'do your homework'],
        active: null,
    }

    componentWillMount() {
        console.log('tasksList componentWillMount');
        this.props.dispatch(loadTasks());
        console.log('tasksList after');
    }

    getTasksList = () => this.props.tasks.map(task => ({
        key: task,
    }));

    onBack = () => this.props.navigation.navigate(SCREEN_BALANCE);

    onChangeText = (task) => {
        this.setState({newTask: task});
    }

    showInput = () => this.setState({showingInput: true})

    saveTask = async () => {
        await this.props.dispatch(tasksAddTask(this.state.newTask));
        this.setState({
            newTask: null,
            showingInput: false,
        });
    }

    render() {
        const {showingInput, active} = this.state;

        const {
            tasks,
            loading,
        } = this.props;

        console.log('loading', loading, tasks);

        console.log('taskslist', this.props);

        return (
            <StepModule
                title="Tasks"
                icon="family"
                content={'Please choose a task from below list'}
                pad
                loading={this.state.loading}
                onBack={this.onBack}
            >
                <FlatList
                    data={
                        this.getTasksList()
                    }
                    renderItem={({item}) => (<Toggle
                        style={buttonStyle}
                        innerStyle={innerStyle}
                        label={item.key}
                        onPress={() => {
                            this.setState({active: item.key});
                        }}
                        active={active === item.key}
                    />)
                    }
                />
                {showingInput ?
                    <View>
                        <TextInput
                            numberOfLines={1}
                            placeholder="New Task"
                            onChangeText={this.onChangeText}
                            returnKeyType="done"
                        />
                        <Button
                            label={'Save'}
                            onPress={this.saveTask}
                        />
                    </View>
                    :
                    <Button
                        label={'Add another'}
                        onPress={this.showInput}
                    />
                }
            </StepModule>
        );
    }
}

export default connect(
    state => ({
        tasks: state.tasks.tasks,
        loading: state.tasks.loading
    })
)(TasksList);
