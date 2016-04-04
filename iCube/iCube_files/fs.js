var fs = `

precision highp float;
uniform float linePos[4];
uniform float isBillboard;
varying vec3 vPos;

void main(void)
{
	if(isBillboard > 0.0)
	{
		float dist = distance(vPos, vec3(0.0, 0.0, vPos.z));
		vec4 color;
		if (dist <= 1.0)
		{
			//color = vec4(1.0 - dist, 1.0 - dist, 0.0, 1.0 - dist);
			color = vec4(1.0 - dist, 1.0 - dist + 0.50, dist, 1.0 - dist);
			//color = vec4(1.0 - dist + dist, 1.0 - dist + dist, 0.5 - dist + dist, 1.0 - dist);
		}
		//else 
		{
			//color = vec4(0.0, 0.0, 1.0, 1.0);
		}
		gl_FragColor = color;
	}
	else
	{
		gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
	}
}
`;