module.exports = (DB, type) => {
    return DB.define('store',
    {
    storeId: {
        primaryKey: true,
        type: type.STRING,
    },
    userAdviserId: {
        foreignKey: true,
        type: type.STRING,
        references: {
            model: 'adviser',
            key: 'userId'
        }
    },
    direccion: {
        type: type.STRING,
    },
    nombre: {
        type: type.STRING,
        noEmpty: true,
    },
}, {
    // Opción para permitir soft delete
    paranoid: true
})
}