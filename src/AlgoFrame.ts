import AlgoVisHelper from "./AlgoVisHelper";
import Board from "./Board";

// 地图数据颜色映射表
const MBOX_COLOR =
{
    "A": AlgoVisHelper.Brown,
    "B": AlgoVisHelper.LightBlue,
    "C": AlgoVisHelper.Grey,
    "D": AlgoVisHelper.Pink,
    "E": AlgoVisHelper.DeepOrange,
    "F": AlgoVisHelper.DeepPurple,
    "G": AlgoVisHelper.Red,
    "H": AlgoVisHelper.Cyan
}

/**
 * 视图层， 接收数据进行绘制
 */
class AlgoFrame extends Phaser.GameObjects.Graphics
{
    private _stageWidth: number;
    private _stageHeight: number;

    constructor ( scene: Phaser.Scene )
    {
        super( scene );
        scene.add.existing( this );

        this._stageWidth = scene.sys.canvas.width;
        this._stageHeight = scene.sys.canvas.height;
    }

    // 设置地图
    setMap ( data: Board ): void
    {
        this._data = data;
        this._initStage();
    }
    private _boxSize: number;
    private _startX: number;
    private _startY: number;
    // 初始化舞台
    private _initStage (): void
    {
        this._boxSize = 80;
        let boxH = this._data.ROW * this._boxSize;
        let boxW = this._data.COL * this._boxSize;

        this._startX = ( this._stageWidth - boxW ) / 2;
        this._startY = ( this._stageHeight - boxH ) / 2;
    }

    // 接受渲染的数据
    private _data: Board;
    render ( data: Board ): void
    {
        this._data = data;
        this._repaint();
    }

    // 具体渲染过程
    private _repaint (): void
    {
        let x = 0;
        let y = 0;
        let mapData = "";
        let offX = 5;
        let offY = 5;
        for ( let row = 0; row < this._data.ROW; row++ ) {
            for ( let col = 0; col < this._data.COL; col++ ) {
                x = col * ( this._boxSize + offX ) + this._startX;
                y = row * ( this._boxSize + offY ) + this._startY;
                mapData = this._data.getMap( row, col );
                if ( mapData == "." ) continue;
                if ( mapData == "#" ) {
                    AlgoVisHelper.setStrokeColor( this, AlgoVisHelper.Amber )
                    AlgoVisHelper.strokeRect( this, x, y, this._boxSize, this._boxSize );
                } else {
                    AlgoVisHelper.setFillColor( this, MBOX_COLOR[ mapData ] );
                    AlgoVisHelper.fillRect( this, x, y, this._boxSize, this._boxSize );
                }
            }
        }
    }
}

export default AlgoFrame;
