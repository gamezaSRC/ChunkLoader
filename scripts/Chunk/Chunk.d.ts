import { 
    Entity, 
    Vector2, 
    Vector3 
} from "@minecraft/server";

/**
 * @class Chunk
 * @description Represents a chunk in the Minecraft world.
 */
declare class Chunk {
    /**
     * The x-coordinate of the chunk.
     */
    x: number;

    /**
     * The z-coordinate of the chunk.
     */
    z: number;

    /**
     * The central location of the chunk.
     * Represented as an object containing x, y, and z coordinates.
     */
    location: Vector3;

    /**
     * The entity associated with the chunk.
     */
    entity: Entity | null;

    /**
     * Constructor to initialize a chunk with x and z coordinates.
     * @param options - An object containing the x and z coordinates.
     * @constructor for Chunk
     */
    constructor(options: Vector2);

    /**
     * Assigns an entity to the chunk.
     * @param entity - The entity to be assigned.
     * @returns void
     */
    setEntity(entity: Entity): void;

    /**
     * Removes the entity associated with the chunk, if any.
     * @returns void
     */
    removeEntity(): void;

    /**
     * Compares if another chunk has the same x and z coordinates.
     * @param other - Another chunk to compare.
     * @returns boolean - Returns true if they are equal.
     */
    equals(other: Chunk): boolean;

    /**
     * Gets the entities inside the boundaries of the chunk.
     * @returns Array<Entity> - A list of entities inside the chunk.
     */
    getEntitiesInside(): Entity[];

    /**
     * Checks if the chunk is loaded based on the validity of its entity.
     * @returns boolean - Returns true if the chunk is loaded.
     */
    isLoaded(): boolean;
}

export { Chunk };