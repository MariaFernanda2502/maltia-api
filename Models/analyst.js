module.exports = (DB, type) => {
    return DB.define('analyst',
    {
    userId: {
        // Es foreign key
        type: type.STRING,
        primaryKey: true,
    },
    departamento: {
        type: type.STRING,
        noEmpty: true,
        defaultValue: 'OFICINA CENTRAL',
    }
}, {
    // Opción para permitir soft delete
    paranoid: true
})
}