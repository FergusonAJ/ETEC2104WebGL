//A basic sphere class. Handles updates, drawing, and launching the sphere
class Sphere
{
	//Create the required data to draw the sphere
	constructor()
	{
		this.vBuff = ctx.createBuffer();
		ctx.bindBuffer(ctx.ARRAY_BUFFER, this.vBuff);
						 
		var vertices = [-1.0,  1.0, 0.0,
				-1.0, -1.0, 0.0,
				 1.0, -1.0, 0.0,
				 1.0,  1.0, 0.0];
				
		this.indices = [0,1,2, 0,2,3];
		ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array(vertices), ctx.STATIC_DRAW);
		ctx.vertexAttribPointer(vertpa, 3, ctx.FLOAT, false, 0, 0);


		this.iBuff = ctx.createBuffer();
		ctx.bindBuffer(ctx.ELEMENT_ARRAY_BUFFER, this.iBuff);
		ctx.bufferData(ctx.ELEMENT_ARRAY_BUFFER, new Int16Array(this.indices), ctx.STATIC_DRAW);
		
		this.position = vec3.fromValues(-1,-1,-1);
		this.velocity = vec3.create();

	}
	
	
	//Update the sphere's position, and do not let it leave the cube
	update(elapsed)
	{
		for(var i = 0; i < 3; i++)
		{
			this.position[i] += this.velocity[i] * elapsed * 0.001;
			if(this.position[i] >= 1)
			{
				this.position[i] = 1;
				this.velocity[i] = 0;
			}
			if(this.position[i] <= -1)
			{
				this.position[i] = -1;
				this.velocity[i] = 0;
			}
		}
	}
	
	//Launch the sphere in the appropriate direction
	launch()
	{
		var refVec = vec4.fromValues(0,0,1,0); //Reference vector
		var dp = 0.0; //Dot Product
		var wMatrix = mat4.create(); //World Matrix
		var transMatrix = mat4.create(); //Translation Matrix
		
		//Prepare the matrices (Fresh copies so they do not rely on the main copies)
		mat4.translate(transMatrix, mat4.create(), [0,0,-3]);
		mat4.transpose(transMatrix, transMatrix);
		mat4.mul(wMatrix, rotMatrix, transMatrix);
		
		//Iterates three times, once for each axis.
		for(var i = 0; i < 3; i++)
		{
			//Positive direction in current axis
			var vec = vec4.create();
			vec[i] = 1;
			var wVec = vec4.create();
			vec4.transformMat4(wVec, vec, mat4.transpose(mat4.create(), wMatrix));
			vec4.transformMat4(wVec, wVec, mat4.transpose(mat4.create(), viewMatrix));
			vec4.transformMat4(wVec, wVec, mat4.transpose(mat4.create(), projMatrix));
			vec4.normalize(wVec, wVec);
			
			var tempDot = vec4.dot(refVec, wVec);
			if(tempDot > dp)
			{
				dp = tempDot;
				this.velocity = vec;
			}
			
			//Negative direction in current axis
			vec = vec4.create();
			vec[i] = -1;
			wVec = vec4.create();
			vec4.transformMat4(wVec, vec, mat4.transpose(mat4.create(), wMatrix));
			vec4.transformMat4(wVec, wVec, mat4.transpose(mat4.create(), viewMatrix));
			vec4.transformMat4(wVec, wVec, mat4.transpose(mat4.create(), projMatrix));
			
			var tempDot = vec4.dot(refVec, wVec);
			if(tempDot > dp)
			{
				dp = tempDot;
				this.velocity = vec;
			}
		}
	}
	
	//Draw the sphere to the screen
	draw()
	{
		
		//This line is super nasty. I still need to refactor from row major to column major. This is a by product of using the wrong format... -Austin
		mat4.mul(worldMatrix,mat4.transpose(mat4.create(), mat4.translate(mat4.create(), mat4.create(), this.position)), worldMatrix);
		ctx.uniform1f(isBillboardLoc,1.0);
		ctx.uniform1f(scaleLoc, 0.25);
		ctx.uniformMatrix4fv(worldMLoc,false,worldMatrix);
		
		ctx.bindBuffer(ctx.ARRAY_BUFFER, this.vBuff);
		ctx.bindBuffer(ctx.ELEMENT_ARRAY_BUFFER, this.iBuff);
		ctx.vertexAttribPointer(vertpa, 3, ctx.FLOAT, false, 0, 0);
		ctx.drawElements(ctx.TRIANGLES, this.indices.length, ctx.UNSIGNED_SHORT,0);
	}
		
}