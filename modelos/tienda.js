module.exports = (DB, type) => {
    return DB.define('tienda',
    {
    id: {
        type: type.STRING,
        primaryKey: true,
    },
    idUsuarioAsesor: {
        type: type.STRING,
         // Falta la foreign key referencia a ASESOR
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