import {Direction} from "./Direction";
import {Point} from "./Point";
import { Figure } from "./Figure";
import { Item } from "./Item";
export class Snake extends Figure{
    direction : Direction;
    constructor(tail : Point, lenght : number, _direction : Direction){
        super ();
        this.pointList = [];
        this.direction = _direction;
        for (let i = 0; i < lenght; i++){
            
            let p = new Point(tail);
            p.Move(i,this.direction);
            this.pointList.push(p);
        }
    }
    Move() : void{
        let tail = this.pointList.shift();
        let head = this.GetNextPoint();
        this.pointList.push(head);
    }
    GetNextPoint() : Point{
        let head = this.pointList[this.pointList.length - 1];
        let nextP = new Point(head);
        nextP.Move(1,this.direction);
        return nextP;
    }
    Eat (food : Point): boolean{
        let head = this.GetNextPoint();
        if (head.isHit(food)){
            food.sym = Item.SNAKETAIL;
            this.pointList.push (food);
            return true;
        }
        return false;
    }
    IsHitTail():boolean{
        let head = this.pointList[this.pointList.length-1];
        for (let i = 0 ; i < this.pointList.length - 2 ; i ++){
            if (head.isHit(this.pointList[i])){
                return true;
            }
        }
        return false;
    }
    IsHitWall( w : Figure){
        let head = this.pointList[this.pointList.length-1];
        for (let i = 0 ; i < w.pointList.length - 1 ; i ++){
            if (head.isHit(w.pointList[i])){
                return true;
            }
        }
        return false;
    }
}