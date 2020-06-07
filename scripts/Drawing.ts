import {Grid} from "./Grid";
import {Item} from "./Item";
export class Drawing{
    canvas : HTMLCanvasElement;
    ctx : CanvasRenderingContext2D;
    grid : Grid;
    squareSize : number ; 
    constructor (canvas : HTMLCanvasElement, grid : Grid){
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.grid = grid;
        this.squareSize = canvas.width / grid.grid.length;
    }
    DrawFrame(): void{
        // Running thru Grid 
        let width = 15;
        let height = 15;
        this.ctx.fillStyle = "#111111";
        this.ctx.fillRect (0,0,this.canvas.width,this.canvas.height);
        for (let i = 0; i < this.grid.mapWidth; i++){
            for (let j = 0; j < this.grid.mapHeight; j++){
                if (this.grid.grid[i][j].sym == Item.FIELD){
                    this.ctx.fillStyle = "#111111";
                    this.ctx.fillRect(i*this.squareSize,j*this.squareSize,this.squareSize,this.squareSize);
                }
                else if (this.grid.grid[i][j].sym == Item.FOOD){
                    this.ctx.fillStyle = "#5CB54A";
                    this.ctx.fillRect(i*this.squareSize,j*this.squareSize,this.squareSize,this.squareSize);
                }
                else if (this.grid.grid[i][j].sym == Item.BORDER){
                    this.ctx.fillStyle = "#1899FF";
                    this.ctx.fillRect(i*this.squareSize,j*this.squareSize,this.squareSize,this.squareSize);
                }
                else if (this.grid.grid[i][j].sym == Item.SNAKETAIL){
                    this.ctx.fillStyle = "yellow";
                    this.ctx.fillRect(i*this.squareSize,j*this.squareSize,this.squareSize,this.squareSize);
                }
                
            }
        }
    }
}