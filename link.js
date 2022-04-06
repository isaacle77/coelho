class Link{
  constructor(corpo1,corpo2){
      var ultimolink = corpo1.body.bodies.length-2;
      this.link = Constraint.create({
         bodyA : corpo1.body.bodies[ultimolink],
         pointA : {x:0,y:0},
         bodyB : corpo2,
         length : -10,
         stiffness : 0.01
        })
     World.add(world,this.link);
     
  
  }

  desconectar(){
   World.remove(world, this.link);

  }


}
