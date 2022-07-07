import React, { Component, useState } from 'react';
import {
	StyleSheet,
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
	ImageBackground,
	StatusBar,
	ToolbarAndroidComponent,
	Image,
	Alert,
	Modal,
	Pressable
} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { styles } from '../assets/homestyles';
import FeatherIcons from 'react-native-vector-icons/Feather';

const date = new Date();
var day = date.getDay();

class HomeScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pratos: [],
			ementas: [],
			todaypratos: [],
			activeSections: [],
			loading: true,
			isVisible: false,
			pratoselecionado: [],
			pratomodal: []
		};
	}

	componentDidMount() {
		return fetch('http://10.0.2.2:3000/api/prato', {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		})
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({ pratos: responseJson });

				fetch(
					`http://10.0.2.2:3000/api/ementa_prato?_where=(fk_id_ementa,eq,${day})`,
					{
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json'
						}
					}
				)
					.then((response) => response.json())
					.then((responseJson) => {
						this.setState({ ementas: responseJson });
						//console.log(this.state.ementas);
						for (var i = 0; i < this.state.pratos.length; i++) {
							for (var z = 0; z < this.state.ementas.length; z++) {
								if (
									this.state.pratos[i].ID_prato ==
									this.state.ementas[z].FK_ID_prato
								) {
									this.state.todaypratos.push(this.state.pratos[i]);
									this.setState({ loading: false });
								}
							}
						}
						//console.log("ACSAGASGSAGAS", this.state.todaypratos);
						//console.log(" asgasgsagas ", this.state.todaypratos);
					})
					.catch((error) => {
						console.error(error);
					});

				//console.log(this.state.pratos);
			})
			.catch((error) => {
				console.error(error);
			});
	}

	_renderHeader = (item) => {
		return (
			<View style={styles.rowHeader}>
				<View style={styles.imageMenu}>
					<Image
						style={{ borderRadius: 20 }}
						source={{ uri: item.Imagem }}
						style={{
							width: 110,
							height: 110,
							borderRadius: 20,
							borderWidth: 3,
							borderColor: 'white'
						}}
					/>
				</View>

				<View style={styles.headerStyle}>
					<Text style={styles.accordionMenuTitle}>{item.Nome}</Text>
					<Text style={styles.descricao}>{item.Descricao}</Text>
					<Text style={styles.preco}>{item.Preco} €</Text>
				</View>
			</View>
		);
	};

	pressHandler = (id) => {
		const { activeSections } = this.state;
		this.setState({ isVisible: true, id });

		this.state.pratomodal = this.state.todaypratos[activeSections];

		this.state.pratoselecionado.push(this.state.todaypratos[activeSections]);
	};

	_renderContent = (item) => {
		return (
			<View>
				<View>
					<View style={styles.row}></View>
					<View style={styles.row}>
						<View style={styles.addCart}>
							<Text style={styles.addCart}>Adicionar ao Carrinho:</Text>
						</View>

						<View style={styles.botaoReservar}>
							<TouchableOpacity
								id={item.id}
								onPress={() => {
									this.pressHandler();
								}}>
								<FeatherIcons name='plus-circle' size={18} color='darkred' />
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</View>
		);
	};

	_updateSections = (activeSections) => {
		this.setState({ activeSections });
	};

	buttonContinuar = () => {
		this.setState({ isVisible: false });
		this.props.navigation.navigate('Cesto', {
			pratoreserva: this.state.pratoselecionado
		});
	};
	render() {
		const { pratoselecionado, pratomodal } = this.state;
		if (this.state.loading) {
		}

		return (
			<View style={styles.fundo}>
				<View style={styles.ementaTitleView}>
					<Text style={styles.ementaTitle}>PRATOS DO DIA</Text>
				</View>
				<View styles={styles.acordionstyle}>
					<Accordion
						sections={this.state.todaypratos}
						activeSections={this.state.activeSections}
						renderSectionTitle={this._renderSectionTitle}
						renderHeader={this._renderHeader}
						renderContent={this._renderContent}
						onChange={this._updateSections}
					/>

					<Modal
						animationType='fade'
						transparent={true}
						visible={this.state.isVisible}
						onRequestClose={() => {
							Alert.alert('Modal has been closed.');
							this.setState({ isVisible: false });
						}}>
						<View style={styles.centeredView}>
							<View style={styles.modalView}>
								<Text style={styles.modalTitle}>{pratomodal.Nome}</Text>
								<Text style={styles.modalText}>
									Adicionaste {pratomodal.Nome} à Encomenda !
								</Text>
								<View style={styles.imagemModal}>
									<Image
										style={styles.imagemModal}
										source={{ uri: pratomodal.Imagem }}
										style={{ width: 200, height: 200 }}
									/>
								</View>
								<View style={styles.row}>
									<TouchableOpacity
										style={[styles.button, styles.buttonContinuar]}
										onPress={() => this.buttonContinuar()}>
										<Text style={styles.textStyle}>Finalizar encomenda</Text>
									</TouchableOpacity>

									<TouchableOpacity
										style={[styles.button, styles.buttonCarrinho]}
										onPress={() => this.setState({ isVisible: false })}>
										<Text style={styles.textStyle}>Continuar a comprar</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>
					</Modal>
				</View>
			</View>
		);
	}
}
export default HomeScreen;
