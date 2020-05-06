let N = 5;
let blockSize = 500 / N;
let gameArea;

var green = '<img src="./img/green.png" class="candy green" />';
var green_s = '<img src="./img/green_s.png" class="candy green_s" />';
var orange = '<img src="./img/orange.png" class="candy orange" />';
var orange_s = '<img src="./img/orange_s.png" class="candy orange" />';
var purple = '<img src="./img/purple.png" class="candy purple" />';
var purple_s = '<img src="./img/purple_s.png" class="candy purple_s" />';
var red = '<img src="./img/red.png" class="candy red" />';
var red_s = '<img src="./img/red_s.png" class="candy red_s" />';
var yellow = '<img src="./img/yellow.png" class="candy yellow" />';
var yellow_s = '<img src="./img/yellow_s.png" class="candy yellow_s" />';

var blocks = []
var swap;

function generateMap(){
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            let block = $('<div></div>');
            block.addClass('block');
            let random = Math.random();
            if (0 <= random && random < 0.20) {
                block.append(green)
            } else if (0.20 <= random && random < 0.40) {
                block.append(orange)
            } else if (0.40 <= random && random < 0.60) {
                block.append(purple)
            } else if (0.60 <= random && random < 0.80) {
                block.append(red)
            } else {
                block.append(yellow)
            }
            block.css({
                width: blockSize,
                height: blockSize,
                top: i * blockSize,
                left: j * blockSize
            });
            block.on("click", () =>{
                highLight(block)
            })
            block.appendTo(gameArea);
        }
    }
}

function highLight(block){
    if(swap == null){
        swap=block;
    } else {
        var b_top = parseInt(block.css("top"))
        var s_top = parseInt(swap.css("top"))
        var b_left = parseInt(block.css("left"))
        var s_left = parseInt(swap.css("left"))
    } if (((b_top-s_top) == 0 && (b_left-s_left) != 0) ||((b_top-s_top)!=0 && (b_left-s_left) == 0)) {
        var top = block.css("top")
        var left = block.css("left")
        block.animate({
            "top" : swap.css("top"),
            "left" : swap.css("left")
        },300)
        swap.animate({
            "top" : top,
            "left" : left
        },300)
        swap=null
    }
}

$(function () {
    gameArea = $('<div></div>');
    gameArea.appendTo('body');
    gameArea.attr('id', 'gamearea');
    
    generateMap();
});