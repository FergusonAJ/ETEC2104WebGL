var vs = `

precision highp float;

attribute vec3 vertexPosition;
uniform float linePos[4];
varying vec3 vPos;

uniform mat4 worldMatrix;
uniform mat4 viewMatrix;
uniform mat4 projMatrix;

void main(void)
{
	vPos = vertexPosition;
	vec4 p = vec4(vertexPosition.xyz, 1.0);
	p = p * worldMatrix;
	p = viewMatrix * p;
	p = projMatrix * p;
	gl_Position = p;
}
`;