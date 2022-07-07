import { set } from "date-fns";
import React, { useState } from "react";

import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import FeatherIcons from "react-native-vector-icons/Feather";

const Select = ({
  options,
  onChangeSelect,
  text,
  ementaPrato,
  pratoID,
  imagem,
}) => {
  const [txt, setTxt] = useState(text);
  const [imagem_prato, setImagem] = useState(imagem);
  const [prato_id, setPratoID] = useState(pratoID);
  const [selected, setSelected] = useState("");

  
  const [modalVisible, setModalVisible] = useState(false);

  function updatePrato() {
    var details = {
      FK_ID_ementa: ementaPrato,
      FK_ID_prato: prato_id,
    };

    var formBody = [];

    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    console.log("FORMBODY : ", formBody);

    fetch(`http://10.0.2.2:3000/api/ementa_prato/${pratoID}___${ementaPrato}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("----------------- ", responseJson);
      });
  }

  function renderPratos(item) {
    return (
      <View>
        <TouchableOpacity
          style={[
            styles.optionContainer,
            { backgroundColor: item.ID_prato == selected ? "darkred" : "#fff" },
          ]}
          onPress={() => {
            onChangeSelect(item.ID_prato);
            setTxt(item.Nome);
            setModalVisible(false);
            setSelected(item.ID_prato);
            setPratoID(item.ID_prato);
            setImagem(item.Imagem);
          }}
        >
          <Text
            style={[
              styles.optionTxt,
              { color: item.ID_prato == selected ? "white" : "black" },
            ]}
          >
            {item.Nome}
          </Text>
          {item.ID_prato == selected && (
            <FeatherIcons
              name={"check"}
              color={"white"}
              size={20}
            ></FeatherIcons>
          )}
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.icon} onPress={() => updatePrato()}>
          <FeatherIcons name="refresh-cw" size={22} color="darkred" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.container}
        >
          <Image
            style={{ borderRadius: 5 }}
            source={{ uri: imagem_prato }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              borderWidth: 3,
              borderColor: "white",
            }}
          ></Image>
          <Text> {txt} </Text>
          <FeatherIcons name="chevron-right" size={22} color="darkred" />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView>
          <View style={styles.headerModal}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <FeatherIcons name="arrow-left" size={22} color="darkred" />
            </TouchableOpacity>
            <Text>Selecione o Prato a adicionar</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelar}>Cancelar</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={options}
            keyExtractor={(item, index) => index.toString(item.id)}
            renderItem={({ item }) => renderPratos(item)}
          ></FlatList>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

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

  headerModal: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
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
    borderBottomColor: "darkred",
    borderBottomWidth: 1,
    padding: 10,
  },

  optionTxt: {
    fontSize: 16,
    color: "#555",
  },
  cancelar: {
    color: "darkred",
    fontWeight: "bold",
    fontSize: 18,
    paddingRight: 10,
  },
});
export default Select;
