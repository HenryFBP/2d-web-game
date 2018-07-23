// blocks.ts

/// <reference path="../defs/phaser.d.ts" /> 

class Block { //TODO why does `export class Block` break everything?

    sprite: Phaser.Sprite;

    public get width(): number {
        return this.sprite.width;
    }

    public get height(): number {
        return this.sprite.height
    }

    /**
     * The block is broken by an Entity.
     */
    on_break: Function = (entity) => { return new Item() };

    /**
     * An Entity touches the block.
     */
    on_touch: Function = (entity) => { };

    /**
     * The block is placed by an Entity.
     */
    on_place: Function = (entity) => { };

    /**
     * An Event updates the block.
     */
    on_update: Function = (event) => { };

    /**
     * A tick passes.
     */
    on_tick: Function = () => { };

    constructor(sprite?: Phaser.Sprite) {
        this.sprite = sprite;
    }
}