module.exports = (DB, type) => {
    return DB.define('prospecto',
    {
    idProspecto: {
        type: type.INTERGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idUsuarioAsesor: {
        type: type.STRING,
        // Falta foreign key que hace referencia a ASESOR
    },
    idTienda: {
        type: type.STRING,
        // Falta foreign key que hace referencia a TIENDA
    },
    nombre: {
        type: type.STRING,
        noEmpty: true,
    },
    apellidoPaterno: {
        type: type.STRING,
        noEmpty: true,
    },
    appelidoMaterno:{
        type: type.STRING,
        noEmpty: true,
    },
    telefono: {
        // ¿Con qué dato nos conviene trabajarlo: int o varchar?
        type: type.INTERGER,
        noEmpty: true,
        validate: {
            isNumeric: true,
        }
    },
    contacto1: {
        type: type.DATE,
    },
    compromiso1: {
        type: type.STRING,
    },
    contacto2: {
        type: type.DATE,
    },
    compromiso2: {
        type: type.STRING,
    },
    contacto3: {
        type: type.DATE,
    },
    compromiso3: {
        type: type.STRING,
    },
}, {
    // Opción para permitir soft delete
    paranoid: true
})
}