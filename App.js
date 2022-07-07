import React, { Component, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  CommonActions,
  Alert,
  DevSettings,
} from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import FeatherIcons from "react-native-vector-icons/Feather";

import Ionicons from "react-native-vector-icons/Ionicons";

import apiConfig from "./config/api.config";
//import AppContainer from './Routes.js';

import { AuthContext } from "./context/AuthContext";

import AboutComponent from "./screens/AboutScreen";
import CestoComponent from "./screens/CestoScreen";
import EmentasComponent from "./screens/administracao/EditarEmentas";
import HomeComponent from "./screens/HomeScreen";
import LoginComponent from "./screens/LoginScreen";
import PerfilComponent from "./screens/PerfilScreen";
import EditPerfilComponent from "./screens/EditPerfilScreen";
import PratosComponent from "./screens/administracao/PratosScreen";
import RegistoComponent from "./screens/RegistoScreen";
import ReservasComponent from "./screens/ReservasScreen";
import AdminEmentasComponent from "./screens/administracao/EditarEmentas";
import AdminHomeComponent from "./screens/administracao/HomeAdminScreen";
import AdminPratosComponent from "./screens/administracao/PratosScreen";
import EditarEmentas from "./screens/administracao/EditarEmentas";
import AdministracaoReservasComponent from "./screens/administracao/AdministracaoReservasScreen";
import { addBusinessDays } from "date-fns";

function AdministracaoReservasScreen({ navigation }) {
  return <AdministracaoReservasComponent navigation={navigation} />;
}

function AdminEmentasScreen({ navigation }) {
  return <AdminEmentasComponent navigation={navigation} />;
}

function AdminHomeScreen({ navigation }) {
  return <AdminHomeComponent navigation={navigation} />;
}

function AdminPratosScreen({ navigation }) {
  return <AdminPratosComponent navigation={navigation} />;
}

// function AboutScreen({ navigation }) {
// 	return <AboutComponent navigation={navigation} />;
// }

function CestoScreen({ navigation, route }) {
  return <CestoComponent navigation={navigation} route={route} />;
}
function EmentasScreen({ navigation }) {
  return <EmentasComponent navigation={navigation} />;
}
function HomeScreen({ navigation }) {
  return <HomeComponent navigation={navigation} />;
}
function LoginScreen({ navigation }) {
  return <LoginComponent navigation={navigation} />;
}
function PerfilScreen({ navigation }) {
  return <PerfilComponent navigation={navigation} />;
}
function PratosScreen({ navigation }) {
  return <PratosComponent navigation={navigation} />;
}
function RegistoScreen({ navigation }) {
  return <RegistoComponent navigation={navigation} />;
}
function ReservasScreen({ navigation }) {
  return <ReservasComponent navigation={navigation} />;
}
function EditPerfilScreen({ navigation }) {
  return <EditPerfilComponent navigation={navigation} />;
}

const TopTabAuth = createMaterialTopTabNavigator();
function NavAuth(logged) {
  return (
    <TopTabAuth.Navigator
      initialRouteName={logged ? "App" : "Login"}
      tabBarOptions={{
        activeTintColor: "darkred",
        inactiveTintColor: "black",
        indicatorStyle: { backgroundColor: "darkred" },
      }}
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <TopTabAuth.Screen
        name="Login"
        options={{ title: "Entrar" }}
        component={LoginScreen}
      />
      <TopTabAuth.Screen
        name="Registo"
        options={{ title: "Registar" }}
        component={RegistoScreen}
      />
    </TopTabAuth.Navigator>
  );
}

const TopPerfilTab = createMaterialTopTabNavigator();
function PerfilTab(props) {
  return (
    <TopPerfilTab.Navigator
      initialRouteName={"Perfil"}
      tabBarOptions={{
        activeTintColor: "darkred",
        inactiveTintColor: "black",
        indicatorStyle: { backgroundColor: "darkred" },
      }}
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <TopPerfilTab.Screen name="Perfil" component={PerfilScreen} />
      <TopPerfilTab.Screen
        name="EditPerfil"
        options={{ title: "Editar" }}
        component={EditPerfilScreen}
      />
    </TopPerfilTab.Navigator>
  );
}

const BeforeSignIn = createStackNavigator();
function BeforeSignInScreen(props) {
  return (
    <BeforeSignIn.Navigator
      headerMode="none"
      initialRouteName="Login"
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <BeforeSignIn.Screen
        name="Login"
        component={NavAuth}
        options={{
          animationEnabled: false,
        }}
      />
    </BeforeSignIn.Navigator>
  );
}

const AppNavigatorStack = createStackNavigator();
function AppNavigator(props) {
  return (
    <AppNavigatorStack.Navigator
      headerMode="none"
      initialRouteName="Auth"
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <AppNavigatorStack.Screen name="Auth" component={BeforeSignInScreen} />
      {/* <AppNavigatorStack.Screen
                name="AuthLoadingScreen"
                component={AuthLoadingScreen}
			/> */}
      <AppNavigatorStack.Screen
        name="administrador"
        component={AdminNavigator}
      />
      <AppNavigatorStack.Screen name="cliente" component={ClientNavigator} />
    </AppNavigatorStack.Navigator>
  );
}

const AdminBottomTabs = createMaterialBottomTabNavigator();
function AdminNavigator(props) {
  const [user, setUser] = useState(props.route);
  const [currentContext, setCurrentContext] = useState({
    user: user,
    updateUser: async () => {
      await getUserByNIF(user.NIF);
    },
  });

  const getUserByNIF = async (NIF) => {
    await fetch(apiConfig.URI + "utilizador/" + NIF)
      .then((response) => response.json())
      .then((json) => updateProvider(json))
      .catch((error) => console.error(error));
  };

  const updateProvider = (newUserData) => {
    setUser(newUserData);
    setCurrentContext({
      user: newUserData,
      updateUser: async () => {
        await getUserByNIF(user.NIF);
      },
    });
  };
  return (
    <AuthContext.Provider value={currentContext}>
      <AdminBottomTabs.Navigator
        style={{
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
        barStyle={{ backgroundColor: "darkred" }}
        screenOptions={({ route }) => ({
          headerStyle: { backgroundColor: "darkred" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        })}
      >
        <AdminBottomTabs.Screen
          name="Home"
          options={
            ({ title: "Página Inicial" },
            {
              tabBarIcon: ({ focused }) => (
                <View>
                  <FeatherIcons name="home" size={18} color="white" />
                </View>
              ),
            })
          }
          component={AdminHomeScreen}
        />

        <AdminBottomTabs.Screen
          name="Ementas"
          component={EmentasScreen}
          options={
            ({ title: "Ementas" },
            {
              tabBarIcon: ({ focused }) => (
                <View>
                  <Ionicons
                    name="restaurant-outline"
                    color="white"
                    size={18}
                  ></Ionicons>
                </View>
              ),
            })
          }
        />

        <AdminBottomTabs.Screen
          name="Pratos"
          component={PratosScreen}
          options={
            ({ title: "Pratos" },
            {
              tabBarIcon: ({ focused }) => (
                <View>
                  <Ionicons
                    name="pizza-outline"
                    color="white"
                    size={18}
                  ></Ionicons>
                </View>
              ),
            })
          }
        />
        <AdminBottomTabs.Screen
          name="Reservas"
          component={AdministracaoReservasScreen}
          options={
            ({ title: "Reservas" },
            {
              tabBarIcon: ({ focused }) => (
                <View>
                  <Ionicons
                    name="reader-outline"
                    color="white"
                    size={18}
                  ></Ionicons>
                </View>
              ),
            })
          }
        />
        <AdminBottomTabs.Screen
          name="Login"
          component={NavAuth}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              return Alert.alert(
                "Confirmação Necessária",
                "Quer mesmo sair da conta?",
                [
                  {
                    text: "Sim",
                    onPress: () => {
                      DevSettings.reload();
                    },
                  },
                  { text: "Não" },
                ]
              );
            },
          }}
          options={
            ({ title: "Sair" },
            {
              tabBarIcon: ({ focused }) => (
                <View>
                  <FeatherIcons name="log-out" size={18} color="white" />
                </View>
              ),
            })
          }
        />
      </AdminBottomTabs.Navigator>
    </AuthContext.Provider>
  );
}
const ClientBottomTabs = createMaterialBottomTabNavigator();
function ClientNavigator(props) {
  const [user, setUser] = useState(props.route);
  const [currentContext, setCurrentContext] = useState({
    user: user,
    updateUser: async () => {
      await getUserByNIF(user.NIF);
    },
  });

  const getUserByNIF = async (NIF) => {
    await fetch(apiConfig.URI + "utilizador/" + NIF)
      .then((response) => response.json())
      .then((json) => updateProvider(json))
      .catch((error) => console.error(error));
  };

  const updateProvider = (newUserData) => {
    setUser(newUserData);
    setCurrentContext({
      user: newUserData,
      updateUser: async () => {
        await getUserByNIF(user.NIF);
      },
    });
  };

  return (
    <AuthContext.Provider value={currentContext}>
      <ClientBottomTabs.Navigator
        barStyle={{ backgroundColor: "darkred" }}
        screenOptions={({ route }) => ({
          headerStyle: { backgroundColor: "darkred" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        })}
      >
        <ClientBottomTabs.Screen
          name="Home"
          options={
            ({ title: "Página Inicial" },
            {
              tabBarIcon: ({ focused }) => (
                <View>
                  <FeatherIcons name="home" size={18} color="white" />
                </View>
              ),
            })
          }
          component={HomeScreen}
        />
        <ClientBottomTabs.Screen
          name="Perfil"
          component={PerfilTab}
          options={
            ({ title: "Perfil" },
            {
              tabBarIcon: ({ focused }) => (
                <View>
                  <FeatherIcons name="user" size={18} color="white" />
                </View>
              ),
            })
          }
        />
        <ClientBottomTabs.Screen
          name="Cesto"
          component={CestoScreen}
          options={
            ({ title: "Cesto" },
            {
              tabBarIcon: ({ focused }) => (
                <View>
                  <FeatherIcons name="shopping-cart" size={18} color="white" />
                </View>
              ),
            })
          }
        />
        <ClientBottomTabs.Screen
          name="Reservas"
          component={ReservasScreen}
          options={
            ({ title: "Reservas" },
            {
              tabBarIcon: ({ focused }) => (
                <View>
                  <Ionicons name="reader-outline" size={18} color="white" />
                </View>
              ),
            })
          }
        />
        <ClientBottomTabs.Screen
          name="Login"
          component={NavAuth}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              return Alert.alert(
                "Confirmação Necessária",
                "Quer mesmo sair da conta?",
                [
                  {
                    text: "Sim",
                    onPress: () => {
                      DevSettings.reload();
                    },
                  },
                  { text: "Não" },
                ]
              );
            },
          }}
          options={
            ({ title: "Sair" },
            {
              tabBarIcon: ({ focused }) => (
                <View>
                  <FeatherIcons name="log-out" size={18} color="white" />
                </View>
              ),
            })
          }
        />
      </ClientBottomTabs.Navigator>
    </AuthContext.Provider>
  );
}

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        {AppNavigator(this.context.isLogged)}
      </NavigationContainer>
    );
  }
}

App.contextType = AuthContext;

export default App;
