var size = 34;

var selectCells = [];

var saves = [];

var len1, len2;
var copyMap = [];
var lastCell = [];
var undoMax = 30;
var allKeys = [];
var mouseMoved = false;
var mouseDown = false, altDown = false;
document.body.onmousedown = () => { mouseDown = true }
document.body.onmouseup = () => { mouseDown = false }
document.body.addEventListener('keydown',(e) => { if (e.key == 'Alt') { altDown = true } });
document.body.addEventListener('keyup',(e) => { if (e.key == 'Alt') { altDown = false; mouseMoved = false; } });
var mouseLast = [];

var select1;
var select = 1;
updateSelectedEle();
var old_direction;
var current_direction = 1;
var map = [];

class componant {
    constructor(number,i,j) {
        this.i = i;
        this.j = j;
        this.reform(number);
    }
    reform(number) {
        let toGet = findType(number);
        this.parts = toGet;
        this.cpower = this.parts.power;
        this.powered = false;
        this.keyDown = false;
        this.direction = current_direction;
        $('i' + this.i + 'j' + this.j).style.background = this.parts.color;
        if (this.parts.text == 'direction') {
            if (this.direction == 1) $('i' + this.i + 'j' + this.j).innerHTML = '>';
            if (this.direction == 2) $('i' + this.i + 'j' + this.j).innerHTML = '<';
            if (this.direction == 3) $('i' + this.i + 'j' + this.j).innerHTML = '^';
            if (this.direction == 4) $('i' + this.i + 'j' + this.j).innerHTML = 'v';
        } else if (this.parts.text !== 'key') {
            $('i' + this.i + 'j' + this.j).innerHTML = '';
            this.direction = 0;
        }
        this.different = false;
        for (let i = 0; i < allKeys.length; i++) {
            if (allKeys[i].i == this.i && allKeys[i].j == this.j) {
                allKeys.remove(i);
            }
        }
        if (this.parts.key) {
            $('i' + this.i + 'j' + this.j).innerHTML = this.parts.key.key;
            if (this.direction == 1) $('i' + this.i + 'j' + this.j).innerHTML += '>';
            if (this.direction == 2) $('i' + this.i + 'j' + this.j).innerHTML += '<';
            if (this.direction == 3) $('i' + this.i + 'j' + this.j).innerHTML += '^';
            if (this.direction == 4) $('i' + this.i + 'j' + this.j).innerHTML += 'v';
            allKeys.push( {
                part: this.parts.key,
                i: this.i,
                j: this.j
            } );
        }
        lastCell = [this.j,this.i];
    }
    saveUndo() {
        if (saves[saves.length - 1] !== getSave()) saves.push(getSave());
        if (saves.length > undoMax) saves.shift();

        
        
        if (altDown && select !== 1) {
            let mouse_moved = current_direction;
            if (mouseLast[0] > this.j) mouse_moved = 2;
            if (mouseLast[0] < this.j) mouse_moved = 1;
            if (mouseLast[1] < this.i) mouse_moved = 4;
            if (mouseLast[1] > this.i) mouse_moved = 3;
            mouseLast = [this.j,this.i];
            
            current_direction = mouse_moved;
            if (mouseMoved) {
                if (current_direction == 1) map[this.i][this.j - 1].clicked();
                if (current_direction == 2) map[this.i][this.j + 1].clicked();
                if (current_direction == 3) map[this.i + 1][this.j].clicked();
                if (current_direction == 4) map[this.i - 1][this.j].clicked();
            }

            mouseMoved = true;
        }

        

        this.clicked();
    }
    clicked() {

        if (select !== 'delete' && select !== 'copy' && select !== 'cut' && select !== 'space' && select !== '`' && select !== '>' && select !== '<') {
            this.reform(select);
            this.different = true;
            this.updateComp();
        } else if (select == 'delete') {
            
            if (selectCells.length === 1) selectCells.push( [this.i,this.j] );
            if (selectCells.length === 0) selectCells.push( [this.i,this.j] );
            if (selectCells.length === 2) {
                let x1 = selectCells[0][1],
                    x2 = selectCells[1][1],
                    y1 = selectCells[0][0],
                    y2 = selectCells[1][0];
                

                select = 1;
                for (let i = 0; i < y2-y1 + 1; i++) {
                    for (let j = 0; j < x2-x1 + 1; j++) {
                        map[y1 + i][x1 + j].clicked(); //i - j
                    }
                }
                select = select1;
            }
        } else if (select == 'cut') {
            if (selectCells.length === 2) {
                selectCells.push( [this.i,this.j] );
                let x1 = selectCells[0][1],
                    x2 = selectCells[1][1],
                    y1 = selectCells[0][0],
                    y2 = selectCells[1][0];

                for (let i = 0; i < y2-y1 + 1; i++) {
                    copyMap.push([]);
                    for (let j = 0; j < x2 - x1 + 1; j++) {
                        copyMap[i].push( [map[y1 + i][x1 + j].parts.number, map[y1 + i][x1 + j].direction] );
                    }
                }
            }
            if (selectCells.length === 1) selectCells.push( [this.i,this.j] );
            if (selectCells.length === 0) selectCells.push( [this.i,this.j] );
            if (selectCells.length === 3) {
                let x1 = selectCells[0][1],
                    x2 = selectCells[1][1],
                    y1 = selectCells[0][0],
                    y2 = selectCells[1][0],
                    x3 = selectCells[2][1],
                    y3 = selectCells[2][0];

                select = 1;
                for (let i = 0; i < y2-y1 + 1; i++) {
                    for (let j = 0; j < x2-x1 + 1; j++) {
                        map[y1 + i][x1 + j].clicked(); //i - j
                    }
                }

                for (let i = 0; i < y2-y1 + 1; i++) {
                    for (let j = 0; j < x2-x1 + 1; j++) {
                        select = copyMap[i][j][0];
                        current_direction = copyMap[i][j][1];
                        map[y3 + i][x3 + j].clicked(); //i - j
                    }
                }
                
                
                select = select1;
                current_direction = old_direction;
            }
        } else if (select == 'copy') {
            if (selectCells.length === 2) {
                selectCells.push( [this.i,this.j] )
                let x1 = selectCells[0][1],
                    x2 = selectCells[1][1],
                    y1 = selectCells[0][0],
                    y2 = selectCells[1][0];

                for (let i = 0; i < y2-y1 + 1; i++) {
                    copyMap.push([]);
                    for (let j = 0; j < x2 - x1 + 1; j++) {
                        copyMap[i].push( [map[y1 + i][x1 + j].parts.number, map[y1 + i][x1 + j].direction] );
                    }
                }
            }
            if (selectCells.length === 1) selectCells.push( [this.i,this.j] );
            if (selectCells.length === 0) selectCells.push( [this.i,this.j] );
            if (selectCells.length === 3) {
                let x1 = selectCells[0][1],
                    x2 = selectCells[1][1],
                    y1 = selectCells[0][0],
                    y2 = selectCells[1][0],
                    x3 = selectCells[2][1],
                    y3 = selectCells[2][0];
                for (let i = 0; i < y2-y1 + 1; i++) {
                    for (let j = 0; j < x2-x1 + 1; j++) {
                        select = copyMap[i][j][0];
                        current_direction = copyMap[i][j][1];
                        map[y3 + i][x3 + j].clicked(); //i - j
                    }
                }
                
                select = 'copy';
                selectCells = [[y1,x1],[y2,x2]];
                current_direction = old_direction;
            }
        } else if (select === 'space') {
            select = select1;
            let x1 = lastCell[0],
                x2 = this.j,
                y1 = lastCell[1],
                y2 = this.i,
                uy1 = y1,uy2 = y2,ux1 = x1,ux2 = x2;
            if (y2 < y1) {
                uy2 = y1;
                uy1 = y2; 
            }
            if (x2 < x1) {
                ux2 = x1;
                ux1 = x2; 
            }

            for (let i = 0; i < uy2-uy1 + 1; i++) {
                for (let j = 0; j < ux2-ux1 + 1; j++) {
                    map[uy1 + i][ux1 + j].clicked(); //i - j
                }
            }
            lastCell = [this.j,this.i];
            
        } else if (select === '`') {
            select = this.parts.number;
        } else if (select === '>') {
            if (selectCells.length === 1) selectCells.push( [this.i,this.j] );
            if (selectCells.length === 0) selectCells.push( [this.i,this.j] );
            if (selectCells.length === 2) {
                let a = setInterval(function() {
                    if (mouseDown == false) {
                        let x1 = selectCells[0][1],
                            x2 = selectCells[1][1],
                            y1 = selectCells[0][0],
                            y2 = selectCells[1][0];
                        
                        for (let i = 0; i < y2-y1 + 1; i++) {
                            copyMap.push([]);
                            for (let j = 0; j < x2 - x1 + 1; j++) {
                                copyMap[i].push( [map[y1 + i][x1 + j].parts.number, map[y1 + i][x1 + j].direction] );
                            }
                        }
                        let txt = copyMap.toString();
                        txt = (y2-y1+1) + ',' + (x2-x1+1) + ',' + txt;

                        let old = getArr('modules',[]);
                        
                        select = select1;
                        updateSelectedEle();
                        let ab = prompt('Name the Module');
                        if (ab) {
                            old.push(ab + ',' + txt)
                            saveArr(old,'modules');
                        }
                        mouseDown = false;
                        //
                        clearInterval(a);
                    }
                },0);
            }
        } else if (select === '<') {
            let posY = this.i;
            let posX = this.j;

            for (let i = 0; i <  len1; i++) {
                for (let j = 0; j < len2; j++) {
                    select = copyMap[i][j][0];
                    current_direction = copyMap[i][j][1];
                    map[posY + i][posX + j].clicked(); //i - j
                }
            }

            select = '<';
        }

        updateSelectedEle();
    }
    updateComp() {
            /*
            DIRECTION:
            1 = right
            2 = left
            3 = up
            4 = down
            */
            let powered = 0;
            let all = [[0,1,1,2,0,2],[0,-1,2,1,0,-2],[-1,0,3,4,-2,0],[1,0,4,3,2,0]];//[i,j,location,direction]
            for (let i = 0; i < all.length; i++) {
                if (this.j < size - 1 && this.j > 0 && this.i > 0 && this.i < size - 1) {
                    //POWER TYPES
                    if (this.parts.power_type == 'all') {
                        all[i][3] = map[this.i + all[i][0]][this.j + all[i][1]].direction;
                    }
                    //SETTING POWER
                    if ($('i' +  (this.i + all[i][0]) + 'j' + (this.j + all[i][1]))) {
                        if (map[this.i + all[i][0]][this.j + all[i][1]].parts.power_type !== 'jump' || this.parts.power_type == 'all') {
                            if(map[this.i + all[i][0]][this.j + all[i][1]].powered && map[this.i + all[i][0]][this.j + all[i][1]].parts.on_power) {
                                map[this.i + all[i][0]][this.j + all[i][1]].cpower = map[this.i + all[i][0]][this.j + all[i][1]].parts.on_power.power;
                            } else {
                                if (map[this.i + all[i][0]][this.j + all[i][1]].keyDown) {
                                    map[this.i + all[i][0]][this.j + all[i][1]].cpower = map[this.i + all[i][0]][this.j + all[i][1]].parts.key.power;
                                } else
                                    map[this.i + all[i][0]][this.j + all[i][1]].cpower = map[this.i + all[i][0]][this.j + all[i][1]].parts.power;
                            }
                        }
                    }
                    if ($('i' +  (this.i + all[i][4]) + 'j' + (this.j + all[i][5]))) {
                        if (map[this.i + all[i][4]][this.j + all[i][5]].parts.power_type == 'jump') {
                            if(map[this.i + all[i][4]][this.j + all[i][5]].powered && map[this.i + all[i][4]][this.j + all[i][5]].parts.on_power) {
                                map[this.i + all[i][4]][this.j + all[i][5]].cpower = map[this.i + all[i][4]][this.j + all[i][5]].parts.on_power.power;
                            } else {
                                if (map[this.i + all[i][4]][this.j + all[i][5]].keyDown) {
                                    map[this.i + all[i][4]][this.j + all[i][5]].cpower = map[this.i + all[i][4]][this.j + all[i][5]].parts.key.power;
                                } else
                                    map[this.i + all[i][4]][this.j + all[i][5]].cpower = map[this.i + all[i][4]][this.j + all[i][5]].parts.power;
                            }
                        }
                    }
                    //CHECKING IF POWERED
                    if ($('i' +  (this.i + all[i][0]) + 'j' + (this.j + all[i][1]))) {
                        if (map[this.i + all[i][0]][this.j + all[i][1]].parts.power_type !== 'jump' || this.parts.power_type == 'all') {
                            if (this.direction != all[i][2] && map[this.i + all[i][0]][this.j + all[i][1]].direction == all[i][3]) {//If I'm not pointing at him and he is pointing at me
                                if (map[this.i + all[i][0]][this.j + all[i][1]].cpower) {  //If he has power
                                    powered++;
                                }
                            }
                        }
                    }
                    if ($('i' +  (this.i + all[i][4]) + 'j' + (this.j + all[i][5]))) {
                        if (map[this.i + all[i][4]][this.j + all[i][5]].parts.power_type === 'jump') {
                            if (this.direction != all[i][2] && map[this.i + all[i][4]][this.j + all[i][5]].direction == all[i][3]) {//If I'm not pointing at him and he is pointing at me
                                if (map[this.i + all[i][4]][this.j + all[i][5]].cpower) {  //If he has power
                                    powered++;
                                }
                            }
                        }
                    }  
                }
            }
           
           
            if (powered >= this.parts.power_need) {
                if (this.powered == false) this.different = true;
                this.powered = true;
                if (this.parts.on_power)
                    if (this.parts.on_power.color) $('i' + this.i + 'j' + this.j).style.background = this.parts.on_power.color;
            } else {
                if (this.powered == true) this.different = true;
                this.powered = false;
                $('i' + this.i + 'j' + this.j).style.background = this.parts.color;
                if (this.keyDown) {
                    if (this.parts.key.color) $('i' + this.i + 'j' + this.j).style.background = this.parts.key.color;
                }
            }

            if (this.different) {
                this.different = false;
                if ($('i' + (this.i - 1) + 'j' + (this.j))) map[this.i - 1][this.j].updateComp();
                if ($('i' + (this.i + 1) + 'j' + (this.j))) map[this.i + 1][this.j].updateComp();
                if ($('i' + (this.i) + 'j' + (this.j - 1))) map[this.i][this.j - 1].updateComp();
                if ($('i' + (this.i) + 'j' + (this.j + 1))) map[this.i][this.j + 1].updateComp();

                if ($('i' + (this.i - 2) + 'j' + (this.j))) map[this.i - 2][this.j].updateComp();
                if ($('i' + (this.i + 2) + 'j' + (this.j))) map[this.i + 2][this.j].updateComp();
                if ($('i' + (this.i) + 'j' + (this.j - 2))) map[this.i][this.j - 2].updateComp();
                if ($('i' + (this.i) + 'j' + (this.j + 2))) map[this.i][this.j + 2].updateComp();
            }
    }
}



for (let i = 0; i < size; i++) {
    map.push( [] );
    for (let j = 0; j < size; j++) {
        map[i].push( [] );
    }
}

let grid = new table(size,size,function(cell,i,j) {
    cell.style.width = '20px';
    cell.style.height = '20px';
    cell.i = i;
    cell.j = j;
    cell.draggable = false;
    cell.id = 'i' + i + 'j' + j;
    cell.type = select;
    map[i][j] = new componant(select,i,j);
    cell.onmousedown = function() {
        map[this.i][this.j].saveUndo();
    }
    cell.onmouseover = function() {
        if (mouseDown) map[this.i][this.j].saveUndo();
    }
},$('grid'));

document.body.addEventListener('keydown',function(e) {
    for (let i = 0; i < parts.length; i++) {
        if (e.key == parts[i].number) select = parts[i].number;
    }
    if (e.key == 'ArrowUp') current_direction = 3;
    if (e.key == 'ArrowDown') current_direction = 4;
    if (e.key == 'ArrowRight') current_direction = 1;
    if (e.key == 'ArrowLeft') current_direction = 2;

    for (let i = 0; i < allKeys.length; i++) {
        if (e.key == allKeys[i].part.key) {
            if (map[allKeys[i].i][allKeys[i].j].keyDown == false) map[allKeys[i].i][allKeys[i].j].different = true;
            map[allKeys[i].i][allKeys[i].j].keyDown = true;
            map[allKeys[i].i][allKeys[i].j].updateComp();
        }
    }

    if ((window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)  && e.key == 'd') {
        e.preventDefault();
        selectCells = [];
        select1 = select;
        old_direction = current_direction;
        select = 'delete';
    }
    if ((window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)  && e.key == 'c') {
        e.preventDefault();
        selectCells = [];
        select1 = select;
        old_direction = current_direction;
        copyMap = [];
        select = 'copy';
    }
    if ((window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)  && e.key == 'x') {
        e.preventDefault();
        selectCells = [];
        select1 = select;
        old_direction = current_direction;
        copyMap = [];
        select = 'cut';
    }
    if ((window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)  && e.key == 'z') {
        e.preventDefault();
        
        if (saves.length > 0) {
            loadMap('load' + ',' + saves[saves.length - 1]);
            saves.pop();
        }
    }
    if (e.key == ' ') {
        if (lastCell) {
            select1 = select;
            select = 'space';
        }
    }
    if (e.key == '`') {
        select = '`';
    }
    if (e.key == '>') {
        selectCells = [];
        select1 = select;
        copyMap = [];
        select = '>';
    }
    if (e.key == '<') {
        let myTxt = prompt('Enter your module');
        if (myTxt) {
            let arr = myTxt.split(',');
            len1 = arr[0];
            len2 = arr[1];
            arr.shift();
            arr.shift();
            copyMap = [];
            let char = 0;
            for (let i = 0; i < len1; i++) {
                copyMap.push( [] );
                for (let j = 0; j < len2; j++) {
                    copyMap[i].push([arr[char],arr[char + 1]]);
                    char += 2;
                }
            }

            select = '<';
        }
    }
    updateSelectedEle();
});
document.body.addEventListener('keyup',function(e) {
    for (let i = 0; i < allKeys.length; i++) {
        if (e.key == allKeys[i].part.key) {
            if (map[allKeys[i].i][allKeys[i].j].keyDown == true) map[allKeys[i].i][allKeys[i].j].different = true;
            map[allKeys[i].i][allKeys[i].j].keyDown = false;
            map[allKeys[i].i][allKeys[i].j].updateComp();
        }
    }
})

function findType(num) {
    for (let i = 0; i < parts.length; i++) {
        if (parts[i].number == num) return parts[i];
    }
}

document.addEventListener("keydown", function(e) {
    if ((window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)  && e.keyCode == 83) {
        e.preventDefault();
        saveMap();
    }
    if ((window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)  && e.key == 'v') {
        e.preventDefault();
        loadMap();
    }
}, false);

function getSave() {
    var txt = '';
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            txt += map[i][j].parts.number + ',' + map[i][j].direction + ',';
        }
    }
    return txt.slice(0,txt.length - 1);
}

function saveMap() {
    txt = getSave();
    let old = getArr('saves',[]);
    old.push(prompt('Name the Save') + ',' + txt)
    saveArr(old,'saves');
}
function loadMap(exe) {
    let newMap;
    if (exe) newMap = exe.split(',');
    else newMap = prompt('Paste in your map:').split(',');

    let useMap = [];
    let char = 1;
    for (let i = 0; i < size; i++) {
        useMap.push([]);
        for (let j = 0; j < size; j++) {
            useMap[i].push([newMap[char],newMap[char + 1]]);
            char += 2;
        }
    }
    //For when I add a title
    let title = newMap[0];
     
    map = [];
    for (let i = 0; i < size; i++) {
        map.push( [] );
        for (let j = 0; j < size; j++) {
            map[i].push( [] );
        }
    }

    $('grid').innerHTML = '';
    let grid = new table(size,size,function(cell,i,j) {
        cell.style.width = '20px';
        cell.style.height = '20px';
        cell.i = i;
        cell.j = j;
        cell.draggable = false;
        cell.id = 'i' + i + 'j' + j;
        cell.type = useMap[i][j][0];
        map[i][j] = new componant(useMap[i][j][0],i,j);
        map[i][j].direction = useMap[i][j][1];
        let oldInfo = current_direction;
        current_direction = useMap[i][j][1];
        map[i][j].reform(useMap[i][j][0]);
        current_direction = oldInfo;
        cell.onmousedown = function() {
            map[this.i][this.j].saveUndo();
        }
        cell.onmouseover = function() {
            if (mouseDown) map[this.i][this.j].saveUndo();
        }
    },$('grid'));

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            map[i][j].updateComp();
        }
    }
}

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);


function openPU(str) {
    hidePU();
    let row, cell;
    switch(str) {
        case 'save':
            $('list').innerHTML = '';
            $('savesPU').show();
            let myArr = getArr('saves','');
            for (let i = 0; i < myArr.length; i++) {
                if (myArr[i] !== '') {
                    let row = $('list').insertRow(0);
                    let cell;
                    let useArr = myArr[i].split(',');
                    let useName = useArr[0];
                    let usePaste = useArr;

                    cell = row.insertCell(0);
                    cell.CLASS('saverGet').ID(useName).html('Get Code').onclick = function() {
                        let a = getArr('saves');
                        for (let i = 0; i < a.length; i++) {
                            let b = a[i].split(',')[0];
                            if (b == this.id) {
                                toCut = i;
                            }

                        }
                        let txt = a[i].toString();
                        let myWindow = window.open();
                        myWindow.document.write(`
                            <head><title>Save Progress</title></head>
                            <p id='hey' style="word-wrap: break-word;">${txt}</p>
                            <script>
                                function selectText(node) {
                                    node = document.getElementById(node);
                            
                                    if (document.body.createTextRange) {
                                        const range = document.body.createTextRange();
                                        range.moveToElementText(node);
                                        range.select();
                                    } else if (window.getSelection) {
                                        const selection = window.getSelection();
                                        const range = document.createRange();
                                        range.selectNodeContents(node);
                                        selection.removeAllRanges();
                                        selection.addRange(range);
                                    } else {
                                        console.warn("Could not select text in node: Unsupported browser.");
                                    }
                                }
                                selectText('hey');
                            </script>
                        `);
                        saveArr(a,'saves');
                        hidePU();
                    }

                    cell = row.insertCell(0);
                    let toCut = false;
                    cell.CLASS('saverOut').ID(useName).html('Delete').onclick = function() {
                        let a = getArr('saves');
                        for (let i = 0; i < a.length; i++) {
                            let b = a[i].split(',')[0];
                            if (b == this.id) {
                                toCut = i;
                            }

                        }
                        
                        a.splice(toCut,1);
                        saveArr(a,'saves');
                        hidePU();
                        openPU('save');
                    }
                    cell = row.insertCell(0);

                    cell.ID('saver' + usePaste).CLASS('tableChild').html(useName).onclick = function() {
                        let a = this.id.letters(5,this.id.length - 1);
                        loadMap(a);
                        hidePU();
                    };
                }
            }
            row = $('list').insertRow(0);
            cell = row.insertCell(0);
            
            cell.innerHTML = 'Saves:';
            cell.style.fontWeight = 'bold';
            cell.style.fontSize = '25px';
            cell.style.lineHeight = '50px';
            break;
        case 'module':
                $('list').innerHTML = '';
                $('savesPU').show();
                let myArr2 = getArr('modules','');
                for (let i = 0; i < myArr2.length; i++) {
                    if (myArr2[i] !== '') {
                        let row = $('list').insertRow(0);
                        let cell;
                        let useArr = myArr2[i].split(',');
                        let useName = useArr[0];
                        let usePaste = useArr;

                        cell = row.insertCell(0);
                        cell.CLASS('saverGet').ID(useName).html('Get Code').onclick = function() {
                            let a = getArr('modules');
                            for (let i = 0; i < a.length; i++) {
                                let b = a[i].split(',')[0];
                                if (b == this.id) {
                                    toCut = i;
                                }

                            }
                            let txt = a[i].toString();
                            let myWindow = window.open();
                            myWindow.document.write(`
                                <head><title>New Module</title></head>
                                <p id='hey' style="word-wrap: break-word;">${txt}</p>
                                <script>
                                    function selectText(node) {
                                        node = document.getElementById(node);
                                
                                        if (document.body.createTextRange) {
                                            const range = document.body.createTextRange();
                                            range.moveToElementText(node);
                                            range.select();
                                        } else if (window.getSelection) {
                                            const selection = window.getSelection();
                                            const range = document.createRange();
                                            range.selectNodeContents(node);
                                            selection.removeAllRanges();
                                            selection.addRange(range);
                                        } else {
                                            console.warn("Could not select text in node: Unsupported browser.");
                                        }
                                    }
                                    selectText('hey');
                                </script>
                            `);
                            saveArr(a,'modules');
                            hidePU();
                        }

                        cell = row.insertCell(0);
                        let toCut = false;
                        cell.CLASS('saverOut').ID(useName).html('Delete').onclick = function() {
                            let a = getArr('modules');
                            for (let i = 0; i < a.length; i++) {
                                let b = a[i].split(',')[0];
                                if (b == this.id) {
                                    toCut = i;
                                }

                            }
                            
                            a.splice(toCut,1);
                            saveArr(a,'modules');
                            hidePU();
                            openPU('module');
                        }
                        cell = row.insertCell(0);

                        cell.ID('saver' + usePaste).CLASS('tableChild').html(useName).onclick = function() {
                            let a = this.id.letters(5,this.id.length - 1);
                            let arr = a.split(',');
                            len1 = arr[1];
                            len2 = arr[2];
                            arr.shift();
                            arr.shift();
                            arr.shift();
                            copyMap = [];
                            let char = 0;
                            for (let i = 0; i < len1; i++) {
                                copyMap.push( [] );
                                for (let j = 0; j < len2; j++) {
                                    copyMap[i].push([arr[char],arr[char + 1]]);
                                    char += 2;
                                }
                            }
                
                            select = '<';
                            
                            updateSelectedEle();
                            hidePU();
                        };
                    }
                    
                }

                row = $('list').insertRow(0);
                cell = row.insertCell(0);
                
                cell.innerHTML = 'Modules:';
                cell.style.fontWeight = 'bold';
                cell.style.fontSize = '25px';
                cell.style.lineHeight = '50px';
                break;
        case 'shortcuts':
            $('list').innerHTML = '';
            $('savesPU').show();


            row = $('list').insertRow(0);
            cell = row.insertCell(0);
            cell.innerHTML = 'Have a saved text module? Load it here!';

            cell = row.insertCell(0);
            cell.innerHTML = 'Shift-< (Load Module)' 
            cell.style.fontWeight = 'bold';

            ///////
            
            row = $('list').insertRow(0);
            cell = row.insertCell(0);
            cell.innerHTML = 'Select two points to save as a module for future use!';

            cell = row.insertCell(0);
            cell.innerHTML = 'Shift-> (Save Module)' 
            cell.style.fontWeight = 'bold';

            ///////
            
            row = $('list').insertRow(0);
            cell = row.insertCell(0);
            cell.innerHTML = 'Have a saved text file? Paste it here!';

            cell = row.insertCell(0);
            cell.innerHTML = 'Control-V (Load File)' 
            cell.style.fontWeight = 'bold';

            ///////
            
            row = $('list').insertRow(0);
            cell = row.insertCell(0);
            cell.innerHTML = 'Save and name your file for later :)';

            cell = row.insertCell(0);
            cell.innerHTML = 'Control-S (Save)' 
            cell.style.fontWeight = 'bold';

            ///////

            row = $('list').insertRow(0);
            cell = row.insertCell(0);
            cell.innerHTML = 'Before pressing space click on one cell, then press space and select another cell. Everything and between will turn into that cell.';

            cell = row.insertCell(0);
            cell.innerHTML = 'Space Bar (Fill)' 
            cell.style.fontWeight = 'bold';

            ///////
            
            row = $('list').insertRow(0);
            cell = row.insertCell(0);
            cell.innerHTML = "Hold down Alt and drag with the mouse over cells. No need to switch direction, it will do it itself";

            cell = row.insertCell(0);
            cell.innerHTML = 'Alt (Auto-Direction)' 
            cell.style.fontWeight = 'bold';

            ////////

            row = $('list').insertRow(0);
            cell = row.insertCell(0);
            cell.innerHTML = 'Made a mistake? Just undo it.';

            cell = row.insertCell(0);
            cell.innerHTML = 'Control-Z (Undo)' 
            cell.style.fontWeight = 'bold';

            ///////
            
            row = $('list').insertRow(0);
            cell = row.insertCell(0);
            cell.innerHTML = 'Click on two places in the grid to delete those cells.';

            cell = row.insertCell(0);
            cell.innerHTML = 'Control-D (Delete)' 
            cell.style.fontWeight = 'bold';

            ///////
            
            row = $('list').insertRow(0);
            cell = row.insertCell(0);
            cell.innerHTML = 'Click on two places in the grid to cut the selected cells. Then place wherever to place the cut.';

            cell = row.insertCell(0);
            cell.innerHTML = 'Control-X (Cut)' 
            cell.style.fontWeight = 'bold';

            ////////

            row = $('list').insertRow(0);
            cell = row.insertCell(0);
            cell.innerHTML = 'Click on two places in the grid to copy the selected cells. Then place wherever to place the copy.';

            cell = row.insertCell(0);
            cell.innerHTML = 'Control-C (Copy)' 
            cell.style.fontWeight = 'bold';
            
            ////////

            row = $('list').insertRow(0);
            cell = row.insertCell(0);

            cell.innerHTML = 'Shortcuts:';
            cell.style.fontWeight = 'bold';
            cell.style.fontSize = '25px';
            cell.style.lineHeight = '50px';

            break;
        case 'controls':
            $('list').innerHTML = '';
            $('savesPU').show();

            row = $('list').insertRow(0);
            cell = row.insertCell(0);
            cell.innerHTML = 'Press on a cell in the grid to switch it to the selected cell.';

            cell = row.insertCell(0);
            cell.innerHTML = 'Click (-_-)' 
            cell.style.fontWeight = 'bold';
                
            ///////
            
            row = $('list').insertRow(0);
            cell = row.insertCell(0);
            cell.innerHTML = 'Press shift and then any letter to select that button. When you press that key that button will power on.';

            cell = row.insertCell(0);
            cell.innerHTML = 'Shift-Letter (Select+)' 
            cell.style.fontWeight = 'bold';
                
            ///////

            row = $('list').insertRow(0);
            cell = row.insertCell(0);
            cell.innerHTML = 'Use the number keys to select different cell types.';

            cell = row.insertCell(0);
            cell.innerHTML = 'Numbers (Select)' 
            cell.style.fontWeight = 'bold';
                
            ///////
            
            row = $('list').insertRow(0);
            cell = row.insertCell(0);
            cell.innerHTML = 'Use the keys to swtich the direction of the selected cell.';

            cell = row.insertCell(0);
            cell.innerHTML = 'Arrow Keys (Direction)' 
            cell.style.fontWeight = 'bold';
                
            ///////

            row = $('list').insertRow(0);
            cell = row.insertCell(0);
            
            cell.innerHTML = 'Controls:';
            cell.style.fontWeight = 'bold';
            cell.style.fontSize = '25px';
            cell.style.lineHeight = '50px';
            break;
    }
}
function hidePU() {
    $('savesPU').hide();
}

function updateSelectedEle() {
    let ele = $('so_cube');
    $('so_name').innerHTML = '';
    if (!ele) ele = $('so_cube2');
    if (select !== '<' && select !== 'delete' && select !== 'copy' && select !== 'cut' && select !== '>') {
        let a = findType(select);
        ele.style.background = a.color;
        ele.innerHTML = '';
        ele.id = 'so_cube';
        $('so_name').innerHTML = a.name;
        $('selectedCell').className = 'showOff';
        if (a.text == 'direction') {
            if (current_direction == 1) ele.innerHTML = '>';
            if (current_direction == 2) ele.innerHTML = '<';
            if (current_direction == 3) ele.innerHTML = '^';
            if (current_direction == 4) ele.innerHTML = 'v';
        } else if (a.text == 'key' ) {
            $('so_name').innerHTML = a.key.key + ' key';
            if (current_direction == 1) ele.innerHTML = a.key.key + '>';
            if (current_direction == 2) ele.innerHTML = a.key.key + '<';
            if (current_direction == 3) ele.innerHTML = a.key.key + '^';
            if (current_direction == 4) ele.innerHTML = a.key.key + 'v';
            
        }
    } else if (select == '<') {
        ele.innerHTML = 'Module';
        $('selectedCell').className = 'showOff2';
        ele.style.background = 'lightskyblue';
        ele.id = 'so_cube2';
    } else if (select == 'delete') {
        if (selectCells.length == 0) {
            $('selectedCell').className = 'showOff2';
            ele.id = 'so_cube2';
            ele.style.background = 'lightskyblue';
            ele.innerHTML = 'DELETE: Select Point A';
        }
        if (selectCells.length == 1) {
            $('selectedCell').className = 'showOff2';
            ele.id = 'so_cube2';
            ele.style.background = 'lightskyblue';
            ele.innerHTML = 'DELETE: Select Point B';
        }
    } else if (select == 'copy') {
        if (selectCells.length == 0) {
            $('selectedCell').className = 'showOff2';
            ele.id = 'so_cube2';
            ele.style.background = 'lightskyblue';
            ele.innerHTML = 'COPY: Select Point A';
        }
        if (selectCells.length == 1) {
            $('selectedCell').className = 'showOff2';
            ele.id = 'so_cube2';
            ele.style.background = 'lightskyblue';
            ele.innerHTML = 'COPY: Select Point B';
        }
        if (selectCells.length > 1) {
            $('selectedCell').className = 'showOff2';
            ele.id = 'so_cube2';
            ele.style.background = 'lightskyblue';
            ele.innerHTML = 'COPY: Place down copy';
        }
    } else if (select == 'cut') {
        if (selectCells.length == 0) {
            $('selectedCell').className = 'showOff2';
            ele.id = 'so_cube2';
            ele.style.background = 'lightskyblue';
            ele.innerHTML = 'CUT: Select Point A';
        }
        if (selectCells.length == 1) {
            $('selectedCell').className = 'showOff2';
            ele.id = 'so_cube2';
            ele.style.background = 'lightskyblue';
            ele.innerHTML = 'CUT: Select Point B';
        }
        if (selectCells.length > 1) {
            $('selectedCell').className = 'showOff2';
            ele.id = 'so_cube2';
            ele.style.background = 'lightskyblue';
            ele.innerHTML = 'CUT: Place down cut';
        }
    } else if (select == '>') {
        if (selectCells.length == 0) {
            $('selectedCell').className = 'showOff2';
            ele.id = 'so_cube2';
            ele.style.background = 'lightskyblue';
            ele.innerHTML = 'SAVE MODULE: Point A';
        }
        if (selectCells.length == 1) {
            $('selectedCell').className = 'showOff2';
            ele.id = 'so_cube2';
            ele.style.background = 'lightskyblue';
            ele.innerHTML = 'SAVE MODULE: Point B';
        }
    }
}

let side_table = $('.leftBar2');
for (let i = 0; i < parts.length; i++) {
    let a = findType(i);
    if (a) {
        let cell = side_table.create('div');
        cell.className = 'sideTableCell';
        cell.style.background = a.color;
        cell.id = 'selector' + i;
        cell.innerHTML = a.name;
        cell.onclick = function() {
            select = this.id.letters(8,this.id.length);
            updateSelectedEle();
        }
    }
}
