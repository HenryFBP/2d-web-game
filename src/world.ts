// world.ts

/// <reference path="../defs/phaser.d.ts" /> 

class HWorld {
    game: SimpleGame;

    grid: Array<Array<Block>>;

    width: number;
    height: number;

    constructor(g: SimpleGame, width: number, height: number) {
        this.game = g;

        this.width = width;
        this.height = height;

        this.grid = [];
    }

    /**
     * Given a `Point`, and the height and width of a box,
     * resolve that point into a location on a grid where each
     * box is spaced as much as the box given.
     * 
     * Useful because placing a `16`x`16` block at `(3,4)` on a grid made up
     * of `16`x`16` boxes requires some math.
     * 
     * In that example, `resolve_point(P(3,4), P(16,16))` -> `(48,64)`.
     * 
     * @returns Phaser.Point
     */
    static resolve_point(p: Phaser.Point, box: Phaser.Point) {
        return new Phaser.Point(
            box.x * p.x,
            box.y * p.y,
        )
    }

    possible_width(): number {
        return this.game.game.width / this.width;
    }

    possible_height(): number {
        return this.game.game.height / this.height;
    }

    drawblock(block: Block, p: Phaser.Point) {

    }


    drawsquare(block: Block, p1: Phaser.Point, p2: Phaser.Point) {
        for (let x = p1.x; x < p2.x; x++) {
            for (let y = p1.y; y < p2.y; y++) {

                let p = new Phaser.Point(x, y);
                let bp = new Phaser.Point(block.width, block.height);

                /**
                 * Location in-game. We need this to know where to draw the sprite.
                 */
                let gamepoint = HWorld.resolve_point(p, bp)

                console.log("For point ",p,", we would have drawn it at ",gamepoint); 
            }
        }
    }
}