// import { HWorld } from "./world"; //TODO why does this break everything?

declare function require(name: string);

var fs = require('fs')
var path = require('path')
var yaml = require('js-yaml');

var block;

class HGame {

    facing: String;
    player: Phaser.Sprite;

    game: Phaser.Game;
    world: HWorld;

    controls: {};

    constructor() {

        this.game = new Phaser.Game(
            500, 500,
            Phaser.AUTO,
            'phaser-example',
            {
                preload: this.preload,
                create: this.create,
                update: this.update,
                render: this.render,
            },
        );

        this.world = new HWorld(this, 20, 20);

        this.world.drawsquare(
            new Block(this.game, "stone"),
            new Phaser.Point(0, 0),
            new Phaser.Point(2, 3)
        );

    }

    preload() {
        this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        this.game.load.image('stone', 'assets/stone.png');

        let buttons = yaml.safeLoad(fs.readFileSync('data/controls.yml', 'utf8'));

        this.controls = {};

        Object.keys(buttons).forEach((key) => {
            let value = buttons[key];

            this.controls[key] = this.game.input.keyboard.addKey(Phaser.KeyCode[value]);
        })

        console.log(this.controls);
    }

    create() {

        this.game.world.setBounds(0, 0, 500, 500)
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.time.desiredFps = 60;
        this.game.physics.arcade.gravity.y = 250;

        this.player = this.game.add.sprite(
            this.game.world.bounds.width - 100,
            this.game.world.bounds.height - 200,
            'dude');

        this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.game.camera.follow(this.player);

        block = this.game.add.sprite(
            this.game.world.bounds.width - 100,
            this.game.world.bounds.height - 75,
            'stone');

        this.game.physics.enable(block, Phaser.Physics.ARCADE);
        block.body.allowGravity = false;
        block.body.immovable = true;
        block.body.allowDrag = false;

        this.player.body.bounce.y = 0.2;
        this.player.body.collideWorldBounds = true;
        this.player.body.setSize(20, 32, 5, 16);

        this.player.animations.add('left', [0, 1, 2, 3], 10, true);
        this.player.animations.add('turn', [4], 20, true);
        this.player.animations.add('right', [5, 6, 7, 8], 10, true);

    }

    render() {
        this.game.debug.text(this.game.time.suggestedFps.toString(), 32, 32);
    }

    update() {

        // game.physics.arcade.collide(player, layer);

        this.game.physics.arcade.collide(this.player, block, (o1, o2) => {
            this.game.debug.text("collision!", 32, 48);
        }, null, this);

        this.player.body.velocity.x = 0;

        if (this.controls['LEFT'].isDown) {
            this.player.body.velocity.x = -150;

            if (this.facing != 'left') {
                this.player.animations.play('left');
                this.facing = 'left';
            }
        }
        else if (this.controls['RIGHT'].isDown) {
            this.player.body.velocity.x = 150;

            if (this.facing != 'right') {
                this.player.animations.play('right');
                this.facing = 'right';
            }
        }
        else {
            if (this.facing != 'idle') {
                this.player.animations.stop();

                if (this.facing == 'left') {
                    this.player.frame = 0;
                }
                else {
                    this.player.frame = 5;
                }

                this.facing = 'idle';
            }
        }

        if (this.controls['JUMP'].isDown &&
            (this.player.body.onFloor() || this.player.body.touching.down)) {

            this.player.body.velocity.y = -250;
        }
    }
}


var game = new HGame();
