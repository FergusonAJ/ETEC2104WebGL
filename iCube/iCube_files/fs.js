var fs = `

precision highp float;
uniform float linePos[4];
varying float linePosV[4];

void main(void)
{
	gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
}
`;