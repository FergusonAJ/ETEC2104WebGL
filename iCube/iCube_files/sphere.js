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

	}
	
	draw()
	{
		
		var translationMatrix = mat4.create();
		mat4.translate(translationMatrix, mat4.create(), [0,0,-3]);
		mat4.transpose(translationMatrix, translationMatrix);
		//mat4.mul(worldMatrix, rotMatrix, translationMatrix);
		mat4.scale(worldMatrix, translationMatrix, vec3.fromValues(0.5,0.5,1))
		mat4.translate(worldMatrix, worldMatrix, [2,0,0]);
		ctx.uniform1f(isBillboardLoc,1.0);
		ctx.uniformMatrix4fv(worldMLoc,false,worldMatrix);
		
		ctx.bindBuffer(ctx.ARRAY_BUFFER, this.vBuff);
		ctx.bindBuffer(ctx.ELEMENT_ARRAY_BUFFER, this.iBuff);
		ctx.vertexAttribPointer(vertpa, 3, ctx.FLOAT, false, 0, 0);
		ctx.drawElements(ctx.TRIANGLES, this.indices.length, ctx.UNSIGNED_SHORT,0);
	}
}