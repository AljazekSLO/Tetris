import React, {useEffect, useState} from 'react'

import Stars from '../components/Stars'

const Game = () => {    

  let canvas, ctx;

  const [startGame, setStartGame] = useState(false);
  const [lostScreen, setLostScreen] = useState(false);

  useEffect(() => {
      playerReset();
      updateScore();
      update();
  }, []);


  function arenaSweep() {
    let rowCount = 1;
    outer: for (let y = arena.length -1; y > 0; --y) {
        for (let x = 0; x < arena[y].length; ++x) {
            if (arena[y][x] === 0) {
                continue outer;
            }
        }

        const row = arena.splice(y, 1)[0].fill(0);
        arena.unshift(row);
        ++y;

        player.score += rowCount * 10;
        rowCount *= 2;

        updateScore();
    }
}

function collide(arena, player) {
  const m = player.matrix;
  const o = player.pos;
  for (let y = 0; y < m.length; ++y) {
      for (let x = 0; x < m[y].length; ++x) {
          if (m[y][x] !== 0 &&
             (arena[y + o.y] &&
              arena[y + o.y][x + o.x]) !== 0) {
              return true;
          }
      }
  }
  return false;
}

  const createMatrix = (w, h) => {
    const matrix = [];
    while (h--) {
      matrix.push(new Array(w).fill(0));
    }
    return matrix;
  }

  const createPiece = (type) =>
  {
      if (type === 'I') {
          return [
              [0, 1, 0, 0],
              [0, 1, 0, 0],
              [0, 1, 0, 0],
              [0, 1, 0, 0],
          ];
      } else if (type === 'L') {
          return [
              [0, 2, 0],
              [0, 2, 0],
              [0, 2, 2],
          ];
      } else if (type === 'J') {
          return [
              [0, 3, 0],
              [0, 3, 0],
              [3, 3, 0],
          ];
      } else if (type === 'O') {
          return [
              [4, 4],
              [4, 4],
          ];
      } else if (type === 'Z') {
          return [
              [5, 5, 0],
              [0, 5, 5],
              [0, 0, 0],
          ];
      } else if (type === 'S') {
          return [
              [0, 6, 6],
              [6, 6, 0],
              [0, 0, 0],
          ];
      } else if (type === 'T') {
          return [
              [0, 7, 0],
              [7, 7, 7],
              [0, 0, 0],
          ];
      }
  }

  
  const drawMatrix = (matrix, offset) => {
    matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          ctx.fillStyle = colors[value];
          ctx.fillRect(x + offset.x, y + offset.y, 1, 1);
        }
      })
    })
  }

  const draw = () => {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = 240;
    canvas.height = 400;
    
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.scale(20, 20);
    drawMatrix(arena, {x: 0, y: 0});
    drawMatrix(player.matrix, player.pos);
  }
  
  function playerDrop() {
    player.pos.y++;
    if(collide(arena, player)) {
      player.pos.y--;
      merge(arena, player);
      playerReset();
      arenaSweep();
    }
    dropCounter = 0;
}

  function playerMove(dir) {
      player.pos.x += dir;
      if(collide(arena, player)) {
        player.pos.x -= dir;
      }
  }

  const playerReset = () => {
    const pieces = 'TJLOSZI';
    player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
    player.pos.y = 0;
    player.pos.x = (arena[0].length / 2 | 0) -
                   (player.matrix[0].length / 2 | 0);
    if (collide(arena, player)) {
        arena.forEach(row => row.fill(0));
        player.score = 0;
        updateScore();
    }
}

  const playerRotate = (dir) => {
    const pos = player.pos.x;
    let offset = 1;
    rotate(player.matrix, dir);
    while(collide(arena, player)) {
      player.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > player.matrix[0].length) {
        rotate(player.matrix, -dir);
        player.pos.x = pos;
        return;
      }
    }
  }


  const merge = (arena, player) => {
    player.matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          arena[y + player.pos.y][x + player.pos.x] = value;
        }
      })
    })
  }

  const rotate = (matrix, dir) => {
    for(let y = 0; y < matrix.length; ++y) {
      for(let x = 0; x < y; ++x) {
        [
          matrix[x][y],
          matrix[y][x],
        ] = [
          matrix[y][x],
          matrix[x][y],
        ];
      }
    }

    if (dir > 0) {
      matrix.forEach(row => row.reverse());
    } else {
      matrix.reverse();
    }
  }

  let dropCounter = 0;
  let dropInterval = 1000;

  let lastTime = 0;

  const update = (time = 0) => {
    const deltaTime = time - lastTime;
    lastTime = time;
    
    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
      playerDrop();
      dropCounter = 0;
    }

    draw();
    requestAnimationFrame(update);
  }

  const arena = createMatrix(12, 20);
  console.log(arena); 

  const updateScore = () => {
    if(document.getElementById('score') !== null) document.getElementById('score').innerText = player.score;
  }

  const colors = [
    null,
    '#FF0D72',
    '#0DC2FF',
    '#0DFF72',
    '#F538FF',
    '#FF8E0D',
    '#FFE138',
    '#3877FF',
];

  const player = {
    pos: {x: 0, y: 0},
    matrix: null,
    score: 0,
  }

  document.addEventListener('keydown', event => {
    if (event.keyCode === 37) {
        playerMove(-1);
    } else if (event.keyCode === 39) {
        playerMove(1);
    } else if (event.keyCode === 40) {
        playerDrop();
    } else if (event.keyCode === 81) {
        playerRotate(-1);
    } else if (event.keyCode === 87) {
        playerRotate(1);
    }
});

  return (
    <div>
        <Stars />
        {!lostScreen ? 
        <div className="flex justify-center flex-col items-center h-[100vh] relative z-20">
        {!startGame ? <h1 className='text-white text-2xl animate-bounce my-2'>Press <span onClick={() => setStartGame(true)} className='bg-white text-black px-2 rounded-lg hover:cursor-pointer'>Start</span> To Play Tetris</h1> 
        :
          <div>
            <div className='text-3xl text-white font-bold my-2' id='score'></div>
          </div>
        }
          <canvas className='border-2 border-white h-[70vh] relative z-20' id='canvas' />
          <div>
            <button className='bg-white text-black px-3 py-2 rounded-lg my-2 text-2xl uppercase font-bold' onClick={() => setStartGame(true)}>Start Game</button>
            
          </div>
        </div> : 
        <div className='flex justify-center items-center w-full h-[100vh] relative z-20'>
          <canvas className='hidden' id='canvas' />
          <div className='bg-white p-5'>
            <h1 className='text-[#d60303] font-bold uppercase text-2xl text-center my-2'>You Lost</h1>
            <h1 className='text-black text-2xl my-2'>Your Score Was: {player.score}</h1>
          </div>
        </div>}
      </div>

    

  )
}

export default Game