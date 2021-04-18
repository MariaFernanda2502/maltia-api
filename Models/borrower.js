module.exports = (DB, type) => {
    return DB.define('prestatario',
    {
    prospectId: {
        // Es foreign key
        type: type.INTEGER,
    },
    clientApplicationId: {
        // Es foreign key
        type: type.INTEGER,
    },
    numClienteZorro: {
        type: type.INTEGER,
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
        type: type.INTEGER,
        validate: {
            isNumeric: true,
        }
    },
    nombreReferenciaDos: {
        type: type.STRING,
    },
    telefonoReferenciaDos: {
        type: type.INTEGER,
        validate: {
            isNumeric: true,
        }
    },
}, {
    // Opción para permitir soft delete
    paranoid: true
})
}