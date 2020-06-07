import {Point} from "./Point"
import {Item} from "./Item";
import { Figure } from "./Figure";
export class Wall extends Figure{
    constructor (mapWidth : number, mapHeight : number){
        //vertical lines
        super();
        this.pointList = [];
        for ( let i = 0 ; i < mapWidth; i ++){
         this.pointList.push(new Point(i,0,Item.BORDER));
        }
        for (let i = 0 ; i < mapWidth ; i++){
           this.pointList.push (new Point(i,mapHeight-1,Item.BORDER));
        }
        //horizontal lines
        for (let i = 0 ; i < mapHeight; i++){
           this.pointList.push (new Point (0,i,Item.BORDER));
        }
        
        for (let i = 0 ; i < mapHeight; i ++){
           this.pointList.push (new Point (mapWidth-1,i,Item.BORDER));
        }
    }
}