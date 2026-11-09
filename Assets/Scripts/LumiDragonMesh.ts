// Articulated MeshBuilder backend: smooth ellipsoids, centimetres, +Z faces the user.
@component
export class LumiDragonMesh extends BaseScriptComponent {
  @input @hint("Material unlit usado como base das cores do Lumi") material:Material
  public body:SceneObject
  public head:SceneObject
  public tail:SceneObject
  public wings:SceneObject[]=[]
  public eyes:SceneObject[]=[]
  public food:SceneObject
  public ball:SceneObject
  public marker:SceneObject
  public visualRoot:SceneObject
  private mesh:RenderMesh
  onAwake() {
    this.mesh=this.sphere()
    this.visualRoot=this.obj(this.sceneObject,"LumiVisual")
    this.body=this.obj(this.visualRoot,"LumiBody")
    const blue=new vec4(.18,.65,1,1),white=new vec4(.9,.98,1,1),ink=new vec4(.025,.08,.16,1)
    this.part(this.body,"LumiBlueBody",new vec3(0,4.5,0),new vec3(3,4,2.6),blue)
    this.part(this.body,"LumiWhiteBelly",new vec3(0,4.3,2),new vec3(2.1,2.8,.9),white)
    this.head=this.obj(this.body,"LumiHead",new vec3(0,8.8,1))
    this.part(this.head,"LumiBlueHead",vec3.zero(),new vec3(3.2,2.5,2.5),blue)
    this.part(this.head,"LumiMuzzle",new vec3(0,-.8,2),new vec3(2.25,1.3,1.35),white)
    ;[-1,1].forEach(side=>{
      this.part(this.body,"LumiFoot"+side,new vec3(side*1.9,1,1),new vec3(1.3,1,1.8),blue)
      const eye=this.part(this.head,"LumiEye"+side,new vec3(side*1.45,.5,2),new vec3(1.05,1.25,.8),white);this.eyes.push(eye)
      this.part(eye,"LumiPupil"+side,new vec3(0,0,.85),new vec3(.55,.65,.3),ink)
      this.part(eye,"LumiEyeGlint"+side,new vec3(-.18,.22,1.15),new vec3(.18,.22,.1),white)
      this.part(this.head,"LumiHorn"+side,new vec3(side*2.15,2.1,-.5),new vec3(.65,1.1,.65),white)
      const wing=this.obj(this.body,"LumiWing"+side,new vec3(side*2.5,6,-1));this.wings.push(wing)
      this.part(wing,"LumiWhiteWing"+side,new vec3(side*1.1,.6,0),new vec3(1.8,2,.5),white)
    })
    this.tail=this.obj(this.body,"LumiTail",new vec3(0,2,-2))
    this.part(this.tail,"LumiBlueTail",new vec3(0,.6,-2.3),new vec3(1.2,1.2,3),blue)
    this.part(this.tail,"LumiTailTip",new vec3(0,1,-4.5),new vec3(.8,.8,1.4),white)
    this.food=this.part(this.sceneObject,"LumiPetisco",new vec3(8,1,3),new vec3(1,1,1),new vec4(1,.65,.2,1))
    this.ball=this.part(this.sceneObject,"LumiBola",new vec3(-10,1.2,3),new vec3(1.2,1.2,1.2),new vec4(1,.35,.55,1))
    this.marker=this.part(this.sceneObject,"LumiMarcador",new vec3(0,.15,0),new vec3(5,.15,5),new vec4(.35,1,.8,1))
    this.visualRoot.enabled=false;this.food.enabled=false;this.ball.enabled=false
  }
  public pose(time:number,state:string,t:number) {
    const busy=state==="feeding"||state==="playing"
    const breath=1+Math.sin(time*2.3)*.018
    this.body.getTransform().setLocalScale(new vec3(1,breath,1))
    const blink=(time%3.7)>3.5 || (state==="feeding"&&t>1.6&&t<2.4)
    this.eyes.forEach(eye=>eye.getTransform().setLocalScale(new vec3(1,blink?.08:1,1)))
    this.tail.getTransform().setLocalRotation(quat.fromEulerAngles(0,Math.sin(time*(busy?14:3))*(busy?.5:.2),0))
    this.wings.forEach((wing,i)=>wing.getTransform().setLocalRotation(quat.fromEulerAngles(0,0,Math.sin(time*(busy?16:2))*(busy?.45:.08)*(i===0?-1:1))))
    let x=0,y=0,z=0,turn=0,tilt=0,headHeight=8.8
    if(state==="feeding") {
      // Look, approach with a hop, crouch to the snack, enjoy, then return home.
      if(t<.6){turn=Math.PI*.5*t/.6;tilt=.15*t/.6}
      else if(t<1.35){const p=(t-.6)/.75;x=5.2*p;z=3*p;y=Math.sin(p*Math.PI)*1.5;turn=Math.PI*.5;headHeight=8.8-6.1*p;tilt=.2}
      else if(t<1.75){x=5.2;z=3;headHeight=2.7;tilt=.2;turn=Math.PI*.5}
      else if(t<2.35){const p=(t-1.75)/.6;x=5.2;z=3;headHeight=2.7+6.1*p;turn=Math.PI*.5*(1-p)}
      else {const p=Math.min(1,(t-2.35)/.65);x=5.2*(1-p);z=3*(1-p);y=Math.sin(p*Math.PI)*.7}
      this.food.enabled=t<1.65
    } else if(state==="playing") {
      const ballP=Math.min(1,t/.8)
      this.ball.getTransform().setLocalPosition(new vec3(-10+20*ballP,1.2+Math.sin(ballP*Math.PI)*3,3))
      if(t<.5){turn=-Math.PI*.5*(1-t/.5)}
      else if(t<1.7){const p=(t-.5)/1.2;x=7*p;z=3*p;y=Math.abs(Math.sin(p*Math.PI*5))*.6;turn=Math.PI*.5;headHeight=8.8-6.1*p;tilt=.2*p}
      else if(t<2.15){x=7;z=3;headHeight=2.7;tilt=.2;turn=Math.PI*.5}
      else if(t<2.5){const p=(t-2.15)/.35;x=7;z=3;headHeight=2.7+6.1*p;turn=Math.PI*.5*(1-p)}
      else if(t<3){x=7;z=3;y=Math.sin((t-2.5)/.5*Math.PI)*2}
      else {const p=Math.min(1,t-3);x=7*(1-p);z=3*(1-p);y=Math.abs(Math.sin(p*Math.PI*3))*.4}
    }
    this.visualRoot.getTransform().setLocalPosition(new vec3(x,y,z))
    this.visualRoot.getTransform().setLocalRotation(quat.fromEulerAngles(0,turn,0))
    this.head.getTransform().setLocalPosition(new vec3(0,headHeight,1))
    this.head.getTransform().setLocalRotation(quat.fromEulerAngles(tilt,0,Math.sin(time)*.03))
  }
  private obj(parent:SceneObject,name:string,pos=vec3.zero()) {const obj=global.scene.createSceneObject(name);obj.setParent(parent);obj.getTransform().setLocalPosition(pos);return obj}
  private part(parent:SceneObject,name:string,pos:vec3,size:vec3,color:vec4) {
    const obj=this.obj(parent,name,pos);obj.getTransform().setLocalScale(size)
    const visual=obj.createComponent("Component.RenderMeshVisual") as RenderMeshVisual
    visual.mesh=this.mesh;const mat=this.material.clone();mat.mainPass.baseColor=color;visual.mainMaterial=mat;return obj
  }
  private sphere():RenderMesh {
    const builder=new MeshBuilder([{name:"position",components:3},{name:"normal",components:3}])
    builder.topology=MeshTopology.Triangles;builder.indexType=MeshIndexType.UInt16
    const vertices:number[]=[],indices:number[]=[],rings=12,sides=20
    for(let j=0;j<=rings;j++){const p=j*Math.PI/rings;for(let i=0;i<=sides;i++){const a=i*2*Math.PI/sides,x=Math.sin(p)*Math.cos(a),y=Math.cos(p),z=Math.sin(p)*Math.sin(a);vertices.push(x,y,z,x,y,z)}}
    for(let j=0;j<rings;j++)for(let i=0;i<sides;i++){const a=j*(sides+1)+i,b=a+sides+1;indices.push(a,a+1,b,a+1,b+1,b)}
    builder.appendVerticesInterleaved(vertices);builder.appendIndices(indices);builder.updateMesh();return builder.getMesh()
  }
}

