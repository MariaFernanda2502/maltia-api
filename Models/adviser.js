module.exports = (DB, type) => {
    return DB.define('adviser',
    {
    userId: {
        foreignKey: true,
        primaryKey: true,
        type: type.STRING,
        references: {
            model: 'employee',
            key: 'userId'
        }
    },
}, {
    // Opción para permitir soft delete
    paranoid: true
})}