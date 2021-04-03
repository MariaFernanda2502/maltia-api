module.exports = (DB, type) => {
    return DB.define('solicitud',
    {
    idSolicitud: {
        type: type.INTERGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idUsuarioAsesor: {
        type: type.STRING,
        // Falta foreign key que referencia a ASESOR
    },
    idUsuarioAnalista: {
        type: type.STRING,
        // Falta foreign key que referencia a ANALISTA
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
        values: ['Aprobado', 'Rechazado', 'En proceso...'],
        defaultValue: 'En proceso...',
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