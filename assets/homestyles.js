import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'darkred',
		alignItems: 'center',
		justifyContent: 'center'
	},
	ementaTitle: {
		fontWeight: 'bold',
		textAlign: 'center',

		color: 'white',
		fontSize: 30,
		padding: 15
	},

	ementaTitleView: {
		backgroundColor: 'darkred',
		borderRadius: 20,

		marginRight: 5,
		marginLeft: 5,
		marginBottom: 30,
		marginTop: 30
	},
	fundo: {
		backgroundColor: 'white',
		flex: 1,
		paddingTop: 50
	},

	header: {
		backgroundColor: '#F5FCFF',
		padding: 10
	},
	accordionMenuTitle: {
		fontWeight: 'bold',
		color: 'white',
		fontSize: 20
	},
	row: {
		flexDirection: 'row'
	},
	imageStyle: {
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
		borderTopRightRadius: 30,
		borderTopLeftRadius: 30,
		overflow: 'hidden'
	},
	imageMenu: {
		borderTopLeftRadius: 20,
		borderBottomLeftRadius: 20,
		flex: 1,
		padding: 10,
		backgroundColor: 'darkred'
	},
	rowHeader: {
		borderWidth: 5,
		borderColor: '#fff',
		flexDirection: 'row'
	},

	headerStyle: {
		flex: 1,
		padding: 10,
		backgroundColor: 'darkred',
		borderTopRightRadius: 20,
		borderBottomRightRadius: 20
	},

	preco: {
		color: 'white',
		marginTop: 30,
		textAlign: 'right'
	},
	botaoReservar: {
		textAlign: 'right',
		padding: 10,
		backgroundColor: '#fff'
	},
	descricao: {
		color: 'white',

		textAlign: 'left'
	},
	// Nome dos Pratos - Estilos
	headerText: {
		textAlign: 'center',
		fontSize: 16,
		fontWeight: '500'
	},

	content: {
		flex: 1,
		padding: 10,
		backgroundColor: '#fff'
	},

	addCart: {
		flex: 1,
		fontSize: 12,
		padding: 5,
		backgroundColor: 'white'
	},

	// MODAL STYLES ->

	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22
	},
	modalView: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2
	},
	buttonOpen: {
		backgroundColor: '#F194FF'
	},
	buttonCarrinho: {
		marginLeft: 20,
		backgroundColor: 'darkred'
	},

	buttonContinuar: {
		marginRight: 10,
		backgroundColor: 'darkred'
	},

	imagemModal: {
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
		borderTopRightRadius: 30,
		borderTopLeftRadius: 30,
		overflow: 'hidden',
		marginBottom: 20
	},
	modalTitle: {
		color: 'darkred',
		fontWeight: 'bold',
		textAlign: 'center',
		padding: 10,
		fontSize: 20
	},

	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center'
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
		padding: 20
	}
});
