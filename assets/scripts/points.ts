const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    start () {

    }

    onCollisionExit(other, self) {
        this.node.parent.dispatchEvent(new cc.Event.EventCustom("SCORE", true));
    }
}
