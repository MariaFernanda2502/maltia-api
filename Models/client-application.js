module.exports = (DB, type) => {
    return DB.define('clientapplication',
    {
    clientApplicationId: {
        primaryKey: true,
        type: type.INTEGER,
        autoIncrement: true,
    },
    userAdviserId: {
        foreignKey: true,
        type: type.STRING,
        references: {
            model: 'advisers',
            key: 'userId'
        }
    },
    userAnalystId: {
        foreignKey: true,
        type: type.STRING,
        references: {
            model: 'analysts',
            key: 'userId'
        }
    },
    revisionMesa: {
        type: type.BOOLEAN,
    },
    altaISI: {
        type: type.BOOLEAN,
    },
    fechaAltaISI: {
        type: type.DATE,
    },
    antiguedad: {
        type: type.INTEGER,
    },
    creditoSolicitado: {
        type: type.INTEGER,
    },
    capacidadPago: {
        type: type.INTEGER,
    },
    creditoAutorizado: {
        type: type.INTEGER,
    },
    fechaAutorizacion: {
        type: type.DATE,
    },
    estatus: {
        type: type.ENUM,
        values: ['Aprobado', 'Rechazado', 'En proceso'],
        defaultValue: 'En proceso',
    },
    tipoCredito: {
        type: type.ENUM,
        values: ['Simple', 'Revolvente'],
    },
}, {
    // Opción para permitir soft delete
    paranoid: true
})
}