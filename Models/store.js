module.exports = (DB, type) => {
    return DB.define('store',
    {
    id: {
        type: type.STRING,
        primaryKey: true,
    },
    userAdviserId: {
        // Es una foreign key
        type: type.STRING,  
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