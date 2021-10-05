import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../pages/Home";
import Detail from "../pages/Detail";
import Search from "../pages/Search";

const stack = createNativeStackNavigator();
function Stack(){
    return(
        <stack.Navigator>
            <stack.Screen 
                name="Home" 
                component={Home} 
                options={{
                    headerShown: false
                }}
            />
            <stack.Screen
                name="Detail"
                component={Detail}
                options={{
                    headerShown: false,
                    title: "Detalhes"
                }}
            />
            <stack.Screen
                name="Search"
                component={Search}
                options={{
                    title: "Sua busca",
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        color: "#fff"
                    },
                    headerStyle: {
                        backgroundColor: '#141a29'
                    }
                }}
            />
        </stack.Navigator>
    )
}
export default Stack;