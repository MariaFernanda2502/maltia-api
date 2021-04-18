module.exports = (DB, type) => {
    return DB.define('prospect',
    {
    prospectId: {
        type: type.INTEGER, 
        primaryKey: true,
        autoIncrement: true,
    },
    userAdviserId: {
        // Es foreign key
        type: type.STRING,
    },  
    storeId: {
        // Es foreign key
        type: type.STRING,
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
        type: type.INTEGER,
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