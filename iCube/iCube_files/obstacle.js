//Super simple cube class, to get the cube data and drawing out of the main code
class Obstacle
{
	//Initialize the cube's data
	constructor()
	{
		this.vBuff = ctx.createBuffer();
		ctx.bindBuffer(ctx.ARRAY_BUFFER, this.vBuff);
						 
		this.vertices = [
			// Front face
		  -0.2, -0.2,  0.2,
		   0.2, -0.2,  0.2,
		   0.2,  0.2,  0.2,
		  -0.2,  0.2,  0.2,
		  
		  // Back face
		  -0.2, -0.2, -0.2,
		  -0.2,  0.2, -0.2,
		   0.2,  0.2, -0.2,
		   0.2, -0.2, -0.2,
		  
		  // Top face
		  -0.2,  0.2, -0.2,
		  -0.2,  0.2,  0.2,
		   0.2,  0.2,  0.2,
		   0.2,  0.2, -0.2,
		  
		  // Bottom face
		  -0.2, -0.2, -0.2,
		   0.2, -0.2, -0.2,
		   0.2, -0.2,  0.2,
		  -0.2, -0.2,  0.2,
		  
		  // Right face
		   0.2, -0.2, -0.2,
		   0.2,  0.2, -0.2,
		   0.2,  0.2,  0.2,
		   0.2, -0.2,  0.2,
		  
		  // Left face
		  -0.2, -0.2, -0.2,
		  -0.2, -0.2,  0.2,
		  -0.2,  0.2,  0.2,
		  -0.2,  0.2, -0.2
		];
		
		ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array(this.vertices), ctx.STATIC_DRAW);
		
		
		
		this.ColorBuffer = ctx.createBuffer();
		ctx.bindBuffer(ctx.ARRAY_BUFFER, this.ColorBuffer);
		
		this.colors = [
			[1.0,  1.0,  1.0,  1.0],    // Front face: white
			[1.0,  0.0,  0.0,  1.0],    // Back face: red
			[0.0,  1.0,  0.0,  1.0],    // Top face: green
			[0.0,  0.0,  1.0,  1.0],    // Bottom face: blue
			[1.0,  1.0,  0.0,  1.0],    // Right face: yellow
			[1.0,  0.0,  1.0,  1.0]     // Left face: purple
		];
		var generatedColors=[];
		for (var j=0; j<6; j++) {
			for (var i=0; i<4; i++) {
				generatedColors = generatedColors.concat(this.colors[j]);
			}
		}
		
		
		
		ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array(generatedColors), ctx.STATIC_DRAW);
		
		this.iBuff = ctx.createBuffer();
		ctx.bindBuffer(ctx.ELEMENT_ARRAY_BUFFER,this.iBuff);
		
		this.indices = [
			0,  1,  2,      0,  2,  3,    // front
			4,  5,  6,      4,  6,  7,    // back
			8,  9,  10,     8,  10, 11,   // top
			12, 13, 14,     12, 14, 15,   // bottom
			16, 17, 18,     16, 18, 19,   // right
			20, 21, 22,     20, 22, 23    // left
		];



		ctx.bufferData(ctx.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), ctx.STATIC_DRAW);		



		

	}
	
	//Draw the cube to the screen
	draw()
	{
		ctx.uniform1f(isBillboardLoc,0.0);
		ctx.bindBuffer(ctx.ARRAY_BUFFER, this.vBuff);
		ctx.bindBuffer(ctx.ELEMENT_ARRAY_BUFFER, this.iBuff);
		ctx.vertexAttribPointer(vertpa, 3, ctx.FLOAT, false, 0, 0);
		ctx.drawElements(ctx.TRIANGLES, this.indices.length, ctx.UNSIGNED_SHORT,0);
	}
}