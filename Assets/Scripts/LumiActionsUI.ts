import Event from "SpectaclesInteractionKit.lspkg/Utils/Event"
import {Button} from "SpectaclesUIKit.lspkg/Scripts/Components/Button/Button"
import {ElementContent} from "SpectaclesUIKit.lspkg/Scripts/Components/Content/ElementContent"
import {BackPlate} from "SpectaclesUIKit.lspkg/Scripts/BackPlate"
import {FlexLayout} from "SpectaclesUIKit.lspkg/Scripts/Components/Layout2D/Flex/FlexLayout"
import {FlexItem} from "SpectaclesUIKit.lspkg/Scripts/Components/Layout2D/Flex/FlexItem"
import {FlexDirection,FlexAlign,FlexJustify} from "SpectaclesUIKit.lspkg/Scripts/Components/Layout2D/Flex/FlexTypes"

@component
export class LumiActionsUI extends BaseScriptComponent {
  readonly onPlace = new Event<void>()
  readonly onFeed = new Event<void>()
  readonly onPlay = new Event<void>()
  readonly onReset = new Event<void>()
  public ready = false
  public buttons: {[name:string]:Button} = {}
  private placement: SceneObject
  private actions: SceneObject
  private status: Text
  onAwake() {
    this.sceneObject.createComponent("Component.Canvas")
    const backing = this.sceneObject.createComponent(BackPlate.getTypeName()) as BackPlate
    backing.size = new vec2(31,14)
    const content = this.obj(this.sceneObject,"LumiPanelContent")
    content.getTransform().setLocalPosition(new vec3(0,0,0.6))
    const column = content.createComponent(FlexLayout.getTypeName()) as FlexLayout
    column.autoDiscoverItemsOnStart=false;column.width=29;column.height=12;column.direction=FlexDirection.Column;column.rowGap=1;column.alignItems=FlexAlign.Center;column.justifyContent=FlexJustify.Center
    const heading=this.item(content,column,"LumiStatus",28,3)
    this.status=heading.createComponent("Component.Text") as Text
    this.status.text="LUMI · um amigo na tua mesa";this.status.size=39;this.status.depthTest=true
    this.status.horizontalAlignment=HorizontalAlignment.Center
    this.status.verticalAlignment=VerticalAlignment.Center
    this.status.layoutRect=Rect.create(-14,14,-1.5,1.5)
    this.placement=this.item(content,column,"LumiPlacementControls",28,6)
    this.row(this.placement,[{name:"Colocar Lumi",event:this.onPlace}],10)
    this.actions=this.item(content,column,"LumiActionControls",28,6)
    this.row(this.actions,[{name:"Alimentar",event:this.onFeed},{name:"Brincar",event:this.onPlay},{name:"Reiniciar",event:this.onReset}],8)
    this.createEvent("OnStartEvent").bind(()=>{this.ready=true;this.setState("initial")})
  }
  public setState(state:string) {
    if(!this.ready)return
    const initial=state==="initial", busy=state==="feeding"||state==="playing"
    this.placement.enabled=initial;this.actions.enabled=!initial
    this.buttons["Alimentar"].inactive=busy;this.buttons["Brincar"].inactive=busy
    this.status.text=initial?"LUMI · coloca o teu amigo":state==="feeding"?"Lumi está a saborear…":state==="playing"?"Lumi está a brincar…":"LUMI · pronto para mais!"
  }
  private row(parent:SceneObject, entries:{name:string,event:Event<void>}[],width:number) {
    const flex=parent.createComponent(FlexLayout.getTypeName()) as FlexLayout
    flex.autoDiscoverItemsOnStart=false;flex.width=28;flex.height=6;flex.direction=FlexDirection.Row;flex.columnGap=1;flex.justifyContent=FlexJustify.Center;flex.alignItems=FlexAlign.Center
    entries.forEach(entry=>{
      const obj=this.item(parent,flex,entry.name,width,5)
      const button=obj.createComponent(Button.getTypeName()) as Button
      button.size=new vec3(width,5,1)
      button.setVariant({theme:"SnapOS2",shape:"Rectangle",style:"PrimaryNeutral"})
      const label=obj.createComponent(ElementContent.getTypeName()) as ElementContent
      label.text=entry.name;label.textSize=39
      this.createEvent("OnStartEvent").bind(()=>button.onTriggerUp.add(()=>entry.event.invoke()))
      this.buttons[entry.name]=button
    })
  }
  private obj(parent:SceneObject,name:string) {const obj=global.scene.createSceneObject(name);obj.setParent(parent);return obj}
  private item(parent:SceneObject,layout:FlexLayout,name:string,width:number,height:number) {
    const obj=this.obj(parent,name);const item=obj.createComponent(FlexItem.getTypeName()) as FlexItem
    item.overrideWidth=width;item.overrideHeight=height;item.flexShrink=0;layout.addItems([item]);return obj
  }
}

