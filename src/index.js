const ship = (length) => {

    let health = length;
    let sunk = false;

    const hit = () => {

        health -= 1;

        if(health <= 0) {

            Sunk();
        }
    };

    const Sunk = () => {

        sunk = true;
    };

    const isSunk = () => {

        return sunk;
    }

    return { hit, Sunk, isSunk };
};

const gameBoard = () => {

    let playerShips = [];
    let aiShips = [];
    
    let playerShipCount = 0;
    let aiShipCount = 0;

    const placeShip = (player, shipType, coord, horizontal = 0, vertical = 0) => {

        let coords = [];

        if(player === 'player') {

            switch(shipType) {

                case 'carrier':
                    let carrier = ship(5);
                    coords = [];
                    for(let i = 0; i < 5; i++) {

                        let target_x = parseInt(coord.x) + horizontal * i;
                        let target_y = parseInt(coord.y) + vertical * i;
                        coords.push({ 'x': target_x, 'y': target_y });
                    }
                    playerShips.push({ 'ship': carrier, 'coords': coords });
                    break;

                case 'battleship':
                    let battleship = ship(4);
                    coords = [];
                    for(let i = 0; i < 4; i++) {

                        let target_x = parseInt(coord.x) + horizontal * i;
                        let target_y = parseInt(coord.y) + vertical * i;
                        coords.push({ 'x': target_x, 'y': target_y });
                    }
                    playerShips.push({ 'ship': battleship, 'coords': coords });
                    break;

                case 'destroyer':
                    let destroyer = ship(3);
                    coords = [];
                    for(let i = 0; i < 3; i++) {

                        let target_x = parseInt(coord.x) + horizontal * i;
                        let target_y = parseInt(coord.y) + vertical * i;
                        coords.push({ 'x': target_x, 'y': target_y });
                    }
                    playerShips.push({ 'ship': destroyer, 'coords': coords });
                    break;

                case 'submarine':
                    let submarine = ship(3);
                    coords = [];
                    for(let i = 0; i < 3; i++) {

                        let target_x = parseInt(coord.x) + horizontal * i;
                        let target_y = parseInt(coord.y) + vertical * i;
                        coords.push({ 'x': target_x, 'y': target_y });
                    }
                    playerShips.push({ 'ship': submarine, 'coords': coords });
                    break;

                case 'patrol':
                    let patrol = ship(2);
                    coords = [];
                    for(let i = 0; i < 2; i++) {

                        let target_x = parseInt(coord.x) + horizontal * i;
                        let target_y = parseInt(coord.y) + vertical * i;
                        coords.push({ 'x': target_x, 'y': target_y });
                    }
                    playerShips.push({ 'ship': patrol, 'coords': coords });
                    break;

            }
            playerShipCount++;
        }
        else {
            
            switch(shipType) {

                case 'carrier':
                    let carrier = ship(5);
                    coords = [];
                    for(let i = 0; i < 5; i++) {

                        let target_x = parseInt(coord.x) + horizontal * i;
                        let target_y = parseInt(coord.y) + vertical * i;
                        coords.push({ 'x': target_x, 'y': target_y });
                    }
                    aiShips.push({ 'ship': carrier, 'coords': coords });
                    break;

                case 'battleship':
                    let battleship = ship(4);
                    coords = [];
                    for(let i = 0; i < 4; i++) {

                        let target_x = parseInt(coord.x) + horizontal * i;
                        let target_y = parseInt(coord.y) + vertical * i;
                        coords.push({ 'x': target_x, 'y': target_y });
                    }
                    aiShips.push({ 'ship': battleship, 'coords': coords });
                    break;

                case 'destroyer':
                    let destroyer = ship(3);
                    coords = [];
                    for(let i = 0; i < 3; i++) {

                        let target_x = parseInt(coord.x) + horizontal * i;
                        let target_y = parseInt(coord.y) + vertical * i;
                        coords.push({ 'x': target_x, 'y': target_y });
                    }
                    aiShips.push({ 'ship': destroyer, 'coords': coords });
                    break;

                case 'submarine':
                    let submarine = ship(3);
                    coords = [];
                    for(let i = 0; i < 3; i++) {

                        let target_x = parseInt(coord.x) + horizontal * i;
                        let target_y = parseInt(coord.y) + vertical * i;
                        coords.push({ 'x': target_x, 'y': target_y });
                    }
                    aiShips.push({ 'ship': submarine, 'coords': coords });
                    break;

                case 'patrol':
                    let patrol = ship(2);
                    coords = [];
                    for(let i = 0; i < 2; i++) {

                        let target_x = parseInt(coord.x) + horizontal * i;
                        let target_y = parseInt(coord.y) + vertical * i;
                        coords.push({ 'x': target_x, 'y': target_y });
                    }
                    aiShips.push({ 'ship': patrol, 'coords': coords });
                    break;

            }
            aiShipCount++;
        }
    };

    const receiveAttack = (attacker, coord) => {

        if(attacker === 'player') {

            for(ship_info of aiShips) {

                for(shipCoord of ship_info.coords) {

                    if(coord.x === shipCoord.x && coord.y === shipCoord.y) {

                        // Visual indicator
                        document.querySelector(`.ai.row${coord.y}.col${coord.x}`).setAttribute('style', 'background-color: red');

                        ship_info.ship.hit();
                        if(ship_info.ship.isSunk()) {

                            aiShipCount--;
                        }
                        return true;
                    }
                }
            }
            return false;
        }
        else {

            for(ship_info of playerShips) {

                for(shipCoord of ship_info.coords) {

                    if(coord.x === shipCoord.x && coord.y === shipCoord.y) {

                        // Visual indicator
                        document.querySelector(`.player.row${coord.y}.col${coord.x}`).setAttribute('style', 'background-color: red');

                        ship_info.ship.hit();
                        if(ship_info.ship.isSunk()) {

                            playerShipCount--;
                        }
                        return true;
                    }
                }
            }
            return false;
        }
    };

    const checkOccupied = (board, hoverCoord, length, rotate) => {

        if(board === 'player') {

            for(ship_info of playerShips) {

                for(coord of ship_info.coords) {

                    for(let i = 0; i < length; i++) {

                        let target_x = parseInt(hoverCoord.x) + i*(1 - rotate);
                        let target_y = parseInt(hoverCoord.y) + i*rotate;
                        if(target_x === coord.x && target_y === coord.y) {
                            
                            return true;
                        }
                    }
                }
            }
        }
        else {

            for(ship_info of aiShips) {

                for(coord of ship_info.coords) {

                    for(let i = 0; i < length; i++) {

                        let target_x = parseInt(hoverCoord.x) + i*(1 - rotate);
                        let target_y = parseInt(hoverCoord.y) + i*rotate;
                        if(target_x === coord.x && target_y === coord.y) {
                            
                            return true;
                        }
                    }
                };
            };
        }
        return false;
    };

    const getPlayerCount = () => {

        return playerShipCount;
    };

    const getAICount = () => {

        return aiShipCount;
    };

    return { placeShip, receiveAttack, checkOccupied, getPlayerCount, getAICount };
};

const player = (name = 'AI') => {

    let playerAttackedCoords = [];
    let aiAttackedCoords = [];

    const attack = (coord) => {
        
        if(name === 'AI') {

            for(coords of aiAttackedCoords) {

                if(coord.x === coords.x && coord.y === coords.y)
                {
                    return false;
                }
            }
            // Add hit indicator
            let symb = document.createElement('span');
            symb.setAttribute('class', 'material-icons');
            symb.innerHTML = 'close';
            document.querySelector(`.player.row${coord.y}.col${coord.x}`).appendChild(symb);

            gb.receiveAttack('AI', coord);
            aiAttackedCoords.push(coord);
            return true;
        }
        else if(name === 'player') {

            for(coords of playerAttackedCoords) {

                if(coord.x === coords.x && coord.y === coords.y)
                {
                    return false;
                }
            }
            // Add hit indicator
            let symb = document.createElement('span');
            symb.setAttribute('class', 'material-icons');
            symb.innerHTML = 'close';
            document.querySelector(`.ai.row${coord.y}.col${coord.x}`).appendChild(symb);

            gb.receiveAttack('player', coord);
            playerAttackedCoords.push(coord);
            return true;
        }
        else {

            return false;
        }
    };

    return { attack };
};

const game = (() => {

    let content = document.querySelector('.content');

    // Generate grids in DOM
    let playerBoard = document.createElement('div');
    playerBoard.setAttribute('class', 'playerBoard');
    playerBoard.classList.add('grid');
    let enemyBoard = document.createElement('div');
    enemyBoard.setAttribute('class', 'enemyBoard');
    enemyBoard.classList.add('grid');

    for(let i = 0; i < 7; i++) {

        for(let j = 0; j < 7; j++) {

            let cell = document.createElement('div');
            cell.setAttribute('class', 'player');
            cell.classList.add('cell');
            cell.classList.add('row'+i);
            cell.classList.add('col'+j);
            let cell2 = document.createElement('div');
            cell2.setAttribute('class', 'ai');
            cell2.classList.add('cell');
            cell2.classList.add('row'+i);
            cell2.classList.add('col'+j);

            playerBoard.appendChild(cell);
            enemyBoard.appendChild(cell2);
        }
    }
    let message = document.createElement('p');
    message.setAttribute('class', 'message');
    message.innerHTML = 'Place your carrier.';

    let btn = document.createElement('button');
    btn.setAttribute('class', 'rotateBtn');
    btn.innerHTML = 'Rotate';
    btn.addEventListener('click', () => { rotate(); });

    content.appendChild(playerBoard);
    content.appendChild(enemyBoard);
    document.body.appendChild(message);
    document.body.appendChild(btn);

    // Placing ships
    let shipsPlaced = 0;
    let shipSizes = [5, 4, 3, 3, 2];
    let shipNames = ['carrier', 'battleship', 'destroyer', 'submarine', 'patrol'];

    playerBoard.addEventListener('mouseover', function hover(event) {
        
        clearCells();

        if(event.target.classList.contains('cell')) {

            // Get cell coordinates
            let x = event.target.classList[3].substring(3);
            let y = event.target.classList[2].substring(3);
            
            if((7 - x) >= shipSizes[shipsPlaced]*(1-vertical) && (7 - y) >= shipSizes[shipsPlaced]*vertical && !gb.checkOccupied('player', { 'x': x, 'y': y }, shipSizes[shipsPlaced], vertical)) {

                for(let i = 0; i < shipSizes[shipsPlaced]; i++) {

                    let target_x = parseInt(x) + (i*(1-vertical));
                    let target_y = parseInt(y) + (i*vertical);

                    document.querySelector(`.player.cell.row${target_y}.col${target_x}`).setAttribute('style', 'background-color: green');
                }
            }
            else {
                event.target.setAttribute('style', 'background-color: red');
            }

            // Remove event listener after all ships are placed
            if(shipsPlaced >= 5) {

                clearCells();
                playerBoard.removeEventListener('mouseover', hover);
            }
        }
    });
    playerBoard.addEventListener('mouseleave', function leave() {

        clearCells();

        // Remove event listener after all ships are placed
        if(shipsPlaced >= 5) {

            playerBoard.removeEventListener('mouseleave', leave);
        }
    });
    playerBoard.addEventListener('click', function click(event) {

        if(event.target.classList.contains('cell')) {

            // Get cell coordinates
            let x = event.target.classList[3].substring(3);
            let y = event.target.classList[2].substring(3);
            let coord = { 'x': x, 'y': y };

            if((7 - x) >= shipSizes[shipsPlaced]*(1-vertical) && (7 - y) >= shipSizes[shipsPlaced]*vertical && !gb.checkOccupied('player', coord, shipSizes[shipsPlaced], vertical)) {

                // Show ship placed visually
                for(let i = 0; i < shipSizes[shipsPlaced]; i++) {

                    let target_x = parseInt(x) + (i*(1-vertical));
                    let target_y = parseInt(y) + (i*vertical);
                    let cell = document.querySelector(`.player.cell.row${target_y}.col${target_x}`);
                    cell.setAttribute('style', 'background-color: gray');
                    cell.classList.replace('cell', 'ship');
                }

                gb.placeShip('player', shipNames[shipsPlaced], coord, (1 - vertical), vertical);
                shipsPlaced++;
                clearCells();

                // Update message
                message.innerHTML = `Place your ${shipNames[shipsPlaced]}.`

                // Remove event listener after all ships are placed
                if(shipsPlaced >= 5) {
                    
                    playerBoard.removeEventListener('click', click);

                    // Change cursor type on board
                    playerBoard.setAttribute('style', 'cursor: not-allowed');

                    // Start game cycle
                    gameCycle();
                }
            }
        }
    });
})();

function clearCells() {

    // Unhighlight all cells
    let cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {

        cell.setAttribute('style', 'background-color: white');
    });
}

function placeAIships() {

    // Placing ships
    let shipsPlaced = 0;
    let shipSizes = [5, 4, 3, 3, 2];
    let shipNames = ['carrier', 'battleship', 'destroyer', 'submarine', 'patrol'];
    
    while(shipsPlaced < 5) {

        let vert = Math.round(Math.random());

        let x = Math.floor(Math.random() * (6 - shipSizes[shipsPlaced] * (1 - vert)));
        let y = Math.floor(Math.random() * (6 - shipSizes[shipsPlaced] * vert));
        let coord = { 'x': x, 'y': y };

        if(!gb.checkOccupied('AI', coord, shipSizes[shipsPlaced], vert)) {

            /* Debug 
            console.log((vert === 0)? 'horizontal':'vertical');
            console.log(`x limit ${(6 - shipSizes[shipsPlaced] * (1 - vert))}`);
            console.log(`y limit ${(6 - shipSizes[shipsPlaced] * (vert))}`);
            console.log(`${shipNames[shipsPlaced]} placed at x: ${coord.x} y: ${coord.y}`);

            for(let i = 0; i < shipSizes[shipsPlaced]; i++) {

                let cell = document.querySelector(`.ai.cell.row${y + i * vert}.col${x + i * (1 - vert)}`);
                cell.setAttribute('style', 'background-color: purple');
                cell.classList.replace('cell', 'ship');
            }*/
            // Place ship
            gb.placeShip('AI', shipNames[shipsPlaced], coord, (1 - vert), vert);
            shipsPlaced++;
        }
    }
}

function gameCycle() {

    // Create players
    p1 = player('player');
    p2 = player();

    const turn = {

        Player: 'Player',
        AI: 'AI'
    };

    let message = document.querySelector('.message');
    let current_turn;

    // Give the illusion of delay
    setTimeout(() => {

        // Update message
        message.innerHTML = 'Your turn.';

        // Set turn
        current_turn = turn.Player;
    }, 2000);

    // Update message
    message.innerHTML = 'AI is currently placing their ships...';

    // Place AI ships
    placeAIships();

    // Remove rotate button
    document.querySelector('.rotateBtn').remove();

    // Add event listener
    let aiBoard = document.querySelector('.enemyBoard');

    aiBoard.addEventListener('click', (event) => {

        if(current_turn === turn.Player && event.target.classList.contains('cell'))
        {

            let target_y = parseInt(event.target.classList[2].substring(3));
            let target_x = parseInt(event.target.classList[3].substring(3));
            let coord = { 'x': target_x, 'y': target_y };

            // If player selection is valid
            if(p1.attack(coord)) {

                // Change turn
                current_turn = turn.AI;

                // Update cursor
                aiBoard.setAttribute('style', 'cursor: not-allowed');

                if(gb.getAICount() <= 0) {

                    // Update message
                    message.innerHTML = 'You destroyed all their ships, you win!';
                    return;
                }

                // Update message
                message.innerHTML = 'AI\'s turn...';

                setTimeout(() => {

                    // AI attack
                    let x = Math.floor(Math.random() * 7);
                    let y = Math.floor(Math.random() * 7);
                    let coord = { 'x': x, 'y': y };

                    while(!p2.attack(coord)) {

                        x = Math.floor(Math.random() * 7);
                        y = Math.floor(Math.random() * 7);
                        coord = { 'x': x, 'y': y };
                    }

                    if(gb.getPlayerCount() <= 0) {

                        // Update message
                        message.innerHTML = 'The AI destroyed all your ship, you lose!';
                        return;
                    }
                    else {

                        // Change turn
                        current_turn = turn.Player;

                        // Update message
                        message.innerHTML = 'Your turn.';

                        // Update cursor
                        aiBoard.setAttribute('style', 'cursor: pointer');
                    }
                }, 2000);
            }
        }
    });
    // Update cursor
    aiBoard.setAttribute('style', 'cursor: pointer');
}

let vertical = 0;

function rotate() {

    if(vertical === 0)
        vertical = 1;
    else
        vertical = 0;
};

// Create gameBoard
let gb = gameBoard();