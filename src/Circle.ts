
export default class Circle
{
    r: number;         // 半径
    x: number;         // 圆心 x
    y: number;         // 圆心 y
    vx: number;        // 速度 x
    vy: number;        // 速度 y
    isFilled: boolean; // 是否别填充

    constructor ( x: number, y: number, radius: number, vx: number, vy: number )
    {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.r = radius;
        this.isFilled = false;
    }

    move ( minX: number, minY: number, maxX: number, maxY: number ): void
    {
        this.x += this.vx;
        this.y += this.vy;
        this._checkBorderCollision( minX, minY, maxX, maxY );
    }

    contain ( x: number, y: number ): boolean
    {
        return Math.pow( ( this.x - x ), 2 ) + Math.pow( ( this.y - y ), 2 ) <= Math.pow( this.r, 2 );
    }

    // 检查碰撞
    private _checkBorderCollision ( minX: number, minY: number, maxX: number, maxY: number ): void
    {
        if ( this.x - this.r <= minX ) { this.x = this.r; this.vx = -this.vx; }
        if ( this.x + this.r >= maxX ) { this.x = maxX - this.r; this.vx = -this.vx; }
        if ( this.y - this.r <= minY ) { this.y = this.r; this.vy = -this.vy; }
        if ( this.y + this.r >= maxY ) { this.y = maxY - this.r; this.vy = - this.vy; }
    }

}
