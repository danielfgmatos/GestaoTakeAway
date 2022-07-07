import React, { Component, useState } from "react";
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
  Pressable,
  FlatList,
} from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import { styles } from "../../assets/reservasstyles";
import FeatherIcons from "react-native-vector-icons/Feather";

class AdministracaoReservasScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservaslist: [],
      isVisible: false,
      reservaPrato: [],
      pratoReservado: [], // Armazena os dados dos pratos de ID igual entre os reservados e todos os pratos
      pratos: [], // Armazena os dados retornados ao Fetch à tabela pratos
      userDetails: [],
      isLoading: true, // variavel que guarda o estado do Loading dos items da FlatList do Modal
    };
  }

  componentDidMount() {
    fetch(`http://10.0.2.2:3000/api/reserva`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ reservaslist: responseJson });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  async joinPratos() {
    var { pratos, reservaPrato, pratoReservado, loaded } = this.state;
    this.forceUpdate();

    for (var i = 0; i < pratos.length; i++) {
      for (var z = 0; z < reservaPrato.length; z++) {
        if (pratos[i].ID_prato == reservaPrato[z].FK_ID_prato) {
          pratoReservado.push(pratos[i]);
        }
      }

      this.setState({ isLoading: false });
      //  console.log("----------------------------------", pratoReservado);
    }
  }
  findPrato = () => {
    fetch(`http://10.0.2.2:3000/api/prato`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ pratos: responseJson });

        this.joinPratos();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  pressHandler = (id, nif) => {
    const { userDetails } = this.state;
    this.setState({ pratoReservado: [] }); // Apaga o array dos pratosReservados por ID de Reserva para que possam ser novamente carregados aquando da abertura do Modal por item da FlatList

    this.setState({ isVisible: true, id, nif });
    fetch(`http://10.0.2.2:3000/api/utilizador?_where=(NIF,eq,${nif})`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ userDetails: responseJson });
        console.log(userDetails);

        //  console.log("ID DO PRATO RESERVADO: ", this.state.reservaPrato);
      })
      .catch((error) => {
        console.error(error);
      });

    // Fetch à tabela reserva_prato com o ID do item da flatlist premido

    fetch(
      `http://10.0.2.2:3000/api/reserva_prato?_where=(FK_ID_reserva,eq,${id})`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ reservaPrato: responseJson });
        this.findPrato();
        //  console.log("ID DO PRATO RESERVADO: ", this.state.reservaPrato);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  renderModalItems = ({ item }) => {
    const { userDetails } = this.state;

    var { isLoading } = this.state;
    if (isLoading) {
    } else {
      return (
        <View style={styles.itemStyle}>
          <View style={styles.imageMenu}>
            <Image
              source={{ uri: item.Imagem }}
              style={{
                width: 80,
                height: 80,
                borderRadius: 20,
                borderWidth: 3,
                borderColor: "white",
              }}
            />
          </View>
          <View style={styles.rowModal}>
            <Text style={styles.accordionMenuTitle}>{item.Nome}</Text>
            <Text>{item.Preco} €</Text>
          </View>
        </View>
      );
    }
  };
  render() {
    const { reservaslist } = this.state;
    const { pratoReservado } = this.state;
    return (
      <View>
        <FeatherIcons
          onPress={() => this.componentDidMount()}
          name="refresh-cw"
          size={22}
          color="darkred"
        />
        <Text style={styles.titulo}> Histórico de Encomendas</Text>
        <View style={styles.row}>
          <Text style={styles.cabecalho1}>Data de Pedido</Text>

          <Text style={styles.cabecalho2}> Valor pago</Text>
        </View>
        <View style={styles.linha}>
          <View
            style={{
              borderBottomColor: "darkred",
              borderBottomWidth: 2,
            }}
          />
        </View>
        <View style={styles.flatliststyle}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            key={reservaslist.id}
            data={reservaslist}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.touchableStyle}
                onPress={() => this.pressHandler(item.ID_reserva, item.FK_NIF)}
              >
                <View style={styles.row}>
                  <Text style={styles.nomePrato}>
                    {new Date(item.DataLevantamento).toDateString()}
                  </Text>

                  <Text style={styles.precoPrato}> {item.valor} €</Text>
                  <FeatherIcons
                    name="chevron-right"
                    size={18}
                    color="darkred"
                  />
                </View>
                <View style={styles.row2}>
                  <Text style={styles.precoPrato2}> {item.FK_NIF} </Text>
                </View>
              </TouchableOpacity>
            )}
          ></FlatList>
        </View>

        <Modal
          style={styles.modal}
          animationType="fade"
          transparent={true}
          visible={this.state.isVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setState({ isVisible: false });
            this.setState({ loaded: false });
          }}
        >
          <View>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Detalhes da Reserva</Text>
              <FlatList
                keyExtractor={(item, index) => index.toString()}
                key={pratoReservado.id}
                data={pratoReservado}
                renderItem={(item) => this.renderModalItems(item)}
              ></FlatList>

              <TouchableOpacity
                style={[styles.button, styles.buttonCarrinho]}
                onPress={() => this.setState({ isVisible: false })}
              >
                <Text style={styles.textStyle}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
export default AdministracaoReservasScreen;
