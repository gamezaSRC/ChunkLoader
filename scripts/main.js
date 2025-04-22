// Just an example of how to use it
import { Player, world } from '@minecraft/server';
import { ChunkLoader } from './Chunk/ChunkLoader';

world.afterEvents.itemUse.subscribe(({
    source: player
}) => {
    if (!(player instanceof Player)) return;
    const location = player.location;
    const spawnDimension = player.dimension;
    const destinationDimension = player.dimension
    const destination = { x: 2300, y: 70, z: 4000 }
    const chunk = new ChunkLoader({ 
        x: location.x, 
        y: location.y, 
        z: location.z, 
        baseDimension: spawnDimension, 
        dimension: destinationDimension 
    });
    chunk.load(destination).then(() => {
        destinationDimension.setBlockType(destination, 'minecraft:stone')
        chunk.unload(destination)
    })
})
