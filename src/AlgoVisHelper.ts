
/**
 * 辅助函数工具
 */
export default class AlgoVisHelper
{
    public static Red = ( 0xF44336 );
    public static Pink = ( 0xE91E63 );
    public static Purple = ( 0x9C27B0 );
    public static DeepPurple = ( 0x673AB7 );
    public static Indigo = ( 0x3F51B5 );
    public static Blue = ( 0x2196F3 );
    public static LightBlue = ( 0x03A9F4 );
    public static Cyan = ( 0x00BCD4 );
    public static Teal = ( 0x009688 );
    public static Green = ( 0x4CAF50 );
    public static LightGreen = ( 0x8BC34A );
    public static Lime = ( 0xCDDC39 );
    public static Yellow = ( 0xFFEB3B );
    public static Amber = ( 0xFFC107 );
    public static Orange = ( 0xFF9800 );
    public static DeepOrange = ( 0xFF5722 );
    public static Brown = ( 0x795548 );
    public static Grey = ( 0x9E9E9E );
    public static BlueGrey = ( 0x607D8B );
    public static Black = ( 0x000000 );
    public static White = ( 0xFFFFFF );

    private static _lineWidth: number = 1;
    private static _lineColor: number = AlgoVisHelper.DeepOrange;
    private static _fillColor: number = AlgoVisHelper.Brown;

    // 防止实例化
    private constructor () { }

    // 设置线宽
    static setLineWidth ( g2d: Phaser.GameObjects.Graphics, lineWidth: number )
    {
        this._lineWidth = lineWidth;
    }
    // 设置颜色
    static setStrokeColor ( g2d: Phaser.GameObjects.Graphics, color: number ): void
    {
        this._lineColor = color;
    }

    // 设置填充颜色
    static setFillColor ( g2d: Phaser.GameObjects.Graphics, color: number ): void
    {
        this._fillColor = color;
    }
    // 空心圆
    static strokeCircle ( g2d: Phaser.GameObjects.Graphics, x: number, y: number, radius: number )
    {
        g2d.lineStyle( this._lineWidth, this._lineColor );
        g2d.strokeCircle( x, y, radius );
    }
    // 实心圆
    static fillCircle ( g2d: Phaser.GameObjects.Graphics, x: number, y: number, radius: number )
    {
        g2d.fillStyle( this._fillColor );
        g2d.fillCircle( x, y, radius );

    }
    // 空心矩形
    static strokeRect ( g2d: Phaser.GameObjects.Graphics, x: number, y: number, width: number, height: number )
    {
        g2d.lineStyle( this._lineWidth, this._lineColor );
        g2d.strokeRect( x, y, width, height );
    }
    // 实心矩形
    static fillRect ( g2d: Phaser.GameObjects.Graphics, x: number, y: number, width: number, height: number )
    {
        g2d.fillStyle( this._fillColor );
        g2d.fillRect( x, y, width, height );
    }
}
