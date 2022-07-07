import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		alignItems: 'center',
		justifyContent: 'center',
		flexShrink: 2
	},

	logo: {
		flex: 3,
		width: '110%'
	},
	containerBtn: {
		flex: 2,
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 50
	},

	inputView: {
		width: '80%',
		backgroundColor: 'white',
		borderRadius: 10,
		alignItems: 'center',
		padding: 5
	},

	inputText: {
		height: 50,
		color: 'black'
	},

	recoverPassword: {
		color: 'black',
		fontSize: 11
	},

	loginBtn: {
		width: 200,
		backgroundColor: '#810053',
		borderRadius: 25,
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 20,
		marginBottom: 10
	},

	registerText: {
		color: 'black'
	},

	loginTextbtn: {
		color: 'white'
	},

	logotipo: {
		height: '100%',
		width: 430,
		alignItems: 'center'
	}
});
