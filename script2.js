let N = 5
let blockSize = 500 / N;
let gameArea;

let candys = [
    {color: "green", img: '<img src="./img/green.png" class="green" />'},
    {color: "orange", img: '<img src="./img/orange.png" class="orange" />'},
    {color: "purple", img: '<img src="./img/purple.png" class="purple" />'},
    {color: "red", img: '<img src="./img/red.png" class="red" />'},
    {color: "yellow", img: '<img src="./img/yellow.png" class="yellow" />'}
]

let map = []
let swap = null
let swapID = null
var counter = 10;

function generateMap(){
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            let candy = generateCandy(i, j);
            map.push(candy)
        }
    }
}

function drawMap(){
    scanMap();
    for (let i = 0; i < N*N; i++){
        if(map[i][0].className == "space"){
            var top = parseInt(map[i][0].style.top)
            var left = parseInt(map[i][0].style.left)
            map[i][0] = generateCandy(top/blockSize, left/blockSize)[0];
        }
    }
    gameArea.empty();
    map.forEach((element, i)=>{
        element.on("click", ()=>{
            swapCandys(element, i)
        })
        gameArea.append(element)
    })
}

function swapCandys(element, i){
    if(swap == null){
        swap=element;
        swapID=i
        swap.css({
            "background-color" : "rgba(139, 83, 243, 0.90)"
        })
    } else {
        var e_top = parseInt(element[0].style.top)
        var s_top = parseInt(swap[0].style.top)
        var e_left = parseInt(element[0].style.left)
        var s_left = parseInt(swap[0].style.left)
        if((((e_top-s_top) == 0 && (e_left-s_left) != 0) || ((e_top-s_top)!=0 && (e_left-s_left) == 0)) && Math.abs(e_top-s_top) <= 100 && Math.abs(e_left-s_left) <= 100){
            computedSwap(element, i, swap, swapID)
            map[i][0].style.backgroundColor="rgba(83, 158, 243, 0.74)";
            swap=null;
            swapID=null;
            counter--;
            $(".counter").text(counter)
            drawMap();
        } else {
            swap[0].style.backgroundColor="rgba(83, 158, 243, 0.74)";
            swap=null;
            swapID=null;
            drawMap();
        }
    }
}

function scanMap(){
    for (let i=0; i < N*N; i+=N){
        for(let j=0; j < N-2; j++){
            if( map[i+j][0]!="" && map[i+j+1][0]!="" && map[i+j+2][0]!="" && (map[i+j][0].className == map[i+j+1][0].className) && (map[i+j+1][0].className == map[i+j+2][0].className)){
                for(let l=0; l < 3; l++){
                    var space = $("<div class='space'></div>");
                    space.css({
                        "top" : map[i+j+l].css("top"),
                        "left" : map[i+j+l].css("left")
                    })
                    map[i+j+l]=space
                }
                gapLoad();
            }
        }
    }
}

function gapLoad(){
    for (let j=0; j < N; j++){//oszlop
        for(let i=N*N-1; i >= 0; i-=N){//sor
            if(map[i-j][0].className == "space"){
                for(k=i; k>=N; k-=N){
                    computedSwap(map[k-j], k-j, map[k-j-N], k-j-N);
                }
            }
        }
    }
}

function generateCandy(i, j){
    let random = Math.random();
    if (0 <= random && random < 0.20) {
        var candy = $(candys[0].img)
    } else if (0.20 <= random && random < 0.40) {
        var candy = $(candys[1].img)
    } else if (0.40 <= random && random < 0.60) {
        var candy = $(candys[2].img)
    } else if (0.60 <= random && random < 0.80) {
        var candy = $(candys[3].img)
    } else {
        var candy = $(candys[4].img)
    }
    candy.addClass('candy');
    candy.css({
        width: blockSize,
        height: blockSize,
        top: i * blockSize,
        left: j * blockSize
    });
    return candy;
}

function computedSwap(e1, id1, e2, id2){
    var tmp=e1[0]
    var e_top = parseInt(e1[0].style.top)
    var s_top = parseInt(e2[0].style.top)
    var e_left = parseInt(e1[0].style.left)
    var s_left = parseInt(e2[0].style.left)
    map[id1][0]=e2[0]
    map[id2][0]=tmp
    map[id1][0].style.top=e_top+"px"
    map[id1][0].style.left=e_left+"px"
    map[id2][0].style.top=s_top+"px"
    map[id2][0].style.left=s_left+"px"
}

$(function () {
    gameArea = $('<div></div>');
    gameArea.appendTo('body');
    gameArea.attr('id', 'gamearea');
    
    generateMap();
    drawMap()
});