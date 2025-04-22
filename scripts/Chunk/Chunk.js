class Chunk {
  constructor({ x, z }) {
    if (typeof x !== 'number' || typeof z !== 'number') 
      throw new Error('Invalid parameters: x and z must be numbers.');
    this.x = Math.floor(x / 16);
    this.z = Math.floor(z / 16);
    this.location = { x: this.x * 16 + 8, y: 100, z: this.z * 16 + 8 }
    this.entity = null;
  }

  setEntity(entity) {
    this.entity = entity;
  }

  removeEntity() {
    if (this.entity && this.entity.isValid)
      this.entity.remove();
    this.entity = null
  }

  equals(other) {
    return this.x === other.x && this.z === other.z;
  }

  getEntitiesInside() {
    if (!this.entity || !this.entity.isValid) return [];
    const entities = this.entity.dimension.getEntities({
      location: this.location,
      volume: { x: 16, y: 256, z: 16 },
      excludeTypes: [this.entity.typeId]
    });
    return entities
  }

  isLoaded() {
    return this.entity && this.entity.isValid;
  }
}

export { Chunk };