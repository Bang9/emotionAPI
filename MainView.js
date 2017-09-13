import React, {Component} from 'react';
import {View, TouchableOpacity, Image, Text, NativeModules} from 'react-native';
import Camera from 'react-native-camera';
import {Actions} from 'react-native-router-flux';
import RNFetchBlob from 'react-native-fetch-blob'

class MainView extends Component{
    constructor(props){
        super(props);
        this.state = {
            uri:null,
            emotion:{
                "anger": 0,
                "contempt": 0,
                "disgust": 0,
                "fear": 0,
                "happiness": 0,
                "neutral": 0,
                "sadness": 0,
                "surprise": 0
            },
            faceRectangle:{
                "top": 0,
                "left": 0,
                "width": 0,
                "height": 0
            }
        };
    }

    componentWillReceiveProps(nextProps){
        console.log('Get new props', nextProps.uri)
        if(nextProps.uri)
            this.setState({uri:nextProps.uri}, ()=>this.fetchImageByBlob())
    }

    fetchImageByBlob(){
        RNFetchBlob.fetch('POST', "https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize", {
            // upload headers
            'Content-Type' : 'application/octet-stream',
            'Ocp-Apim-Subscription-Key':'166c8f68ffc340309d84c5452ab7dec9',
            // Change BASE64 encoded data to a file path with prefix `RNFetchBlob-file://`.
            // Or simply wrap the file path with RNFetchBlob.wrap().
        }, RNFetchBlob.wrap(this.state.uri))
            .then((response) => response.json())
            .then((responseJson) => {
                return this.setState({emotion:responseJson[0].scores,faceRectangle:responseJson[0].faceRectangle });
            })
            .catch((error) => {
                console.error(error);
            });
    }


    render(){
        return(
            <View style={{flex:1, alignItems:'center'}}>
                <View style={{position:'absolute', bottom:30, flexDirection:'row'}}>
                    <TouchableOpacity
                        style={{width:150,height:50,backgroundColor:'#ff8888', justifyContent:'center', alignItems:'center'}}
                        onPress={()=>Actions.camera()}>
                        <Text style={{color:'white'}}>카메라</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{width:150,height:50,borderWidth:2, borderColor:'#ff8888', justifyContent:'center', alignItems:'center'}}
                        onPress={()=>this.fetchImageByBlob()}>
                        <Text style={{color:'#ff8888'}}>감정분석</Text>
                    </TouchableOpacity>
                </View>

                <View style={{flex:1,justifyContent:'center'}}>
                    <Image
                        style={{width:200,height:200}}
                        source={{uri:this.state.uri}}
                    />
                    <View style={{position:'absolute',borderWidth:2,borderColor:'red',
                        width:this.state.faceRectangle.width*.3, height:this.state.faceRectangle.height*.3, left:this.state.faceRectangle.left*.3, top:this.state.faceRectangle.top*.3}} />
                </View>

                <View style={{flex:1}}>
                    <Text>화남 : {this.state.emotion.anger.toFixed(5)}</Text>
                    <Text>경멸 : {this.state.emotion.contempt.toFixed(5)}</Text>
                    <Text>역겨움 : {this.state.emotion.disgust.toFixed(5)}</Text>
                    <Text>두려움 : {this.state.emotion.fear.toFixed(5)}</Text>
                    <Text>행복 : {this.state.emotion.happiness.toFixed(5)}</Text>
                    <Text>슬픔 : {this.state.emotion.sadness.toFixed(5)}</Text>
                    <Text>놀람 : {this.state.emotion.surprise.toFixed(5)}</Text>
                    <Text>중립 : {this.state.emotion.neutral.toFixed(5)}</Text>
                </View>

            </View>
        )
    }
}

export default MainView;