var vs = `

precision highp float;

attribute vec3 vertexPosition;
uniform float linePos[4];
varying float linePosV[4];

uniform mat4 worldMatrix;
uniform mat4 viewMatrix;
uniform mat4 projMatrix;

void main(void)
{
	for (int i = 0; i < 4; ++i)
	{
		linePosV[i] = linePos[i];
	}
	vec4 p = vec4(vertexPosition.xyz, 1.0);
	p = p * worldMatrix;
	//p.z = p.z - 12.0;
	p = p * viewMatrix;
	p = p * projMatrix;
	gl_Position = p;
}
`;