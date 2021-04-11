module.exports = (DB, type) => {
    return DB.define('adviser',
    {
    userId: {
        // Es foreign key
        type: type.STRING,
        primaryKey: true,
    },
}, {
    // Opción para permitir soft delete
    paranoid: true
})}