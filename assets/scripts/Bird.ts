const {ccclass, property} = cc._decorator;

let GAME_STATES = cc.Enum({
    OFF   : 0,
    ON    : 1,
    DEAD   : 2
});

let BIRD_STATES = cc.Enum({
    IDLE   : 0,
    UP     : 1,
    DOWN   : 2
});

let currentGameState = GAME_STATES.OFF;
let currentBirdState = BIRD_STATES.IDLE;
let moveSpeed = 0;

@ccclass
export default class NewClass extends cc.Component {
    onKeyDown(e:cc.Event.EventCustom) {
        console.log("space");
        if (e.keyCode == cc.KEY.space) {
            currentBirdState = BIRD_STATES.UP;
            moveSpeed = 10;
            if (currentGameState === GAME_STATES.OFF) {
                currentGameState = GAME_STATES.ON;
                this.node.parent.dispatchEvent(new cc.Event.EventCustom("ON", true));
            }
        }
    }

    start () {
        var self = this;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        this.node.on("RESET", function() {
            currentBirdState = BIRD_STATES.IDLE;
            currentGameState = GAME_STATES.OFF;
            self.node.setPositionX(0);
            self.node.setPositionY(43);
        });
    }

    update(dt) {
        if (currentGameState === GAME_STATES.ON) {
            moveSpeed--;
            this.node.y += moveSpeed;
        }
    }

    onCollisionEnter(other, self) {
        if (other.node.getName() == "pointsArea") return;
        currentBirdState = BIRD_STATES.IDLE;
        currentGameState = GAME_STATES.OFF;
        this.node.parent.dispatchEvent(new cc.Event.EventCustom("OFF", true));
        console.log("collision detected: dinner ready");
        
    }
}
