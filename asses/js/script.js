const board = document.getElementById('board')
let snake = [{x: 6,  y: 6}]
let direction = 'ArrowRight'
let gameInterval
let _status = document.getElementById('status')
let score = 0
let left2
let top2

draw()
startSnake()
_status.innerHTML = `Your score is : ${score}`

function draw() {
  board.innerHTML = ''
  creatSnake()
  creatFoodRandom()
}

// creat snake
function updateSnake() {
  // remove all elements in snakeDiv before  drawing new one
  let snakeDiv = document.querySelectorAll('.snakeDiv')
  snakeDiv.forEach(element => {
    element.remove()   
  })
  creatSnake()
}

function creatSnake() {
  snake.forEach(element => {
    let _div = document.createElement('div')
    board.appendChild(_div)
    _div.classList.add('w-[40px]', 'h-[40px]', 'bg-[#414141]', 'border', 'z-20', 'snakeDiv')
    _div.style.gridColumn = element.x
    _div.style.gridRow = element.y
  })
}


// make number for food position whit conditions
function creatFoodRandom() {
  num() 
  creatFood(top2, left2)
}

function num() {
  top2 = Math.floor(Math.random() * 11) + 1
  left2 = Math.floor(Math.random() * 11) + 1
}

// creat food
function creatFood(top2, left2) {  
  food = document.createElement('div')
  board.appendChild(food)
  food.classList.add('w-[40px]', 'h-[40px]', 'bg-white', 'border', '_food', 'z-10')
  food.style.gridColumn = left2
  food.style.gridRow = top2
}

// Moving the snake
function move() {
  const head = {
    ...snake[0]
  }
  switch (direction) {
    case 'ArrowUp':
      head.y--;
      break;
    case 'ArrowDown':
      head.y++;
      break;
    case 'ArrowLeft':
      head.x--;
      break;
    case 'ArrowRight':
      head.x++;
      break;
  }
  snake.unshift(head)  
   if ((head.x == left2) && (head.y == top2)) {
    //remove food and creat again
    let _food = document.querySelectorAll('._food')   
     _food.forEach(element => {
       element.remove()
     })
     creatFoodRandom()   
     score++  
     _status.innerHTML = `Your score is : ${score}`
    } else {
     snake.pop()
   } 
   checkCollision()  
}

function handleKeyPress(event) {
  direction = event.key
  switch (direction) {
    case 'ArrowUp':
      direction = 'ArrowUp';
      break;
    case 'ArrowDown':
      direction = 'ArrowDown';
      break;
    case 'ArrowLeft':
      direction = 'ArrowLeft';
      break;
    case 'ArrowRight':
      direction = 'ArrowRight';
      break;
  }  
}

 function startSnake() {
   gameInterval = setInterval(() => {
    move()
    updateSnake()
   }, 200)
 }

 function checkCollision() {
  //if the snake is in the corner and game over
  const head = snake[0]
  if (head.x < 1 || head.x > 11 || head.y < 1 || head.y > 11){ 
      reset()     
  }  
} 
function reset() {
  alert('You Game Over')
  snake = [{  x: 6,  y: 6}]
  draw()
  direction = 'ArrowRight'
  move()
  score =0
  _status.innerHTML = `Your score is : ${score}`
} 


