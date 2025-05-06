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
import { EManager } from "./EManager";
import { Chunk } from "./Chunk";
import { IChunkManager } from "./Interfaces/IChunkManager";
import { system } from "@minecraft/server";

const OVERWORLD = world.getDimension('overworld')
const LOADED_CHUNKS = new Map();
class ChunkLoader extends IChunkManager {
    #baseChunk;
    #entityManager;
    #dimension;
    constructor({ x, z, baseDimension = OVERWORLD, dimension }) {
        super();
        this.#baseChunk = new Chunk({ x: x, z: z });
        this.#entityManager = new EManager(baseDimension);
        this.#dimension = dimension;
    }

    async load(location) {
        const chunk = new Chunk({ x: location.x, z: location.z });
        const key = `${chunk.x},${chunk.z}`;
        //if (LOADED_CHUNKS.has(key)) 
            //throw new Error("This chunk is already loaded");
        if (chunk.equals(this.#baseChunk))
            throw new Error("Cannot load the base chunk");
        const baseLoc = this.#baseChunk.location;
        const targetLoc = chunk.location;
        const entity = this.#entityManager.spawn(baseLoc);
        // we wait 1 tick so the entity has time to load the chunk, this is what does the trick...
        await system.waitTicks(1);
        chunk.setEntity(entity); 
        LOADED_CHUNKS.set(key, chunk);
        this.#entityManager.teleport(entity, targetLoc, this.#dimension);
        console.log(`ChunkLoader: Chunk loaded at ${chunk.x},${chunk.z}`);
    }

    unload(location) {
        const chunk = new Chunk({ x: location.x, z: location.z });
        const key = `${chunk.x},${chunk.z}`;
        if (!LOADED_CHUNKS.has(key)) return;
            //throw new Error("This chunk is not loaded");
        const loadedChunk = LOADED_CHUNKS.get(key);
        loadedChunk.removeEntity();
        LOADED_CHUNKS.delete(key);
    }

    unloadAll() {
        for (const chunk of LOADED_CHUNKS.values())
            chunk.removeEntity();
        LOADED_CHUNKS.clear();
    }

    isLoaded(location) {
        const chunk = new Chunk({ x: location.x, z: location.z });
        const key = `${chunk.x},${chunk.z}`;
        return LOADED_CHUNKS.has(key);
    }

    list() {
        const chunks = Array.from(LOADED_CHUNKS.values()).map(chunk => ({
            x: chunk.x,
            z: chunk.z
        }));
        return chunks;
    }

    getCenter(location) {
        const chunk = new Chunk({ x: location.x, z: location.z });
        return chunk.location;
    }

    getEntity(location) {
        const chunk = new Chunk({ x: location.x, z: location.z });
        const key = `${chunk.x},${chunk.z}`;
        if (!LOADED_CHUNKS.has(key)) return undefined;
        const loadedChunk = LOADED_CHUNKS.get(key);
        return loadedChunk.entity;
    }
}
export { ChunkLoader };
