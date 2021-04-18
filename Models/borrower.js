module.exports = (DB, type) => {
    return DB.define('borrower',
    {
    prospectId: {
        primaryKey: true,
        foreignKey: true,
        type: type.INTEGER,
        references: {
            model: 'prospects',
            key: 'prospectId',
        }
    },
    clientApplicationId: {
        foreignKey: true,
        type: type.INTEGER,
        references: {
            model: 'clientapplications',
            key: 'clientApplicationId',
        }
    },
    numClienteZorro: {
        type: type.BIGINT,
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
        type: type.BIGINT,
        validate: {
            isNumeric: true,
        }
    },
    nombreReferenciaDos: {
        type: type.STRING,
    },
    telefonoReferenciaDos: {
        type: type.BIGINT,
        validate: {
            isNumeric: true,
        }
    },
}, {
    // Opción para permitir soft delete
    paranoid: true
})
}