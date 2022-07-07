import React, { Component, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Modal,
  FlatList,
} from "react-native";
import { Input } from "react-native-elements";
import FeatherIcons from "react-native-vector-icons/Feather";
import { styles } from "../assets/cestostyles";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AuthContext } from "../context/AuthContext";

export default class CestoScreen extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      isVisible: false,
      dateTimePickerVisible: false,
      dateOrTimeValue: new Date(),
      reserva: [],
      largest: 0,
      quantidade: 0,
    };
  }

  totalFunc() {
    const { pratoreserva } = this.props.route.params;
    this.state.total = 0;
    for (var i = 0; i < pratoreserva.length; i++) {
      this.state.total += pratoreserva[i].Preco;
    }

    return <Text style={styles.totalStyle}>{this.state.total} €</Text>;
  }

  confEncomenda = () => {
    const { pratoreserva } = this.props.route.params;
    if (this.state.total === 0) {
      Alert.alert("O carrinho está vazio");
    } else {
      this.setState({ isVisible: true });
    }
  };

  findLastId = () => {
    this.forceUpdate();
    for (var i = 0; i < this.state.reserva.length; i++) {
      if (this.state.reserva[i].ID_reserva > this.state.largest) {
        this.setState({ largest: this.state.reserva[i].ID_reserva });
      }
    }
    console.log(this.state.largest);
  };

  async postReservaPrato() {
    const { pratoreserva } = this.props.route.params;
    for (var i = 0; i < pratoreserva.length; i++) {
      var details = {
        FK_ID_reserva: this.state.largest,
        FK_ID_prato: pratoreserva[i].ID_prato,
        quantidade: 1,
      };

      var formBody = [];

      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }

      formBody = formBody.join("&");

      console.log("FORMBODY : ", formBody);

      fetch("http://10.0.2.2:3000/api/reserva_prato", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formBody,
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
        });
    }
  }

  // FUNÇÃO CHAMADA AQUANDO DA CONFIRMAÇAO DA RESERVA  - É EFETUADO UM POST À TABELA RESERVA, SE FUNCIONAR, FAZ FETCH À TABELA RESERVA PARA SABER O ULTIMO ID,
  // DEPOIS  É FEITO UM POST À TABELA RESERVA_PRATO, COM O ULTIMO ID DA RESERVA E COM OS ID'S DOS PRATOS QUE ESTAO NO CARRINHO
  async reservarFunc() {
    const { user } = this.context;
    var today = new Date().toISOString();

    var { pratoreserva } = this.props.route.params;

    var details = {
      DataLevantamento: this.state.dateOrTimeValue.toISOString(),
      DataReserva: today,
      FK_NIF: user.params.user.NIF,
      valor: this.state.total,
    };

    var formBody = [];

    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    console.log("FORMBODY : ", formBody);

    fetch("http://10.0.2.2:3000/api/reserva", {
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
        //  Alert.alert("Encomenda efetuada, obrigado pela preferência!.");

        // ----------------------------------------------------------------FETCH À TABELA RESERVA ------------------------
        fetch("http://10.0.2.2:3000/api/reserva?_fields=ID_reserva", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((responseJson) => {
            //RETORNA TODOS OS ID'S NA TABELA RESERVA
            this.setState({ reserva: responseJson });
            this.findLastId();
            this.postReservaPrato();

            pratoreserva.splice(0, pratoreserva.length);
            this.setState({ isVisible: false });
            Alert.alert("Pedido confirmado. Obrigado pela sua preferência!");
            this.props.navigation.navigate("Home");
          });
      });
  }

  /* ----------------------------------------------------------------------------------------------------------- */

  render() {
    const { pratoreserva } = this.props.route.params;

    return (
      <SafeAreaView style={styles.fundo}>
        <Text style={styles.titulo}>Confirme o seu pedido:</Text>

        <View style={styles.linha}>
          <View
            style={{
              borderBottomColor: "darkred",
              borderBottomWidth: 2,
            }}
          />
        </View>

        <FlatList
          keyExtractor={(item, index) => index.toString()}
          key={pratoreserva.id}
          data={pratoreserva}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.nomePrato}>{item.Nome}</Text>

              <Text style={styles.precoPrato}>{item.Preco} €</Text>
            </View>
          )}
        ></FlatList>

        <View style={styles.Row}>
          <Text style={styles.total}>Total:</Text>
          {this.totalFunc()}
        </View>

        <View style={styles.linha}>
          <View
            style={{
              borderBottomColor: "darkred",
              borderBottomWidth: 2,
            }}
          />
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.isVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setState({ isVisible: false });
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text> Insira a data pretendida para levantamento: </Text>
              <View>
                <View>
                  <Input
                    label="                          "
                    placeholder={"01/01/2019 - 09:00 AM"}
                    editable={false}
                    value={this.state.dateOrTimeValue.toLocaleTimeString()}
                    rightIcon={
                      <FeatherIcons
                        onPress={() =>
                          this.setState({ dateTimePickerVisible: true })
                        }
                        name="calendar"
                        size={18}
                        color="darkred"
                      />
                    }
                  />

                  {this.state.dateTimePickerVisible && (
                    <DateTimePicker
                      mode={"time"} // THIS DOES NOT WORK ON ANDROID. IT DISPLAYS ONLY A DATE PICKER.
                      display="spinner" // Android Only
                      is24Hour={true} // Android Only
                      value={new Date()}
                      onChange={(event, value) => {
                        this.setState({
                          dateOrTimeValue: value,
                          dateTimePickerVisible: false,
                        });
                      }}
                    />
                  )}
                </View>
              </View>
              <View style={styles.row}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonCarrinho]}
                  onPress={() => this.setState({ isVisible: false })}
                >
                  <Text style={styles.textStyle}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.buttonCarrinho]}
                  onPress={() => this.reservarFunc()}
                >
                  <Text style={styles.textStyle}>Encomendar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.buttonConfirmar}
            onPress={() => {
              this.confEncomenda();

              // this.props.navigation.navigate("HomeScreen");
            }}
          >
            <Text style={styles.buttonText}>Confirmar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonCancelar}
            onPress={() => {
              this.state.total = 0;
              pratoreserva.splice(0, pratoreserva.length);
              this.forceUpdate();
            }}
          >
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
