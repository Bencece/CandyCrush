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

let candys_s = [
    {color: "green_s", img: '<img src="./img/green_s.png" class="green" />'},
    {color: "orange_s", img: '<img src="./img/orange_s.png" class="orange" />'},
    {color: "purple_s", img: '<img src="./img/purple_s.png" class="purple" />'},
    {color: "red_s", img: '<img src="./img/red_s.png" class="red" />'},
    {color: "yellow_s", img: '<img src="./img/yellow_s.png" class="yellow" />'}
]

let map = []
let swap = null
let swapID = null
var counter = 10;
let panel;
var points = 0;
var players = [];
let player = '';
var level = 1;

/**
 * Map feltöltése cukorkákkal
 */
function generateMap(){
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            let candy = generateCandy(i, j);
            map.push(candy)
        }
    }
}

/**
 * Map kiírása a játéktáblára
 */
function drawMap(){
    if(counter <= 0){
        $(".gamearea").empty();
        $(".gamearea").hide()
        players.push({
            nev: player,
            pont: points
        })
        console.log(players)
        players.forEach(element =>{
            var t = $("<tr><td>"+element.nev+"</td><td>"+element.pont+"</td></tr>")
            $(".score").append(t)
        })
        $(".score").show()
        $(".level").show()
        $(".level").on("click",()=>{
            points=0
            counter=10
            $(".score").hide()
            $(".level").hide()
            $(".gamearea").show()
        })
    }
    scanMap();
    for (let i = 0; i < N*N; i++){
        if(map[i][0].className == "space"){//ha van üres mező
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
    scanMap();
    /*gameArea.children.forEach((element, i)=>{
        console.log(element)
    })*/
    //console.log(gamearea.children[0])
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
            map[i][0].style.backgroundColor="rgba(83, 158, 243, 0.9)";
            swap=null;
            swapID=null;
            counter--;
            $(".counter").text(counter)
            $(".swoosh")[0].play()
            drawMap();
        } else {
            swap[0].style.backgroundColor="rgba(83, 158, 243, 0.9)";
            swap=null;
            swapID=null;
            drawMap();
        }
    }
}

function scanMap(){
    for (let i=0; i < N*N; i+=N){
        for(let j=0; j < N-3; j++){
            if( map[i+j][0]!="" && map[i+j+1][0]!="" && map[i+j+2][0]!="" && map[i+j+3][0]!="" && (map[i+j][0].className == map[i+j+1][0].className) && (map[i+j+1][0].className == map[i+j+2][0].className) && (map[i+j+2][0].className == map[i+j+3][0].className)){
                for(let l=0; l < 3; l++){
                    var space = $("<div class='space'></div>");
                    space.css({
                        "top" : map[i+j+l].css("top"),
                        "left" : map[i+j+l].css("left")
                    })
                    map[i+j+l]=space
                }
                map[i+j+3]=generateCandy(parseInt(map[i+j+3].css("top"))/blockSize, parseInt(map[i+j+3].css("left"))/blockSize, 0)
                points+=120;
                $(".points").text(points)
                gapLoad();
            }
        }
    }
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
                points+=60
                $(".points").text(points)
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

function generateCandy(i, j, s=null){
    if(s == 0){
        var candy = $(candys_s[0].img)
    } else if(s == 1){
        var candy = $(candys_s[1].img)
    } else if(s == 1){
        var candy = $(candys_s[2].img)
    } else if(s == 1){
        var candy = $(candys_s[3].img)
    } else if(s == 1){
        var candy = $(candys_s[4].img)
    } else {
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
    }
    //candy.addClass('candy');
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
    /*map[id1][0].animate({
        top: e_top+"px",
        left: e_left+"px"
    },1000)
    map[id2][0].animate({
        top: s_top+"px",
        left: s_left+"px"
    },1000,()=>{
        next();
    })*/
    map[id1][0].style.top=e_top+"px"
    map[id1][0].style.left=e_left+"px"
    map[id2][0].style.top=s_top+"px"
    map[id2][0].style.left=s_left+"px"
}

$(function () {
    gameArea = $('<div></div>');
    gameArea.appendTo('body');
    gameArea.attr('class', 'gamearea');
    
    panel = $('<div></div>')

    $(".score").hide()
    $(".level").hide()

    $(".ok").on("click",()=>{
        player = $(".player").val()
        console.log( $(".player").val())
        $(".message").hide()
        generateMap();
        drawMap()
    })

});