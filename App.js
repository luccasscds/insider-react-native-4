import 'react-native-gesture-handler';
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";

import Routes from "./src/Routes";

function App(){
  return (
    <NavigationContainer>
      <StatusBar hidden={true} />
      <Routes/>
    </NavigationContainer>
  ) 
}

export default App;