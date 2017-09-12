import React, {Component} from 'react';
import {View, TouchableOpacity, Image, StyleSheet, BackHandler} from 'react-native';
import {Actions, Reducer, Router, Scene} from "react-native-router-flux";
import CameraView from './CameraView';
import MainView from './MainView';
class App extends Component{
    constructor(props){
        super(props);


    }

    render(){
        return(
            <Router navigationBarStyle={styles.navBar}
                    titleStyle={styles.title}
                    createReducer={(params)=>this.reducerCreate(params)}
                    backAndroidHandler={()=>this.onBackHandler()} >

                <Scene key="root">

                    {/* Sign */}
                    <Scene
                        key="main"
                        component={CameraView}
                        hideNavBar={true}
                        sceneStyle ={{marginTop:0}}
                        initial={true}
                    />
                    <Scene
                        key="camera"
                        component={MainView}
                        hideNavBar={true}
                    />
                </Scene>
            </Router>
        )
    }

    reducerCreate(params) {
        const defaultReducer = Reducer(params);
        console.log("PARAM:",params);
        return (state, action) => {
            //console.log("ACTION:", action);
            if (action.scene)
                console.log("ACTION:", [action.scene.sceneKey, action.scene.type]);
            if (action.scene && action.scene.sceneKey === 'main' &&
                (action.scene.type === 'REACT_NATIVE_ROUTER_FLUX_PUSH' || action.scene.type === 'REACT_NATIVE_ROUTER_FLUX_REFRESH')) {
                console.log('catch back to main');
            }
            this.sceneKey = action.scene ? action.scene.sceneKey : '';
            return defaultReducer(state, action);
        }
    }

    onBackHandler() {
        console.log('BackHandler:this.sceneKey:' + this.sceneKey);
        if (this.sceneKey === "main") {
            Alert.alert(
                '알림',
                '앱을 종료하시겠습니까?', [
                    {
                        text: '네',
                        onPress: () => BackHandler.exitApp()
                    },
                    {
                        text: '아니요'
                    }
                ]

            );
            return true; //remain in app
        } else {
            try {
                Actions.pop();
                return true;
            } catch (e) {
                console.log('onBackHandler:pop failed -maybe at root?');
                return false;
            }
        }
    }
}
const styles = StyleSheet.create({
    navBar:{
        backgroundColor : '#ff8888',
        borderBottomColor:'#ffffff00'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
    },
    scene: {
        flex :1,
        marginTop : (Platform.OS === 'ios') ? 64 : 54
    },
    title: {
        fontSize: 17,
        fontWeight: "600",
        color:'white',
    }
});

export default App;