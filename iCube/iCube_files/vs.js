var vs = `

precision highp float;

attribute vec3 vertexPosition;
uniform float linePos[4];
varying vec3 vPos;

uniform mat4 worldMatrix;
uniform mat4 viewMatrix;
uniform mat4 projMatrix;
uniform float isBillboard;
uniform float scale;
void main(void)
{
	vPos = vertexPosition;
	vec4 p;
	if(isBillboard == 0.0)
	{
		p = vec4(vertexPosition.xyz, 1.0);
	}
	else
	{
		p = vec4(0,0,0,1);
	}
	p = p * worldMatrix;
	p = viewMatrix * p;
	p = projMatrix * p;
	if(isBillboard != 0.0)
	{
		p += vec4(vertexPosition.xyz, 1.0) * scale;
	}
	gl_Position = p;
}
`;