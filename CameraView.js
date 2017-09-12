import React, {Component} from 'react';
import {View, TouchableOpacity, Image, StyleSheet, Text} from 'react-native';
import Camera from 'react-native-camera';
import {Actions} from 'react-native-router-flux';
import ImageResizer from 'react-native-image-resizer';



class CameraView extends Component{
    constructor(props){
        super(props);

        this.camera = null;

        this.state = {
            camera: {
                aspect: Camera.constants.Aspect.fill,
                captureTarget: Camera.constants.CaptureTarget.cameraRoll,
                type: Camera.constants.Type.front,
                orientation: Camera.constants.Orientation.auto,
                flashMode: Camera.constants.FlashMode.auto,
            },
            ImageData:null,
        };
    }

    takePicture() {
        if (this.camera) {
            this.camera.capture()
                .then((data) => {
                    console.log('captured')
                    ImageResizer.createResizedImage(data.mediaUri, 1000, 1000, 'JPEG', 80)
                        .then(({uri}) => {
                            console.log(uri)
                            // response.uri is the URI of the new image that can now be displayed, uploaded...
                            // response.path is the path of the new image
                            // response.name is the name of the new image with the extension
                            // response.size is the size of the new image
                            console.log('Will pop',uri)
                            Actions.pop();
                            Actions.refresh({uri:uri})
                        }).catch((err) => {
                        // Oops, something went wrong. Check that the filename is correct and
                        // inspect err to get more details.
                    });
                })
                .catch(err => console.error(err));
        }
    }

    render(){
        return(
            <View style={styles.container}>
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
                        onPress={()=>this.takePicture()}
                    >
                        <Text style={{fontSize:25,color:'black'}}>캡쳐</Text>
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