module.exports = (DB, type) => {
    return DB.define('adviser',
    {
    userId: {
        foreignKey: true,
        primaryKey: true,
        type: type.INTEGER,
        references: {
            model: 'employees',
            key: 'userId'
        }
    },
}, {
    // Opción para permitir soft delete
    paranoid: true
})}