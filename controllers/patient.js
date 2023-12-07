// Cargamos los modelos para usarlos posteriormente
const Patient = require("../models/patient");

exports.list = async function () {
  try {
    const patients = await Patient.find();
    return patients;
  } catch (error) {
    console.error("Error leyendo los pacientes:", error);
    throw error;
  }
};

exports.read = async function (patientId) {
  try {
    const patient = await Patient.findOne({ _id: patientId });
    return patient;
  } catch (error) {
    console.error("Error al buscar el paciente:", error);
    throw error;
  }
};

exports.create = async function (body) {
  try {
    let nuevo_documento;

    if (body._id) {
      nuevo_documento = new Patient({
        _id: body._id,
        name: body.name,
        surname: body.surname,
        dni: body.dni,
        city: body.city,
      });
    } else {
      nuevo_documento = new Patient({
        name: body.name,
        surname: body.surname,
        dni: body.dni,
        city: body.city,
      });
    }

    const resultado = await nuevo_documento.save();

    return resultado;
  } catch (error) {
    console.error("Error al guardar el paciente:", error);
    throw error;
  }
};

exports.update = async function (patientId, body) {
  try {
    const patient = await Patient.findOne({ _id: patientId });

    if (!patient) {
      console.log("No se ha encontrado el paciente");
      return;
    } else {
      patient.name = body.name;
      patient.surname = body.surname;
      patient.dni = body.dni;
      patient.city = body.city;

      const resultado = await patient.save();

      return resultado;
    }
  } catch (error) {
    console.error("Error al actualizar el paciente:", error);
    throw error;
  }
};

exports.delete = async function (patientId) {
  // Rellene aqui ...
};

exports.filterPatientsByCity = async function (city) {
  // Rellene aqui ...
};

exports.filterPatientsByDiagnosis = async function (diagnosis) {
  // Rellene aqui ...
};

exports.filterPatientsBySpeacialistAndDate = async function (
  specialist,
  sDate,
  fDate
) {
  // Rellene aqui ...
};

exports.addPatientHistory = async function (patientId, medicalRecord) {
  // Rellene aqui ...
};
