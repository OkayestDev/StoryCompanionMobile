import React, { Component } from 'react';
import { TouchableOpacity, Dimensions, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { closeAlert } from '../actions/Actions.js';
import { Icon } from 'react-native-elements';

class GlobalAlert extends Component {
    figureAlertColor = () => {
        switch (this.props.type) {
            case 'success':
                return 'green';
            case 'warning':
                return '#F5A623';
            case 'danger':
                return 'red';
        }
    };

    figureIcon = () => {
        switch (this.props.type) {
            case 'success':
                return 'smile-o';
            case 'warning':
                return 'warning';
            case 'danger':
                return 'exclamation-circle';
        }
    };

    render() {
        if (this.props.visible) {
            // Hide the alert after 2.5 seconds
            setTimeout(() => this.props.closeAlert(), 4000);
            return (
                <TouchableOpacity
                    style={[
                        styles.globalAlertContainer,
                        { backgroundColor: this.figureAlertColor() },
                    ]}
                    onPress={() => this.props.closeAlert()}
                >
                    <Icon name={this.figureIcon()} size={32} type="font-awesome" color="white" />
                    <Text style={styles.alertMessageText}>{this.props.message}</Text>
                </TouchableOpacity>
            );
        } else {
            return null;
        }
    }
}

const styles = StyleSheet.create({
    globalAlertContainer: {
        position: 'absolute',
        top: 25,
        width: Dimensions.get('window').width,
        minHeight: 60,
        height: 'auto',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
    },
    alertMessageText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 10,
    },
});

function mapStateToProps(state) {
    return {
        message: state.appStore.globalAlertMessage,
        type: state.appStore.globalAlertType,
        visible: state.appStore.globalAlertVisible,
    };
}

const mapDispatchToProps = {
    closeAlert,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GlobalAlert);
