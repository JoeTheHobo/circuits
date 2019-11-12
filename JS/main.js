var size = 30;

var allKeys = [];
var mouseDown = false;
document.body.onmousedown = () => { mouseDown = true }
document.body.onmouseup = () => { mouseDown = false }

var select = 1;
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
    }
    clicked() {
        this.reform(select);
        this.different = true;
        this.updateComp();
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
        map[this.i][this.j].clicked();
    }
    cell.onmouseover = function() {
        if (mouseDown) map[this.i][this.j].clicked();
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

function saveMap() {
    var txt = '';
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            txt += map[i][j].parts.number + ',' + map[i][j].direction + ',';
        }
    }
    let myWindow = window.open();
    myWindow.document.write(`
        <head><title>Save Progress</title></head>
        <p id='hey' style="word-wrap: break-word;">${txt.slice(0,txt.length - 1)}</p>
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
}
function loadMap() {
    let newMap = prompt('Paste in your map:').split(',');
    let useMap = [];
    let char = 0;
    for (let i = 0; i < size; i++) {
        useMap.push([]);
        for (let j = 0; j < size; j++) {
            useMap[i].push([newMap[char],newMap[char + 1]]);
            char += 2;
        }
    }

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
            map[this.i][this.j].clicked();
        }
        cell.onmouseover = function() {
            if (mouseDown) map[this.i][this.j].clicked();
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