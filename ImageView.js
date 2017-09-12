import React, {Component} from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';

class ImageView extends Component{
    constructor(props){
        super(props);
        console.log(props.uri)
        this.state = {
            uri:this.props.uri.path,
        };
    }

    render(){
        return(
            <View style={{flex:1}}>
                <Image
                    style={{width:200,height:200}}
                    source={{uri:this.state.uri}}
                />
            </View>
        )
    }
}

export default ImageView;