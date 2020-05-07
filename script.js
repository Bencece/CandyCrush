let N = 5;
let blockSize = 500 / N;
let gameArea;

let candys = [
    {color: "green", img: '<img src="./img/green.png" class="green" />'},
    {color: "orange", img: '<img src="./img/orange.png" class="orange" />'},
    {color: "purple", img: '<img src="./img/purple.png" class="purple" />'},
    {color: "red", img: '<img src="./img/red.png" class="red" />'},
    {color: "yellow", img: '<img src="./img/yellow.png" class="yellow" />'}
]
//var green = '<img src="./img/green.png" class="green" />';
var green_s = '<img src="./img/green_s.png" class="green_s" />';
//var orange = '<img src="./img/orange.png" class="orange" />';
var orange_s = '<img src="./img/orange_s.png" class="orange" />';
//var purple = '<img src="./img/purple.png" class="purple" />';
var purple_s = '<img src="./img/purple_s.png" class="purple_s" />';
//var red = '<img src="./img/red.png" class="red" />';
var red_s = '<img src="./img/red_s.png" class="red_s" />';
//var yellow = '<img src="./img/yellow.png" class="yellow" />';
var yellow_s = '<img src="./img/yellow_s.png" class="yellow_s" />';

var blocks = []
var swap;
var counter = 10;

function generateMap(){
    var index = 0;
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            let block = $('<div></div>');
            block.addClass('block');
            let random = Math.random();
            if (0 <= random && random < 0.20) {
                block.append(candys[0].img)
            } else if (0.20 <= random && random < 0.40) {
                block.append(candys[1].img)
            } else if (0.40 <= random && random < 0.60) {
                block.append(candys[2].img)
            } else if (0.60 <= random && random < 0.80) {
                block.append(candys[3].img)
            } else {
                block.append(candys[4].img)
            }
            block.css({
                width: blockSize,
                height: blockSize,
                top: i * blockSize,
                left: j * blockSize
            });
            block.attr("id", index)
            index++;
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
        swap.css({
            "background-color" : "rgba(139, 83, 243, 0.90)"
        })
    } else {
        var s_id = swap.attr("id")
        var b_top = parseInt(block.css("top"))
        var s_top = parseInt(swap.css("top"))
        var b_left = parseInt(block.css("left"))
        var s_left = parseInt(swap.css("left"))
        if ((((b_top-s_top) == 0 && (b_left-s_left) != 0) || ((b_top-s_top)!=0 && (b_left-s_left) == 0)) && Math.abs(b_top-s_top) <= 100 && Math.abs(b_left-s_left) <= 100) {
            swap.attr("id", block.attr("id"))
            block.attr("id", s_id)
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
            swap.css({
                "background-color" : "rgba(83, 158, 243, 0.74)"
            })
            swap=null
            counter--;
            $(".counter").text(counter)
            scanMap()
        }
    }
}

function scanMap(){
    /*$(".block").each((i, element) =>{
        blocks[element.id]= element
    })
    for(var j=0; j < N; j+=4){
    for (let i = 0; i < N-2; i++) {
        //console.log((blocks[i].children[0].getAttribute("class") == blocks[i+1].children[0].getAttribute("class")) && (blocks[i+1].children[0].getAttribute("class") == blocks[i+2].children[0].getAttribute("class")))
        
        console.log("Kint: "+(i+j))
        if((blocks[i+j].children[0].getAttribute("class") == blocks[i+1+j].children[0].getAttribute("class")) && (blocks[i+1+j].children[0].getAttribute("class") == blocks[i+2+j].children[0].getAttribute("class"))){
            console.log("juhé")
            console.log(i+" "+j)
            blocks[i+j].removeChild(blocks[i+j].childNodes[0])
            blocks[i+1+j].removeChild(blocks[i+1+j].childNodes[0])
            blocks[i+2+j].removeChild(blocks[i+2+j].childNodes[0])
        }
        
    }
    }*/
    $(".block").each((i, element) =>{
        blocks[element.id]= element
    })
    console.log(candys)
}

$(function () {
    gameArea = $('<div></div>');
    gameArea.appendTo('body');
    gameArea.attr('id', 'gamearea');
    
    generateMap();
    scanMap()
});