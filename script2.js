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

function generateMap(){
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
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
            map.push(candy)
        }
    }
}

function drawMap(){
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
        var tmp=element[0]
        var e_top = parseInt(element[0].style.top)
        var s_top = parseInt(swap[0].style.top)
        var e_left = parseInt(element[0].style.left)
        var s_left = parseInt(swap[0].style.left)
        if((((e_top-s_top) == 0 && (e_left-s_left) != 0) || ((e_top-s_top)!=0 && (e_left-s_left) == 0)) && Math.abs(e_top-s_top) <= 100 && Math.abs(e_left-s_left) <= 100){
            console.log("belépett")
            map[i][0]=swap[0]
            map[swapID][0]=tmp
            
            map[i][0].style.top=e_top+"px"
            map[i][0].style.left=e_left+"px"
            map[swapID][0].style.top=s_top+"px"
            map[swapID][0].style.left=s_left+"px"
            map[i][0].style.backgroundColor="rgba(83, 158, 243, 0.74)";
            swap=null;
            swapID=null;
            drawMap();
        } else {
            swap[0].style.backgroundColor="rgba(83, 158, 243, 0.74)";
            swap=null;
            swapID=null;
            drawMap();
        }
        
        
    }
}

$(function () {
    gameArea = $('<div></div>');
    gameArea.appendTo('body');
    gameArea.attr('id', 'gamearea');
    
    generateMap();
    drawMap()
});