class Sphere
{
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

	}
	
	draw()
	{
		
		var translationMatrix = mat4.create();
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