import React, { Component } from 'react';
import { Button } from 'react-native';
import { View, Text } from 'react-native';
export default class Perfil extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<View>
				<Text>PERFIL</Text>
				<Button
					title='Editar'
					onPress={() => {
						this.props.navigation.navigate('EditPerfil');
					}}></Button>
			</View>
		);
	}
}
