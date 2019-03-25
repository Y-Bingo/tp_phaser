import { Circle, Point } from "./Circle";

export default class MonteCarloData
{
    private _circle: Circle;
    private _pointList: Point[];
    private _inCircles: number;

    constructor ( circle: Circle )
    {
        this._circle = circle;
        this._pointList = [];
        this._inCircles = 0;
    }

    getCircle (): Circle
    {
        return this._circle;
    }

    getPoint ( index: number ): Point
    {
        return this._pointList[ index ];
    }

    getPointNums (): number
    {
        return this._pointList.length;
    }

    addPoint ( point: Point ): void
    {
        this._pointList.push( point );
        if ( this._circle.contain( point ) )
            this._inCircles++;
    }

    estimatePi (): number
    {
        return 4 * this._inCircles / this._pointList.length;
    }
}
