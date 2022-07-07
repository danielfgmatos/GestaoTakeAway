import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  titulo: {
    fontSize: 15,
    fontWeight: "bold",
    color: "darkred",
    marginTop: 20,
    marginLeft: 10,
  },
  row: {
    flexDirection: "row",
  },
  nomePrato: {
    fontWeight: "bold",
    marginLeft: 10,
  },

  precoPrato: {
    flex: 2,
    textAlign: "right",
    marginRight: 10,
  },
  total: {
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 25,
    fontSize: 20,
  },
  buttonConfirmar: {
    flex: 1,
    backgroundColor: "darkred",
    borderRadius: 20,
    elevation: 2,
  },

  buttonCancelar: {
    flex: 1,
    backgroundColor: "darkred",
    borderRadius: 20,
    elevation: 2,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  linha: { padding: 10 },
  fundo: {
    flex: 1,
    backgroundColor: "white",
  },
  totalStyle: {
    textAlign: "right",
    marginRight: 10,
    fontWeight: "bold",
    fontSize: 15,
    color: "black",
  },

  // MODAL STYLES ->

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonCarrinho: {
    marginLeft: 20,
    backgroundColor: "darkred",
  },

  buttonContinuar: {
    marginRight: 10,
    backgroundColor: "darkred",
  },

  imagemModal: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    overflow: "hidden",
    marginBottom: 20,
  },
  modalTitle: {
    color: "darkred",
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
    fontSize: 20,
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    padding: 20,
  },
});
