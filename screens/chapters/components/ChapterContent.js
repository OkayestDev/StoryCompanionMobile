import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';

export default class ChapterContent extends Component {
    render() {
        return (
            <View style={STYLE.container}>
                <View style={STYLE.chapterLabelContainer}>
                    <Text style={STYLE.chapterLabel} numberOfLines={1}>
                        {this.props.chapterNumber}. {this.props.chapterName}
                    </Text>
                </View>
                <TextInput
                    placeholder="Chapter Content..."
                    underlineColorAndroid="rgba(0,0,0,0)"
                    style={STYLE.chapterContentInput}
                    value={this.props.chapterContent}
                    multiline={true}
                    onChangeText={this.props.handleContentChanged}
                />
            </View>
        );
    }
}

const STYLE = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    chapterLabelContainer: {
        height: '10%',
        paddingLeft: 5,
        paddingRight: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    chapterLabel: {
        fontSize: 24,
        color: '#2f95dc',
        fontWeight: 'bold',
    },
    chapterContentInput: {
        height: '90%',
        width: '98%',
        marginLeft: '1%',
        marginRight: '1%',
        textAlignVertical: 'top',
        fontSize: 18,
        padding: 10,
        borderRadius: 4,
        borderWidth: 3,
        borderStyle: 'solid',
        borderColor: '#CCCCCC',
    },
});
