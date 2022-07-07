import React, { useState, useMemo } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import LoginScreen from './screens/LoginScreen.js';
import AuthLoadingScreen from './navigations/AuthLoadingScreen.js';
import RegistoScreen from './screens/RegistoScreen.js';

import ClienteNavigation from './navigations/RoleBasedNavigation/ClienteNavigation.js';
import AdministradorNavigation from './navigations/RoleBasedNavigation/AdministradorNavigation.js';

import UserContext from './UserContext.js';

const AuthTopTab = createMaterialTopTabNavigator();
const AuthTopTabScreen = () => (
	<AuthTopTab.Navigator
		tabBarOptions={{
			activeTintColor: '#810053',
			inactiveTintColor: 'black',
			indicatorStyle: { backgroundColor: '#810053' }
		}}
		style={{
			paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
		}}>
		<AuthTopTab.Screen
			name='Login'
			component={LoginScreen}
			options={{
				title: 'Login',
				showIcon: ({}) => (
					<Image
					// source={require('./assets/manutencoes.png')}
					// style={styles.iconsDrawer}
					/>
				)
			}}
		/>
		<AuthTopTab.Screen
			name='Registo'
			component={RegistoScreen}
			options={{ title: 'Registo' }}
		/>
	</AuthTopTab.Navigator>
);

const BeforeSignIn = createStackNavigator();
const BeforeSignInScreen = () => (
	<BeforeSignIn.Navigator
		headerMode='none'
		initialRouteName='Login'
		style={{
			paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
		}}>
		<BeforeSignIn.Screen
			name='Login'
			component={AuthTopTabScreen}
			options={{
				animationEnabled: false
			}}
		/>
	</BeforeSignIn.Navigator>
);

const AppNavigatorStack = createStackNavigator();
export default function AppNavigator() {
	const [user, setUser] = useState(null);
	const value = useMemo(() => ({ user, setUser }), [user, setUser]);
	return (
		<NavigationContainer>
			<UserContext.Provider value={value}>
				<AppNavigatorStack.Navigator
					headerMode='none'
					initialRouteName='AuthLoadingScreen'
					style={{
						paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
					}}>
					<AppNavigatorStack.Screen
						name='Auth'
						component={BeforeSignInScreen}
					/>
					{/* <AppNavigatorStack.Screen
					name='AuthLoadingScreen'
					component={AuthLoadingScreen}
				/> */}
					<AppNavigatorStack.Screen
						name='Cliente'
						component={ClienteNavigation}
					/>
					<AppNavigatorStack.Screen
						name='Administrador'
						component={AdministradorNavigation}
					/>
				</AppNavigatorStack.Navigator>
			</UserContext.Provider>
		</NavigationContainer>
	);
}
