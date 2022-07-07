import { ThemeProvider } from "@react-navigation/native";
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
} from "react-native";
import FeatherIcons from "react-native-vector-icons/Feather";

import { FlatList } from "react-native-gesture-handler";
import Select from "../../components/Select/index";

class EditarEmentas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ementas: [],
      isVisible: false,
      ementaPrato: [],
      pratos: [],
      finalPratos: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    return fetch(`http://10.0.2.2:3000/api/ementa`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ ementas: responseJson });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  pressHandler = (id) => {
    this.setState({ isVisible: true, id });
    this.setState({ finalPratos: [] }); // Apaga o array dos pratosReservados por ID de Reserva para que possam ser novamente carregados aquando da abertura do Modal por item da FlatList

    return fetch(
      `http://10.0.2.2:3000/api/ementa_prato?_where=(FK_ID_ementa,eq,${id})`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ ementaPrato: responseJson });
        this.findPrato();
        console.log("EMENTAS PRATOS: ", this.state.ementaPrato);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  async findPrato() {
    return fetch(`http://10.0.2.2:3000/api/prato`, {
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
  }

  async joinPratos() {
    var { pratos, finalPratos, ementaPrato, isLoading } = this.state;
    this.forceUpdate;

    for (var i = 0; i < pratos.length; i++) {
      for (var z = 0; z < ementaPrato.length; z++) {
        if (pratos[i].ID_prato == ementaPrato[z].FK_ID_prato) {
          finalPratos.push(pratos[i]);
        }
      }
      this.setState({ isLoading: false });
    }
    // console.log("-------------------", finalPratos);
  }

  renderModalItems = ({ item }) => {
    var { isLoading } = this.state;
    const { pratos, ementaPrato, updatePrato } = this.state;

    if (isLoading) {
    } else {
      return (
        <View>
          <Select
            options={pratos}
            ementaPrato={ementaPrato[0].FK_ID_ementa}
            onChangeSelect={(id) => console.log(id)}
            text={item.Nome}
            imagem={item.Imagem}
            idatual={item.ID_prato}
            pratoID={item.ID_prato}
          />
        </View>
      );
    }
  };

  _renderItem = ({ item, index }) => {
    const { ementaPrato, finalPratos } = this.state;

    return (
      <TouchableOpacity onPress={() => this.pressHandler(item.ID_ementa)}>
        <View style={styles.itemStyle}>
          <Text style={styles.itemText}> {item.DiaSemana}</Text>
        </View>
        <Modal
          style={styles.modal}
          animationType="fade"
          transparent={true}
          visible={this.state.isVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setState({ isVisible: false });
          }}
        >
          <View>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Ementa:</Text>
              <FlatList
                keyExtractor={(item, index) => index.toString()}
                key={finalPratos.id}
                data={finalPratos}
                renderItem={(item) => this.renderModalItems(item)}
              ></FlatList>

              <TouchableOpacity
                style={[styles.buttonClose]}
                onPress={() => this.setState({ isVisible: false })}
              >
                <Text style={styles.itemFechar}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </TouchableOpacity>
    );
  };
  render() {
    const { ementas } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.modalTitle}>
          Selecione a Ementa do Dia a editar
        </Text>
        <FlatList
          data={ementas}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  itemStyle: {
    backgroundColor: "darkred",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "black",
    height: 50,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    marginTop: 10,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 1,
  },

  buttonClose: {
    width: 75,
    backgroundColor: "darkred",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    marginTop: 10,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 1,
  },

  itemFechar: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },

  itemText: {
    color: "#fff",
    fontSize: 30,
    textAlign: "center",
  },

  modalTitle: {
    fontWeight: "bold",
    fontSize: 22,
    paddingBottom: 30,
    color: "darkred",
    textAlign: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 1,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  buttonCarrinho: {
    marginLeft: 20,
    backgroundColor: "darkred",
  },
});
export default EditarEmentas;
