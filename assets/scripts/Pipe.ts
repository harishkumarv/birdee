const {ccclass, property} = cc._decorator;
import game from './Game';

@ccclass
export default class NewClass extends cc.Component {
    shouldMove:boolean = true;
    // LIFE-CYCLE CALLBACKS:
    @property
    speed:number = 100;

    @property
    direction:number = -1;

    @property
    game:cc.Node = null;

    // onLoad () {}
    start () {
        this.node.on("STOP", () => {
            this.shouldMove = false;    
        });
    }

    update (dt) {
        this.shouldMove && this.node.setPositionX(this.node.getPositionX() - (dt * 100));
        if ((this.node.getPositionX() < -this.node.parent.width / 2)) {
            this.node.dispatchEvent(new cc.Event.EventCustom("DESTROYED", true));
            this.node.destroy();
        }
    }
}
