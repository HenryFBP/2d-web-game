// blocks.ts

/// <reference path="../defs/phaser.d.ts" /> 

class Block { //TODO why does `export class Block` break everything?

    game: HGame;

    /**
     * What the sprite is called when the image is loaded by Phaser.game.load.image(...)
     */
    spritename: String;

    /**
     * The sprite only exists if this block is rendered.
     */
    sprite?: Phaser.Sprite = undefined;

    name: String = "Stone";

    /**
     * How wide this block is.
     */
    width: number = 16;

    /**
     * How tall this block is.
     */
    height: number = 16;

    /**
     * x Position in world.
     */
    x: number;

    /**
     * y position in world.
     */
    y: number;


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

    render() {

        /**
         * The point we should render this `Block`'s `Sprite` into.
         */
        let p = HWorld.resolve_point(
            new Phaser.Point(this.x, this.y),
            this,
        )

        this.sprite = this.game.game.add.sprite(
            p.x,
            p.y,
            this.spritename);
    }
	
	/**
	 * Only renders if `sprite == false`.
	 */
	rendersafe() {
		if(!this.sprite) {
			this.render();
		}
	}

    derender() {

    }

    constructor(g: Phaser.Game, spritename: String, dim?: Phaser.Point, pos?: Phaser.Point) {
        this.spritename = spritename;
    }
}