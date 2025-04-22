class IEntityManager {
    spawnEntity(position) {
        throw new Error("Method spawnEntity not implemented");
    }
    teleportEntity(entity, position) {
        throw new Error("Method teleportEntity not implemented");
    }
    removeEntity(entity) {
        throw new Error("Method removeEntity not implemented");
    }
}
export { IEntityManager };