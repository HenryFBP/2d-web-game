// world.ts

/// <reference path="../defs/phaser.d.ts" /> 

class HWorld {
    game: Phaser.Game;
    grid: Array<Array<Block>>;

    constructor(g: Phaser.Game, width: number, height: number) {
        this.game = g;

        this.grid = [];

    }


    drawline(block: Block, p1: Phaser.Point, p2: Phaser.Point) {

    }
}