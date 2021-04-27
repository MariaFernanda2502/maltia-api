module.exports = (DB, type) => {
    return DB.define('report',
    {
    reportId: {
        primaryKey: true,
        type: type.INTEGER,
        autoIncrement: true,
    },
    userAnalystId: {
        foreignKey: true,
        type: type.INTEGER,
        references: {
            model: 'analysts',
            key: 'userId'
        }
    },
    tipoReporte: {
        type: type.ENUM,
        values: ['Diario', 'Semanal', 'Mensual'],
    },
    solicitudesAceptadas: {
        type: type.INTEGER,
    },
    solicitudesRechazadas: {
        type: type.INTEGER,
    },
}, {
    // Opción para permitir soft delete
    paranoid: true
})
}