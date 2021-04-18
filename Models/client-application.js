module.exports = (DB, type) => {
    return DB.define('solicitud',
    {
    clientApplicationId: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userAdviserId: {
        // Es foreign key
        type: type.STRING,
    },
    userAnalystId: {
        // Es foreign key
        type: type.STRING,
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