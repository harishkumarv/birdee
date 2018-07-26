const {ccclass, property} = cc._decorator;

let lastPipe:cc.Node = null;
let shouldCreatePipes = false;
let pipes = [];

let score = 0;
@ccclass
export default class NewClass extends cc.Component {

    @property (cc.Prefab)
    pipePrefab: cc.Prefab = null;
    
    @property (cc.Node)
    bird: cc.Node = null;
    

    positionPipes(pipeUp, pipeDown) {
        pipeUp.node.x = pipeUp.node.width/2 + this.node.parent.width/2;
        pipeDown.node.x = pipeDown.node.width/2 + this.node.parent.width/2;

    }

    createPipes() {
        var pipeUp = cc.instantiate(this.pipePrefab);
        var pipeDown = cc.instantiate(this.pipePrefab);
        pipeUp.rotationX = 180;
        let pos = Math.floor(Math.random() * 600);
        if (pos < 280) {
            pos = 280;
        }

        pipeUp.setPositionY(pos);
        pipeDown.setPositionY(pos - 780);

        pipes.push(pipeDown);
        pipes.push(pipeUp);
        this.node.addChild(pipeUp);
        this.node.addChild(pipeDown);


        pipeUp.on("DESTROYED", function() {
            let index = pipes.indexOf(pipeUp);
            pipes.splice(index, 1);
        });

        pipeDown.on("DESTROYED", function() {
            let index = pipes.indexOf(pipeUp);
            pipes.splice(index, 1);
        });

        lastPipe = pipeUp;
    }

    startGame() {
        this.createPipes();
    }

    start () {
        var self = this;
        this.node.on("SCORE", function() {

            shouldCreatePipes = false;
            score++;
        });

        this.node.on("ON", function() {
            console.log("ON Event");
            shouldCreatePipes = true;
            score = 0;
            self.startGame();
        });

        this.node.on("OFF", function() {
            console.log("Score: ", Math.floor(score/2));
            self.node.dispatchEvent(new cc.Event.EventCustom("STOP", true));
            shouldCreatePipes = false;
            pipes.forEach(function(e:cc.Node) {
                e.dispatchEvent(new cc.Event.EventCustom("STOP", true));
            });
            cc.director.loadScene("gameover");
            cc.sys.localStorage.setItem("score", score);
            score = 0;
        });
        
    }

    update (dt) {
        if (lastPipe && lastPipe.getPositionX() < 240 && shouldCreatePipes) {
            this.createPipes();
        }
    }

    onLoad() {
        console.log("Load done");
        lastPipe = null;
        shouldCreatePipes = false;
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
        manager.enabledDrawBoundingBox = true;
    }
}
