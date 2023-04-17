<img  align="left" width="150" style="float: left;" src="https://www.upm.es/sfs/Rectorado/Gabinete%20del%20Rector/Logos/UPM/CEI/LOGOTIPO%20leyenda%20color%20JPG%20p.png">
<img  align="right" width="60" style="float: right;" src="http://www.dit.upm.es/figures/logos/ditupm-big.gif">


<br/><br/>


# Practica BBDD - Object Document Mapper (ODM)

## 1. Objetivo

- Desarrollar las 4 operaciones CRUD (Create, Read, Update and Delete) a través de un ODM
- Practicar con un ODM para realizar queries mas avanzadas
- Identificar las ventajas de usar ODMs

## 2. Dependencias

Para realizar la práctica el alumno deberá tener instalado en su ordenador:
- Herramienta GIT para gestión de repositorios [Github](https://git-scm.com/downloads)
- Entorno de ejecución de javascript [NodeJS](https://nodejs.org/es/download/)
- Base de datos NoSQL [MongoDB](https://www.mongodb.com/download-center/community)

## 3. Descripción de la práctica

La práctica simula una aplicación de gestión de pacientes basada en el patron MVC (Modelo-Vista-Controlador) y en el ODM de MongoDB para NodeJS: Mongoose.

La **vista** es una interfaz web basada en HTML y CSS que permite realizar diversas acciones sobre los pacientes como crear, editar, buscar, filtrar, listar o eliminar. La vista esta incluida ya en el codigo descargado.

El **modelo** es la representación de la información de los pacientes. El modelo que se usará en esta práctica es el siguiente:

```
PatientSchema = Schema({
    name: String,
    surname: String,
    dni: String, 
    city: String,
    profession: Array,
    medicalHistory: [{
    	specialist: String,
    	diagnosis: String,
    	date: Date,
    }]
});
```

El **controlador** ejecuta acciones sobre el modelo Paciente. El alumno deberá desarrollar el controlador del paciente para que las acciones que se realicen a través de la página web funcionen correctamente. Para ello, desarrollara las operaciones correspondientes con Mongoose implementando las operaciones CRUD sobre el objeto paciente, así como otra serie de queries.

En el siguiente video puede observar cual sería el funcionamiento normal de la aplicación [link](https://www.youtube.com/watch?v=OAwlZS5Z9FM)

## 4. Descargar e instalar el código del proyecto

Abra un terminal en su ordenador y siga los siguientes pasos.

El proyecto debe clonarse en el ordenador desde el que se está trabajando con:

```
$ git clone https://github.com/BBDD-ETSIT/nosql_practica4_bbdd
```

y entrar en el directorio de trabajo

```
$ cd nosql_practica4_bbdd
```

Una vez dentro de la carpeta, se instalan las dependencias con:

```
$ npm install
```

Ejecutamos los seeders para añadir pacientes por defecto a la base de datos de mongo con:

```
$ npm run seed
```

Por último podemos arrancar la práctica con:

```
$ npm start
```

Abra un navegador y vaya a la url "http://localhost:8001" para ver la aplicación de gestión de pacientes.

**NOTA: Cada vez que se quiera realizar una prueba del código desarrollado, debemos parar y arrancar de nuevo la practica. Para ello, desde el terminal pulse ctrl+c para parar y arranque de nuevo con npm start**

## 5. Tareas a realizar

El alumno deberá editar el fichero patient.js ubicado en la carpeta controllers. Se le provee un esqueleto con todos los funciones que deberá rellenar. En cada uno de estas funciones se deberá hacer uso del ODM Mongoose para realizar operaciones con la base de datos y devolver un resultado de la operación.

**NOTA: recuerde que las peticiones a las bases de datos son asíncronas por ello los métodos que ejecutan deben ser asincronos (como puede observar en la cabecera de los mismos) y por tanto las operaciones con Mongoose deben ir precedidas del termino await. Por ejemplo, "var restaurantes = await Restaurante.find()" guardaría en la variable "restaurantes" el resultado de ejecutar la operación "find()"" del modelo Restaurante definido con Mongoose**

Las funciones hacen lo siguiente:

### list()

**Descipcion:**
- Busca en la base de datos todos los pacientes existentes en la coleccion "Paciente"

**Parametros:**

- Ninguno


**Returns:**

- Un array de objetos de pacientes

### read(patientId)

**Descipcion:**
- Busca en la colección "Paciente" el paciente cuyo id corresponde con el de patientId

**Parametros:**

- patientId - Id del paciente a buscar

**Returns:**

- Un objeto con todos los atributos del paciente

### create(body)

**Descipcion:**
- Crea un nuevo paciente en la colleción "Paciente" de Mongo

**Parametros:**

- body - Objeto que contiene los datos rellenados a través de la web

**Returns:**

- El nuevo objeto paciente creado

### update(patientId, body)

**Descipcion:**
- Actualiza los datos del paciente en la base datos

**Parametros:**

- patientId - Id del paciente a actualizar
- body - Objeto que contiene los datos rellenados a través de la web

**Returns:**

- El objeto paciente con los datos actualizados

### delete(patientId)

**Descipcion:**
- Elimina un paciente de la base dadtos

**Parametros:**

- patientId - Id del paciente a eliminar

**Returns:**

- El resultado de la operacion de borrado

### addPatientHistory(patientId, medicalRecord) 

**Descipcion:**
- Añade un nueva consulta al historial medico del paciente representado por patientId

**Parametros:**

- patientId - Id del paciente al que se le añade una nueva consulta al historial
- medicalRecord - Objeto con los datos de la consulta

**Returns:**

- El objeto paciente con los datos actualizados incluido la nueva consulta

### filterPatientsByCity(city)

**Descipcion:**
- Obtiene todos los pacientes de la base de datos de Mongo en base a su ciudad de origen

**Parametros:**

- city - String del nombre de la ciudad

**Returns:**

- Un array de objetos de pacientes

### filterPatientsByDiagnosis(diagnosis)

**Descipcion:**
- Obtiene todos los pacientes de la base de datos de Mongo en base a sus diagnosticos

**Parametros:**

- diagnosis - String que representa el diagnostico de un paciente

**Returns:**

- Un array de objetos de pacientes


Abrá un navegador y navegar a "http://localhost:8001". Inserte, por medio de la aplicación web de gestión de pacientes, un nuevo paciente cuyo DNI sea el token del moodle del alumno. Realice una captura de la interfaz con la lista de pacientes en la que salga el nuevo paciente creado. **Esta es una de las caputuras exigidas y que debe guardar dentro del directorio "miscapturas".**

Verificar haciendeo uso de la mongoshell que el paciente se  ha creado en la colección correspondiente . En este punto, ejecute el dentro de la mongo shell el comando necesario para buscar al paciente creado anterioemente. Haga una captura en la que se observe la salida de dicho comando y guardela en miscapturas.

### 5.1 Búsqueda con filtros avanzados (Opcional)
- Se sugiere implementar esta función para que el estudiante practique el manejo de filtros, para realizar consultas dentro de un rango de fechas. Sin embargo, esta función no será evaluada dentro de la práctica ni considerada dentro de los tests del autocorector.

### filterPatientsBySpeacialistAndDate(specialist, sDate,fDate)

**Descipcion:**
- Obtiene todos los pacientes de la base de datos de Mongo en base al especialista y que la consulta se hiciese dentro de un rango de fechas 

**Parametros:**

- specialist - String con el especialista medico
- sdate - Fecha de inicio de la busqueda de consultas (Ej: 2016-03-24)
- fdate - Fecha de final de la busqueda de consultas (Ej: 2019-08-14)

**Returns:**

- Un array de objetos de pacientes


## 6. Prueba de la práctica 

Para ayudar al desarrollo, se provee una herramienta de autocorrección que prueba las distintas funcionalidades que se piden en el enunciado.

La herramienta de autocorrección preguntará por el correo del alumno y el token de Moodle. En el enlace [https://www.npmjs.com/package/autocorector](https://www.npmjs.com/package/autocorector) se proveen instrucciones para encontrar dicho token.

```
$ npx autocorector
```

Se puede pasar la herramienta autocorector tantas veces como se desee sin ninguna repercusión en la calificación.

## 9. Instrucciones para la Entrega y Evaluación.

Una vez satisfecho con su calificación, el alumno puede subir su entrega a Moodle con el siguiente comando:
```
$ npx autocorector --upload
```

El alumno podrá subir al Moodle la entrega tantas veces como desee pero se quedará registrada solo la última subida.

**RÚBRICA**: Cada método que se pide resolver de la practica se puntuara de la siguiente manera:
-  **1 punto por cada uno de las siguientes funciones realizadas:**  list, read, create, update y delete 
-  **1,5 puntos por cada uno de las siguientes funciones realizadas:**  filterPatientsByCity y filterPatientsByDiagnosis
-  **2 puntos por realizar la siguiente función:** addPatientHistory 

Si pasa todos los tests se dará la máxima puntuación. 

