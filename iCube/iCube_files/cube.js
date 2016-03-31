class Cube
{
	constructor()
	{
		this.vBuff = ctx.createBuffer();
		ctx.bindBuffer(ctx.ARRAY_BUFFER, this.vBuff);
						 
		var vertices =[1.0, 1.0, -1.0, 
						-1.0,1.0,-1.0,
						-1.0,-1.0,-1.0,
						1.0,-1.0,-1.0,
						1.0, 1.0, 1.0, 
						-1.0,1.0,1.0,
						-1.0,-1.0,1.0,
						1.0,-1.0,1.0];

		this.indices = [0,1, 1,2, 2,3, 3,0,  4,5, 5,6, 6,7, 7,4,  0,4, 1,5, 2,6, 3,7];
						
		ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array(vertices), ctx.STATIC_DRAW);
		ctx.vertexAttribPointer(vertpa, 3, ctx.FLOAT, false, 0, 0);


		this.iBuff = ctx.createBuffer();
		ctx.bindBuffer(ctx.ELEMENT_ARRAY_BUFFER, this.iBuff);
		ctx.bufferData(ctx.ELEMENT_ARRAY_BUFFER, new Int16Array(this.indices), ctx.STATIC_DRAW);

	}
	
	draw()
	{
		ctx.uniform1f(isBillboardLoc,0.0);
		ctx.bindBuffer(ctx.ARRAY_BUFFER, this.vBuff);
		ctx.bindBuffer(ctx.ELEMENT_ARRAY_BUFFER, this.iBuff);
		ctx.vertexAttribPointer(vertpa, 3, ctx.FLOAT, false, 0, 0);
		ctx.drawElements(ctx.LINES, this.indices.length, ctx.UNSIGNED_SHORT,0);
	}
}