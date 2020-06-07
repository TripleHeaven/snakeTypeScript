export {Figure};
import {Point} from "./Point";
class Figure{
    pointList : Point[];
    IsHitP (p : Point) : boolean {
        this.pointList.forEach( l  => {
            if (l.isHit(p)){
                return true;
            }
        });
        return false;
    }
    IsHitF (f : Figure) : boolean {
    this.pointList.forEach ( l => {
        if (f.IsHitP(l)){
            return true;
        }
    })
    return false;
    }
}