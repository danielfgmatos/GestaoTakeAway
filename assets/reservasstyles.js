import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "darkred",
    marginTop: 20,
    marginBottom: 30,
    marginRight: 10,
  },
  row: {
    backgroundColor: "white",
    borderBottomWidth: 4,
    borderBottomColor: "darkred",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 1,

    flexDirection: "row",
  },
  row2: {
    flexDirection: "row",
    textAlign: "center",
    alignContent: "center",
  },
  touchableStyle: {
    height: 50,
    backgroundColor: "darkred",
    marginBottom: 10,
    borderRadius: 20,
  },
  itemStyle: {
    backgroundColor: "white",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomWidth: 4,
    borderBottomColor: "darkred",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 1,
    width: 250,
    flexDirection: "row",
  },
  rowModal: {
    flex: 1,
    padding: 10,
    marginTop: 10,
  },
  nomePrato: {
    fontWeight: "bold",
    marginLeft: 10,
  },
  cabecalho1: {
    fontWeight: "bold",
    color: "darkred",
    fontSize: 20,
    marginLeft: 10,
  },

  headerStyle: {
    flex: 1,
    padding: 10,
    backgroundColor: "darkred",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  rowHeader: {
    borderWidth: 5,
    borderColor: "#fff",
    flexDirection: "row",
  },

  cabecalho2: {
    flex: 2,
    fontWeight: "bold",
    color: "darkred",
    fontSize: 20,
    textAlign: "right",
    marginRight: 10,
  },
  flatliststyle: {
    paddingBottom: 350,
  },
  precoPrato: {
    flex: 2,
    textAlign: "right",
    marginRight: 10,
  },

  precoPrato2: {
    flex: 2,

    textAlign: "center",
    paddingBottom: 10,
  },

  total: {
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 25,
    fontSize: 20,
  },

  preco: {
    flex: 2,
    color: "black",
    textAlign: "right",
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
  accordionMenuTitle: {
    fontWeight: "bold",
    color: "darkred",
    fontSize: 16,
  },

  modal: {
    flex: 1,
    backgroundColor: "white",
    opacity: 1,
    borderRadius: 10,
  },
  descricao: {
    color: "black",

    textAlign: "left",
  },
  imageMenu: {
    flex: 1,
    padding: 10,
  },

  imageStyle: {
    borderRadius: 300,
    overflow: "hidden",
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
