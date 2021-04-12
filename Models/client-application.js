module.exports = (DB, type) => {
    return DB.define('solicitud',
    {
    clientApplicationId: {
        type: type.INTERGER,
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
        type: type.INTERGER,
    },
    creditoSolicitado: {
        type: type.INTERGER,
    },
    capacidadPago: {
        type: type.INTERGER,
    },
    creditoAutorizado: {
        type: type.INTERGER,
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