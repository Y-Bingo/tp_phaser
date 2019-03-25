
export class Circle
{
    x: number;      // 圆心X
    y: number;      // 圆心Y
    r: number;      // 半径

    constructor ( x: number, y: number, r: number )
    {
        this.x = x;
        this.y = y;
        this.r = r;
    }

    contain ( point: Point ): boolean
    {
        return Math.pow( ( this.x - point.x ), 2 ) + Math.pow( ( this.y - point.y ), 2 ) <= Math.pow( this.r, 2 );
    }
}

export class Point
{
    x: number;
    y: number;
    constructor ( x: number, y: number )
    {
        this.x = x;
        this.y = y;
    }
}
