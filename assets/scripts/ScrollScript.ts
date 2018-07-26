const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property
    speed:number = 100;

    @property
    direction:number = -1;

    shouldMove:boolean = true

    start () {
        this.node.parent.on("STOP", () => {
            this.shouldMove = false;    
        });
    }

    update (dt) {
        this.shouldMove && this.node.setPositionX(this.node.position.x += Math.floor((this.speed * dt * this.direction)));
        if (this.direction < 0) {
            if (this.node.position.x + this.node.width/2 < - 480) {
                this.node.setPositionX(480 + this.node.width/2);
            }
        } else { // untested, didnt have the need yet.
            if (this.node.position.x + this.node.width/2 > 480) {
                this.node.setPositionX((this.node.width/2) - 480);
            }
        }
    }
}
