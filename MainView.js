import React, {Component} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import Camera from 'react-native-camera';
import {Actions} from 'react-native-router-flux';

class MainView extends Component{
    constructor(props){
        super(props);
        this.state = {
            ImageData:null,
            responseJson:null,
        };
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.ImageData){
            this.setState(ImageData)
        }
    }

    fetchImage(){
        fetch("https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize?", {
            method: 'POST',
            headers: {
                //'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key':'166c8f68ffc340309d84c5452ab7dec9'
            },
            body: JSON.stringify({
                'url': 'http://example.com/picture.jpg',

                firstParam: 'yourValue',
                secondParam: 'yourOtherValue',
            })
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
            <View>
                <Text>
                    {this.state.responseJson}
                </Text>

                <Image
                    source={this.state.ImageData}
                />

                <TouchableOpacity
                    style={{width:200,height:80,backgroundColor:'red'}}
                    onPress={()=>Actions.camera()}>
                    <Text>카메라</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{width:200,height:80,borderWidth:1, borderColor:'red'}}
                    onPress={()=>this.fetchImage()}>
                    <Text>감정분석</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default MainView;