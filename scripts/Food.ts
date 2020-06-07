import {Snake} from "./Snake";
import { Figure } from "./Figure";
import {Point} from "./Point";
import {Item} from "./Item";
export class Food extends Figure{
    mapWidth : number;
    mapHeight : number;
    constructor (mapWidth : number , mapHeight : number){
        super();
        this.pointList = [];
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
    }

    CreateFood(snake : Snake){
        let x = this.getRandomInt(1,this.mapWidth-1);
        let y = this.getRandomInt(1,this.mapHeight - 1);
        if (snake.IsHitP(new Point (x,y,Item.FOOD))){
            this.CreateFood(snake);
        }
        else {
            if (this.pointList.length!=0){
                this.pointList.shift();
            }
            this.pointList.push(new Point (x,y,Item.FOOD));
        }
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
      }
}