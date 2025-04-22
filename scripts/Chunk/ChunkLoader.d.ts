/**
 * ChunkLoader 
 * 
 * A Script for Minecraft Bedrock Edition that manages chunk loading and unloading.
 * @author gameza_src
 * @version 1.0.0
 * @license MIT
 * 
 * Discord: gameza_src
 * GitHub: https://github.com/gamezaSRC
 */
import { 
    Dimension, 
    Entity, 
    Vector3 
} from "@minecraft/server";

/**
 * @interface ChunkLoaderOptions
 * @remarks We need a base chunk so the entity can be spawned in the world,
 * this base chunk can be the player's location or a ticking area.
 * @description Defines the options for initializing a ChunkLoader.
 */
interface ChunkLoaderOptions {
    /**
     * The x-coordinate of the base chunk.
     */
    x: number;

    /**
     * The z-coordinate of the base chunk.
     */
    z: number;

    /**
     * The base dimension of the chunk loader (optional).
     */
    baseDimension?: Dimension;

    /**
     * The dimension of the base chunk.
     */
    dimension: Dimension;
}
/**
 * @class ChunkLoader
 * @extends IChunkManager
 * @description Manages chunk loading and unloading in the Minecraft world.
 * @remarks This class is experimental and may not work as expected.
 */
declare class ChunkLoader {
    /**
     * @remarks We need a base chunk so the entity can be spawned in the world,
     * this base chunk can be the player's location or a ticking area.
     * @param options - Options for the ChunkLoader. 
     * @constructor for ChunkLoader
     */
    constructor(options: ChunkLoaderOptions);


    /**
     * Loads a chunk at the specified location.
     * @remarks This method takes 1 tick to load a chunk.
     * @param location - The location of the chunk to load.
     * @returns A promise that resolves when the chunk is loaded.
     * @throws Error if the chunk is already loaded or if it's the base chunk.
     */
    load(location: Vector3): Promise<void>;

    /**
     * Unloads a chunk at the specified location.
     * @param location - The location of the chunk to unload.
     * @returns void
     */
    unload(location: Vector3): void;

    /**
     * Unloads all loaded chunks.
     * @returns void
     */
    unloadAll(): void;

    /**
     * Checks if a chunk at the specified location is loaded.
     * @param location - The location of the chunk to check.
     * @returns boolean - Returns true if the chunk is loaded, false otherwise.
     */
    isLoaded(location: Vector3): boolean;

    /**
     * Lists all loaded chunks.
     * @returns An array of objects representing the coordinates of all loaded chunks.
     */
    list(): Array<{ x: number; z: number }>;

    /**
     * Gets the center location of a chunk.
     * @param location - The location of the chunk.
     * @returns The central coordinates of the chunk.
     */
    getCenter(location: Vector3): Vector3;

    /**
     * Gets the loader entity for a chunk at the specified location.
     * @param location - The location of the chunk.
     * @returns The loader entity of the chunk, or undefined if no entity exists.
     */
    getEntity(location: Vector3): Entity | undefined;
}

export { ChunkLoader };