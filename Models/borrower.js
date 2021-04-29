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
    numClienteZorro: {
        type: type.BIGINT,
    },
    fechaNacimiento: {
        type: type.DATEONLY,
    },
    firmaBuro: {
        type: type.BOOLEAN,
    },
    ine: {
        type: type.BOOLEAN,  
    },
    direccion: {
        type: type.STRING,
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