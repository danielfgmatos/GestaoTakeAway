import React, { Component } from 'react';
import {
	View,
	TextInput,
	Text,
	Button,
	TouchableHighlight,
	StyleSheet,
	TouchableOpacity
} from 'react-native';
import { Input } from 'react-native-elements/dist/input/Input';
import Ionicons from 'react-native-vector-icons/Ionicons';
//import styles from '../styles/main';
import apiConfig from '../config/api.config';
import { styles } from '../assets/loginstyles';
import { Alert } from 'react-native';

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			loggedUser: [],
			loading: false,
			users: []
		};
	}

	setStateFor = (key, val) => {
		this.setState({
			[key]: val
		});
	};

	verifyUser = async () => {
		// if (
		// 	this.state.loggedUser.Email !== undefined &&
		// 	this.state.loggedUser.password !== undefined
		// ) {
		// 	console.log('ESTOU NO INICIO DO VERIFY USER');
		// 	this.props.navigation.navigate('Home', {
		// 		user: this.state.loggedUser
		// 	});
		// }
		if (this.state.email !== undefined && this.state.password !== undefined) {
			await this.getUser(this.state.email, this.state.password);

			if (this.state.loggedUser.Email) {
				this.props.navigation.navigate(`${this.state.loggedUser.role}`, {
					user: this.state.loggedUser
				});
			} else {
				Alert.alert('Email ou Password Inválidos.');
			}
		} else {
			Alert.alert('Email ou Password Inválidos.');
		}
	};

	getUser = async () => {
		const requestOptions = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		};

		await fetch(apiConfig.URI + 'utilizador/', requestOptions)
			.then((response) => response.json())
			.then((json) => {
				this.setState({ users: json });
				this.compareInfo();
			})
			.catch((error) => console.error(error));
	};

	compareInfo = async () => {
		for (let i = 0; i < this.state.users.length; i++) {
			if (
				this.state.email == this.state.users[i].Email &&
				this.state.password == this.state.users[i].password
			) {
				this.setStateFor('loggedUser', this.state.users[i]);
				console.log(this.state.loggedUser);
			}
		}
	};

	render() {
		const { loading } = this.state;
		return (
			<View style={styles.container}>
				<View style={styles.inputView}>
					<Input
						style={styles.inputText}
						placeholder=' Email...'
						leftIcon={<Ionicons name='ios-person' size={24} color='darkred' />}
						onChangeText={(text) => this.setState({ email: text })}
					/>
					<Input
						style={styles.inputText}
						placeholder=' Password...'
						leftIcon={<Ionicons name='key' size={18} color='darkred' />}
						onChangeText={(text) => this.setState({ password: text })}
						secureTextEntry
					/>
					<TouchableOpacity
						activeOpacity={0.8}
						style={{
							...styles.loginBtn,
							backgroundColor: loading ? '#ddd' : 'darkred'
						}}
						onPress={() => this.verifyUser()}
						disabled={loading}>
						<Text style={styles.loginTextbtn}>
							{loading ? 'Loading...' : 'Login'}
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

export default Login;
