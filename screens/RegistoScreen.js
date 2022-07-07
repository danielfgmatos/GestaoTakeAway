import React from "react";

import { Button, TextInput, View, StyleSheet, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Formik } from "formik";
import { Input } from "react-native-elements";
import FeatherIcons from "react-native-vector-icons/Feather";
import { TouchableOpacity } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import * as yup from "yup";

export default class RegistoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateOrTimeValue: new Date(),
      role: "cliente",
      dateTimePickerVisible: false,
      //  dateOrTimeValue: new Date(),
    };
  }

  criarUtilizador = (values) => {
    const { role, dateOrTimeValue } = this.state;
    var details = {
      Nome: values.nome,
      NIF: values.nif,
      Apelido: values.apelido,
      Telemovel: values.telemovel,
      Email: values.email,
      Morada: values.morada,
      DataNascimento: dateOrTimeValue.toISOString(),
      Password: values.password,
      role: role,
    };

    console.log("CRIAR UTILIZADOR: ", details);
    var formBody = [];

    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    console.log("FORMBODY : ", formBody);

    fetch("http://10.0.2.2:3000/api/utilizador", {
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

        this.props.navigation.navigate("Login");
      });
  };

  render() {
    const loginValidationSchema = yup.object().shape({
      email: yup
        .string()
        .email("Por favor insere um email valido")
        .required("Email é obrigatório"),
      password: yup
        .string()
        .min(8, ({ min }) => `Password tem de ter no minimo ${min} caracteres`)
        .required("Password é obrigatória"),

      nome: yup.string().required("Nome é obrigatorio"),

      nome: yup.string().required("Nome é obrigatorio"),
      telemovel: yup.number().required("O numero de telemovel é obrigatorio"),

      nif: yup.number().required("O NIF é obrigatorio"),

      morada: yup.string().required("A morada é obrigatória"),
    });
    return (
      <KeyboardAwareScrollView
        enabled={true}
        behavior={Platform.OS === "android" ? "padding" : "height"}
        style={styles.formikStyle}
      >
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{
            nif: "",
            nome: "",
            apelido: "",
            password: "",
            telemovel: "",
            email: "",
            morada: "",
            dateOrTimeValue: new Date(),
          }}
          onSubmit={(values) => this.criarUtilizador(values)}
        >
          {({
            handleBlur,
            handleChange,
            errors,
            handleSubmit,
            isValid,
            values,
          }) => (
            <View style={styles.formStyle}>
              <Input
                style={styles.textInputStyle}
                placeholder={"Insira o seu primeiro nome"}
                onChangeText={handleChange("nome")}
                onBlur={handleBlur("nome")}
                value={values.nome}
              />

              {errors.nome && (
                <Text style={{ fontSize: 10, color: "red" }}>
                  {errors.nome}
                </Text>
              )}

              <Input
                style={styles.textInputStyle}
                placeholder={"Insira o seu apelido"}
                onChangeText={handleChange("apelido")}
                onBlur={handleBlur("apelido")}
                value={values.apelido}
              />

              {errors.apelido && (
                <Text style={{ fontSize: 10, color: "red" }}>
                  {errors.apelido}
                </Text>
              )}

              <Input
                style={styles.textInputStyle}
                placeholder={"Insira o NIF"}
                onChangeText={handleChange("nif")}
                onBlur={handleBlur("nif")}
                value={values.nif}
                keyboardType="number-pad"
              />

              {errors.nif && (
                <Text style={{ fontSize: 10, color: "red" }}>{errors.nif}</Text>
              )}
              <Input
                label={"Insira a sua data de nascimento:"}
                placeholder={"Data de Nascimento"}
                editable={false}
                value={this.state.dateOrTimeValue.toDateString()}
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
                  mode={"date"} // THIS DOES NOT WORK ON ANDROID. IT DISPLAYS ONLY A DATE PICKER.
                  display="calendar" // Android Onlys
                  value={new Date()}
                  onChange={(event, value) => {
                    this.setState({
                      dateOrTimeValue: value,
                      dateTimePickerVisible: false,
                    });
                  }}
                />
              )}

              <Input
                style={styles.textInputStyle}
                placeholder={"Insira o número de telemovel"}
                onChangeText={handleChange("telemovel")}
                onBlur={handleBlur("telemovel")}
                value={values.telemovel}
              />

              {errors.telemovel && (
                <Text style={{ fontSize: 10, color: "red" }}>
                  {errors.telemovel}
                </Text>
              )}

              <Input
                style={styles.textInputStyle}
                placeholder={"Insira a sua morada"}
                onChangeText={handleChange("morada")}
                onBlur={handleBlur("morada")}
                value={values.morada}
              />
              {errors.morada && (
                <Text style={{ fontSize: 10, color: "red" }}>
                  {errors.morada}
                </Text>
              )}

              <Input
                style={styles.textInputStyle}
                placeholder={"Insira o seu email"}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                keyboardType="email-address"
              />
              {errors.email && (
                <Text style={{ fontSize: 10, color: "red" }}>
                  {errors.email}
                </Text>
              )}

              <Input
                style={styles.textInputStyle}
                placeholder={"Insira a sua password"}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                secureTextEntry
              />
              {errors.password && (
                <Text style={{ fontSize: 10, color: "red" }}>
                  {errors.password}
                </Text>
              )}

              <TouchableOpacity
                style={styles.buttonClose}
                onPress={handleSubmit}
                disabled={!isValid}
              >
                <Text style={styles.optionTxt}>Registar</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
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
    textAlign: "center",
  },

  buttonClose: {
    height: 30,
    backgroundColor: "darkred",
    justifyContent: "center",
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

  formStyle: {
    padding: 15,
    flex: 1,
  },

  formikStyle: {
    flex: 1,
    backgroundColor: "white",
  },
  textInputStyle: {
    borderBottomWidth: 1,
    borderBottomColor: "darkred",
  },
});
