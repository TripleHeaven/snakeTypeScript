import {Item} from "./Item";
import {Point} from "./Point";
export class Grid{
    mapWidth : number;
    mapHeight : number;
    grid : Point [][];
    constructor (mapWidth : number, mapHeight : number){
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;

        this.grid = [];
        for (let i = 0 ; i < mapWidth; i++){
            this.grid[i] = [];
            for (let j = 0 ; j < mapHeight; j++){
                this.grid[i][j] = new Point (i,j,Item.FIELD)
            }
        }
    }
    forDrawFrame (){
        for (let i = 0 ; i < this.mapWidth; i++){
            this.grid[i] = [];
            for (let j = 0 ; j < this.mapHeight; j++){
                this.grid[i][j] = new Point (i,j,Item.FIELD)
            }
        }
    }
    getInfo (list : Point[]){
        for (let i = 0 ; i < this.mapWidth; i ++){
            for (let j = 0; j < this.mapHeight; j ++){
                for (let listi = 0 ; listi < list.length; listi++){
                    if (list[listi].x == this.grid[i][j].x && list[listi].y == this.grid[i][j].y){
                        this.grid[i][j].sym = list[listi].sym;
                    }
                    
                }
            }
        }
    }
}