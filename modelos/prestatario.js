module.exports = (DB, type) => {
    return DB.define('prestatario',
    {
    idProspecto: {
        type: type.INTERGER,
        // Falta la foreign key referencia a PROSPECTO
    },
    idSolicitud: {
        type: type.INTERGER,
        // Falta foreign key referencia a SOLICITUD
    },
    numClienteZorro: {
        type: type.INTERGER,
        noEmpty: true,
    },
    fechaNacimiento: {
        type: type.DATE,
        noEmpty: true,
    },
    firmaBuro: {
        type: type.BOOLEAN,
        noEmpty: true,
    },
    ine: {
        type: type.BOOLEAN,
        noEmpty: true,  
    },
    direccion: {
        type: type.STRING,
        noEmpty: true,
    },
    nombreRefererenciaUno: {
        type: type.STRING,  
    },
    telefonoReferenciaUno: {
        type: type.INTERGER,
        validate: {
            isNumeric: true,
        }
    },
    nombreReferenciaDos: {
        type: type.STRING,
    },
    telefonoReferenciaDos: {
        type: type.INTERGER,
        validate: {
            isNumeric: true,
        }
    },
}, {
    // Opción para permitir soft delete
    paranoid: true
})
}