import {LumiActionsUI} from "./LumiActionsUI"
import {LumiDragonMesh} from "./LumiDragonMesh"
@component
export class LumiMain extends BaseScriptComponent {
  @input @hint("Painel passivo das ações") ui:LumiActionsUI
  @input @hint("Dragão articulado e adereços") dragon:LumiDragonMesh
  public state="initial"
  public elapsed=0
  public completedFeeds=0
  public completedPlays=0
  private clock=0
  onAwake() {
    this.createEvent("OnStartEvent").bind(()=>{
      this.ui.onPlace.add(()=>this.place());this.ui.onFeed.add(()=>this.begin("feeding"));this.ui.onPlay.add(()=>this.begin("playing"));this.ui.onReset.add(()=>this.reset());this.reset()
    })
    this.createEvent("UpdateEvent").bind(()=>this.tick())
  }
  public reset() {this.state="initial";this.elapsed=0;this.clock=0;this.dragon.pose(0,"initial",0);this.dragon.visualRoot.enabled=false;this.dragon.marker.enabled=true;this.dragon.food.enabled=false;this.dragon.ball.enabled=false;this.dragon.pose(this.clock,this.state,0);this.ui.setState(this.state)}
  private place() {if(this.state!=="initial")return;this.state="idle";this.dragon.visualRoot.enabled=true;this.dragon.marker.enabled=false;this.ui.setState(this.state)}
  private begin(state:string) {if(this.state!=="idle")return;this.state=state;this.elapsed=0;this.dragon.food.enabled=state==="feeding";this.dragon.ball.enabled=state==="playing";this.ui.setState(this.state)}
  private tick() {
    if(!this.dragon||!this.ui)return
    const dt=getDeltaTime();this.clock+=dt
    if(this.state==="feeding"||this.state==="playing") {
      this.elapsed+=dt
      if(this.elapsed>=(this.state==="feeding"?3:4)) {
        if(this.state==="feeding")this.completedFeeds++;else this.completedPlays++
        this.state="idle";this.elapsed=0;this.dragon.food.enabled=false;this.dragon.ball.enabled=false;this.dragon.pose(this.clock,this.state,0);this.ui.setState(this.state)
      }
    }
    this.dragon.pose(this.clock,this.state,this.elapsed)
  }
}



