import React, {Component} from 'react';
import {View, TouchableOpacity, Image, Text, NativeModules} from 'react-native';
import Camera from 'react-native-camera';
import {Actions} from 'react-native-router-flux';

class MainView extends Component{
    constructor(props){
        super(props);
        this.state = {
            uri:null,
            responseJson:null,
            base64:[]
        };
    }

    componentWillReceiveProps(nextProps){
        console.log('Get new props', nextProps.uri)
        if(nextProps.uri)
            this.setState({uri:nextProps.uri})
    }

    convertImage(uri){
        NativeModules.RNImageToBase64.getBase64String(uri, (err, base64) => {
            // Do something here.
            console.log('base64',base64)
            this.setState({base64:[base64]})
        });
    }

    fetchImage(){
        this.convertImage(this.state.uri);

        fetch("https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize?", {
            method: 'POST',
            headers: {
                //'Accept': 'application/json',
                //'Content-Type': 'application/json',
                'Content-Type': 'application/octet-stream',
                'Ocp-Apim-Subscription-Key':'166c8f68ffc340309d84c5452ab7dec9'
            },
            body: JSON.stringify(
                //'url': this.state.uri,
                this.state.base64
            )
        })
            .then((response) => response.json())
            .then((responseJson) => {
                return this.setState({responseJson});
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render(){
        return(
            <View style={{flex:1}}>
                <Text>
                    {JSON.stringify(this.state.responseJson)}
                </Text>

                <Image
                    style={{width:200,height:200}}
                    source={{uri:this.state.uri}}
                />

                <TouchableOpacity
                    style={{width:300,height:50,backgroundColor:'red'}}
                    onPress={()=>Actions.camera()}>
                    <Text>카메라</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{width:300,height:50,borderWidth:1, borderColor:'red'}}
                    onPress={()=>this.fetchImage()}>
                    <Text>감정분석</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default MainView;