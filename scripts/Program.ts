import {Drawing} from "./Drawing";
import { Grid } from "./Grid";
import { Wall } from "./Wall";
import { Snake } from "./Snake";
import { Item } from "./Item";
import { Direction } from "./Direction";
import {Point} from "./Point";
import { Food } from "./Food";
window.onload = function() {
    let width : number;
    let height : number;
    let canvas : HTMLCanvasElement;
    let ctx : CanvasRenderingContext2D;
    let grid : Grid;
    grid = new Grid(30,30);
    let wall = new Wall(30,30);
    grid.getInfo(wall.pointList);
    let drawThing : Drawing;
    let snake = new Snake(new Point (4,4,Item.SNAKETAIL),5,Direction.RIGHT);
    grid.getInfo(snake.pointList);
    let food = new Food(30,30);
    food.CreateFood(snake);
    grid.getInfo(food.pointList);
    //button Click
    document.addEventListener('keydown', keyDownHandler,false);
    function keyDownHandler(e) {
        if(e.key == "Right" || e.key == "ArrowRight") {
            snake.direction = Direction.RIGHT;
        }
        else if(e.key == "Left" || e.key == "ArrowLeft") {
            snake.direction = Direction.LEFT;
        }
        else if (e.key == "Down" || e.key == "ArrowDown"){
            snake.direction = Direction.DOWN;
        }
        else if (e.key == "Up" || e.key == "ArrowUp"){
            snake.direction = Direction.UP;
        }
    }
    document.getElementById("testButton").onclick  = function(){
        canvas = document.getElementById("gameWindow") as HTMLCanvasElement;
        ctx = canvas.getContext("2d");
        drawThing = new Drawing(canvas,grid);
        drawThing.DrawFrame();
        let gameLoop = setInterval(function(){
           if (snake.IsHitTail() || snake.IsHitWall(wall)){
               clearInterval(gameLoop);              
           }
           if (snake.Eat(food.pointList[0])){
               food.CreateFood(snake);
           }
           snake.Move();
           grid.forDrawFrame();
           grid.getInfo(wall.pointList);
           grid.getInfo(snake.pointList);
           grid.getInfo(food.pointList);
           drawThing.DrawFrame();
       },500);
    }
}