// Chrome-blob shaders in the reference palette:
// #A8D4DC teal, #959BB9 periwinkle, #73617B mauve, #46292B cocoa, #000 black

export const VERT = /* glsl */ `
uniform float uTime, uAmp, uSplit, uPullAmt;
uniform vec3 uPull;
varying vec3 vN, vV;
float h(vec3 p){ return sin(p.x*2.1+uTime)*sin(p.y*2.3-uTime*.8)*sin(p.z*1.9+uTime*.6); }
void main(){
  vec3 p = position;
  float d = h(p*1.4)*uAmp + h(p*3.1+uTime*.3)*uAmp*.3;
  d += uSplit*sin(atan(p.y,p.x)*4.0+uTime*1.2)*.25;
  p += normal*d;
  p += (uPull-p)*exp(-length(p-uPull)*1.4)*uPullAmt;
  vec3 nn = normal;
  if (uAmp > .001) nn = normalize(normal + normalize(p-position+vec3(.0001))*.3);
  vec4 mv = modelViewMatrix*vec4(p,1.);
  vN = normalize(normalMatrix*nn);
  vV = -mv.xyz;
  gl_Position = projectionMatrix*mv;
}`

export const FRAG = /* glsl */ `
precision highp float;
uniform float uTime;
varying vec3 vN, vV;
vec3 pal(float t){ return .5+.5*cos(6.2832*(vec3(0.,.33,.67)+t)); }
void main(){
  vec3 n = normalize(vN), v = normalize(vV);
  float f = pow(1.-max(dot(n,v),0.), 2.2);
  vec3 teal=vec3(.659,.831,.863), peri=vec3(.584,.608,.725), mauve=vec3(.451,.38,.482), cocoa=vec3(.275,.16,.17);
  float band = n.y*.5+.5+.25*sin(n.x*5.+uTime*.6);
  vec3 chrome = mix(mauve, teal, smoothstep(.15,.85,band));
  chrome = mix(chrome, peri, smoothstep(.6,1.,sin(n.x*3.+n.y*2.)*.5+.5)*.6);
  chrome = mix(chrome, cocoa, smoothstep(.2,0.,band)*.7);
  vec3 irid = pal(f*1.2+n.x*.3+uTime*.05)*.55+.45; // iridescent sheen accent
  vec3 col = mix(chrome, irid, f*.8);
  col += pow(max(dot(reflect(-normalize(vec3(.6,.8,.7)),n),v),0.),40.)*.9;
  col += pow(f,3.)*.25;
  gl_FragColor = vec4(col,1.);
}`
