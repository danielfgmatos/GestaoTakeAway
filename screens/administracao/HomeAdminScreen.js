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
} from "react-native";
import Accordion from "react-native-collapsible/Accordion";

class HomeAdminScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View syle={styles.container}>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.itemStyle}
            onPress={() => this.props.navigation.navigate("Ementas")}
          >
            <Text style={styles.itemText}> Editar Ementas</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Pratos")}
            style={styles.itemStyle}
          >
            <Text style={styles.itemText}> Adicionar Pratos</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Reservas")}
            style={styles.itemStyle}
          >
            <Text style={styles.itemText}> Lista de Reservas</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default HomeAdminScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  itemStyle: {
    backgroundColor: "darkred",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "black",
    height: 150,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 1,
  },

  itemText: {
    color: "#fff",
    fontSize: 30,
    textAlign: "center",
  },

  row: {
    flexDirection: "column",
  },
});
