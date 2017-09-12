import React, {Component} from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Camera from 'react-native-camera';

class CameraView extends Component{
    constructor(props){
        super(props);

        this.camera = null;

        this.state = {
            camera: {
                aspect: Camera.constants.Aspect.fill,
                captureTarget: Camera.constants.CaptureTarget.cameraRoll,
                type: Camera.constants.Type.back,
                orientation: Camera.constants.Orientation.auto,
                flashMode: Camera.constants.FlashMode.auto,
            },
            ImageData:null,
        };
    }

    takePicture() {
        if (this.camera) {
            this.camera.capture()
                .then((data) => this.setState(ImageData))
                .catch(err => console.error(err));
        }
    }

    render(){
        return(
            <View>
                <Camera
                    ref={(cam) => {
                        this.camera = cam;
                    }}
                    style={styles.preview}
                    aspect={this.state.camera.aspect}
                    captureTarget={this.state.camera.captureTarget}
                    type={this.state.camera.type}
                    flashMode={this.state.camera.flashMode}
                    onFocusChanged={() => {}}
                    onZoomChanged={() => {}}
                    defaultTouchToFocus
                    mirrorImage={false}
                />


                <View style={[styles.overlay, styles.bottomOverlay]}>
                    <TouchableOpacity
                        style={{width:50,height:50,backgroundColor:'white'}}
                        onPress={()=>this.takePicture}
                    >
                        <Text style={{fontSize:36,color:'black'}}>캡쳐</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    style={{width:50,height:50,backgroundColor:'white'}}
                    onPress={()=>Actions.pop(this.state)}
                    >
                    <Text style={{fontSize:36,color:'black'}}>뒤로</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    overlay: {
        position: 'absolute',
        padding: 16,
        right: 0,
        left: 0,
        alignItems: 'center',
    },
    topOverlay: {
        top: 0,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bottomOverlay: {
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    captureButton: {
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 40,
    },
    typeButton: {
        padding: 5,
    },
    flashButton: {
        padding: 5,
    },
    buttonsSpace: {
        width: 10,
    },
});

export default CameraView;