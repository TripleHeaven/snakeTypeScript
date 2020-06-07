import {Item} from "./Item";
import { Direction } from "./Direction";
export {Point};
class Point{
    public x : number;
    public y : number;
    public sym : Item;
    
    constructor();
    constructor (x: number, y : number, sym: Item);
    constructor (p :Point);
    constructor (x?,y?,sym?, p?){
        if (typeof(x) === "number"){
            this.x = x;
            this.y = y;
            this.sym = sym;
        }
        else{
            this.sym = x.sym;
            this.x = x.x;
            this.y = x.y;
        }
        
        
      
    }
    
    Move (offset : number, dir : Direction): void{
        if (dir == Direction.UP){
            this.y -=offset;
        }
        if (dir == Direction.DOWN){
            this.y+=offset;
        }
        if (dir == Direction.LEFT){
            this.x -=offset;
        }
        if (dir == Direction.RIGHT){
            this.x +=offset;
        }
    }
    isHit (p : Point) : boolean{
        return p.x == this.x && p.y == this.y;
    }

}