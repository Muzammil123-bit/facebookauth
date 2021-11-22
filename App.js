import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { LoginManager,GraphRequest,GraphRequestManager } from "react-native-fbsdk";

function App() {
  return(
  <View>
    <Button
    onPress={() => alert('Simple Button pressed')}
  title="Google"
  color="#006400"
  accessibilityLabel="Learn more about this purple button"
/>
<Button
onPress={onFbLogin}
  title="Facebook"
  color=	"#4169E1"
  accessibilityLabel="Learn more about this purple button"
/>
  </View>
  )
}

const fbLogin=(respCallback)=>{
LoginManager.logOut();
return LoginManager.logInWithPermissions(['email','public_profile']).then(result=>{
  console.warn('fb_result',result);
  if (result.declinedPermissions && result.declinedPermissions.includes('email')) {
    respCallback({message:'Email is required'})
  }
  if (result.isCancelled) {
    console.warn(error);
  }
  else{
    const infoRequest=new GraphRequest(
      '/me?fields=name,picture,friend',
      null,
      respCallback
    )
  }
  new GraphRequestManager().addRequest(infoRequest).start();
},
function(error){
console.warn('Login failed with error' + error);
}
)
}

const onFbLogin=async()=>{
try {
  await fbLogin(_onResponseinfoCallback);
} catch (error) {
  console.warn('error'+error)
}
}

const _onResponseinfoCallback=async(error,result)=>{
if (error) {
  console.warn('error_gen' + error);
  return;
}
else{
  const userData=result;
  console.warn('fb_data'+userData);
}
}

const styles = StyleSheet.create({
  Button: {
    color:'#87CEEB',
    borderRadius:'500',
  },
  ButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
