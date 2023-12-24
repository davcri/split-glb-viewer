export const fullscreenVert = `
void main() {
  gl_Position = vec4(position, 1.0);
}
`;

export const fragmentShader = `
uniform sampler2D map;
uniform sampler2D map2;
uniform vec2 uResolution;

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  vec4 sampledDiffuseColor = texture2D( map, uv );
  vec4 sampledDiffuseColor2 = texture2D( map2, uv );

  gl_FragColor = (step(uv.x, 0.5) * sampledDiffuseColor) + step(0.5, uv.x) * sampledDiffuseColor2;
}`;
