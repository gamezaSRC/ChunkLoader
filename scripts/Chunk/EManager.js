import { IEntityManager } from "./Interfaces/IEntityManager";

class EManager extends IEntityManager {
  constructor(baseDimension) {
    super(baseDimension);
    this.baseDimension = baseDimension;
  }
  spawn(position) {
    const entity = this.baseDimension.spawnEntity("src:chunk_loader", position, { initialPersistence: true });
    return entity;
  }

  teleport(entity, position, dimension) {
    entity.teleport(position, { dimension: dimension, keepVelocity: false });
  }

  remove(entity) {
    entity.remove();
  }
}
export { EManager };