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
  FlatList,
  Modal,
} from "react-native";
import FeatherIcons from "react-native-vector-icons/Feather";

import { Form, FormItem } from "react-native-form-component";
class PratosScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pratos: [],
      isVisible: false,
      detalhesPrato: {},
      loading: true,
      ModalTwoisVisible: false,
      nome: "",
      preco: "",
      descricao: "",
      imagem: "",
    };
  }

  componentDidMount() {
    return fetch("http://10.0.2.2:3000/api/prato", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ pratos: responseJson });
      });
  }

  renderPratos = (item) => {
    return (
      <TouchableOpacity id={item.id} onPress={() => this.pressHandler(item)}>
        <View style={styles.optionContainer}>
          <Text style={styles.optionTxt}>{item.Nome}</Text>
          <Image
            style={{ borderRadius: 5 }}
            source={{ uri: item.Imagem }}
            style={{
              width: 70,
              height: 70,
              borderRadius: 20,
              borderWidth: 3,
              borderColor: "white",
            }}
          ></Image>
        </View>
      </TouchableOpacity>
    );
  };
  addPrato = () => {
    const { nome, preco, descricao, imagem } = this.state;
    var details = {
      Nome: nome,
      Descricao: descricao,
      Preco: preco,
      Imagem: imagem,
    };

    var formBody = [];

    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    console.log("FORMBODY : ", formBody);
    if (nome == "" || descricao == "" || preco == "" || imagem == "") {
      Alert.alert("PREENCHA TODOS OS CAMPOS!");
    } else {
      fetch("http://10.0.2.2:3000/api/prato", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formBody,
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log("RESPONSE JSON ---------------- ", responseJson);
          this.setState({ ModalTwoisVisible: false });
          this.componentDidMount();
        });
    }
  };
  pressHandler = (item) => {
    this.setState({ detalhesPrato: item });

    this.setState({ isVisible: true });
  };
  render() {
    const { detalhesPrato } = this.state;
    const { pratos } = this.state;
    return (
      <View>
        <TouchableOpacity
          style={styles.buttonAdicionar}
          onPress={() => this.setState({ ModalTwoisVisible: true })}
        >
          <Text style={styles.buttonAdicionarText}>Adicionar prato</Text>
          <FeatherIcons
            style={styles.iconStyle}
            name={"plus-circle"}
            color={"darkred"}
            size={30}
          ></FeatherIcons>
        </TouchableOpacity>
        <FlatList
          contentContainerStyle={{ paddingBottom: 50 }}
          data={pratos}
          keyExtractor={(item, index) => index.toString(item.id)}
          renderItem={({ item }) => this.renderPratos(item)}
        ></FlatList>
        <Modal
          style={styles.modal}
          animationType="fade"
          transparent={true}
          visible={this.state.isVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setState({ isVisible: false });
            this.setState({ detalhesPrato: {} });
          }}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{detalhesPrato.Nome}</Text>
            <Image
              style={{ borderRadius: 20 }}
              source={{ uri: detalhesPrato.Imagem }}
              style={{
                width: 150,
                height: 150,
                borderRadius: 20,
                borderWidth: 3,
                borderColor: "white",
                marginTop: 15,
              }}
            ></Image>

            <Text style={styles.modalDescricao}>{detalhesPrato.Descricao}</Text>
            <Text style={styles.modalDescricao}>{detalhesPrato.Preco} €</Text>
            <TouchableOpacity
              style={styles.buttonClose}
              onPress={() => {
                this.setState({ isVisible: false });
              }}
            >
              <Text style={styles.fecharStyle}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <Modal
          style={styles.modal}
          animationType="fade"
          transparent={true}
          visible={this.state.ModalTwoisVisible}
          onRequestClose={() => {
            this.setState({ ModalTwoisVisible: false });
          }}
        >
          <View style={styles.modalView2}>
            <Text style={styles.modalText}>Adicionar Prato: </Text>
            <Form
              onButtonPress={() => this.addPrato()}
              buttonStyle={styles.buttonSubmit}
            >
              <FormItem
                labelStyle={styles.labelStyle}
                textInputStyle={{
                  borderBottomWidth: 1,
                  borderBottomColor: "darkred",
                }}
                label="Nome"
                isRequired={true}
                value={this.state.nome}
                onChangeText={(nome) => this.setState({ nome: nome })}
              />
              <FormItem
                labelStyle={styles.labelStyle}
                textInputStyle={{
                  borderBottomWidth: 1,
                  borderBottomColor: "darkred",
                }}
                label="Descrição"
                isRequired={true}
                value={this.state.descricao}
                onChangeText={(descricao) =>
                  this.setState({ descricao: descricao })
                }
              />
              <FormItem
                labelStyle={styles.labelStyle}
                textInputStyle={{
                  borderBottomWidth: 1,
                  borderBottomColor: "darkred",
                }}
                label="Preço"
                isRequired={true}
                value={this.state.preco}
                onChangeText={(preco) => this.setState({ preco: preco })}
              />
              <FormItem
                labelStyle={styles.labelStyle}
                textInputStyle={{
                  borderBottomWidth: 1,
                  borderBottomColor: "darkred",
                }}
                label="Imagem"
                isRequired={true}
                value={this.state.imagem}
                onChangeText={(imagem) => this.setState({ imagem: imagem })}
              />
            </Form>
            <TouchableOpacity
              style={styles.buttonClose}
              onPress={() => {
                this.setState({ ModalTwoisVisible: false });
              }}
            >
              <Text style={styles.fecharStyle}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}

export default PratosScreen;

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: 200,
    borderRadius: 8,
    fontSize: 18,
    borderColor: "darkred",
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  fecharStyle: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  buttonAdicionar: {
    backgroundColor: "white",
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  iconStyle: {
    marginRight: 40,
  },
  buttonAdicionarText: {
    marginLeft: 10,
    color: "darkred",
    fontWeight: "bold",
    justifyContent: "space-between",
    fontSize: 20,
  },
  headerModal: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },

  modalDescricao: {
    color: "black",
    fontSize: 20,
    paddingTop: 10,
  },
  row: {
    flexDirection: "row",
  },
  icon: {
    borderColor: "darkred",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 10,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    padding: 10,
    backgroundColor: "darkred",
  },

  optionTxt: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  cancelar: {
    color: "darkred",
    fontWeight: "bold",
    fontSize: 18,
    paddingRight: 10,
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
    elevation: 5,
  },

  modalView2: {
    margin: 10,
    marginTop: 50,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalText: {
    fontWeight: "bold",
    color: "darkred",
    fontSize: 20,
    paddingBottom: 30,
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

  buttonSubmit: {
    backgroundColor: "darkred",
  },
  labelStyle: {
    color: "black",
    fontSize: 13,
  },
  textInputStyle: {
    borderWidth: 5,
    borderBottomWidth: 2,
    borderBottomColor: "darkred",
  },
});
