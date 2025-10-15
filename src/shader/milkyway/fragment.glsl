const float a=1.0;
const float b=.1759;
const float PI=3.14159265359;
uniform float time;
uniform sampler2D texture1;
uniform vec4 colorTint;

varying vec3 Normal;
varying vec3 Position;


float remap(float value, vec2 inval, vec2 outval){
  return (outval.x + (outval.y - inval.x) * (value-inval.x) /(inval.y-inval.x));
}

float spiralSDF(vec2 p,vec2 c){
    // t = theta
    p = p - c;
    float t=atan(p.y, p.x) + time*0.5;
    // t=(t+PI)/(2.*PI);
    float r=length(p.xy);
    
    float n=(log(r/a)/b-t)/(2.*PI);

    // Cap the spiral
    // float nm = (log(0.11)/b-t)/(2.0*PI);
    // n = min(n,nm);
    // return (n+1.0)/100.0;
    float upper_r=a*exp(b*(t+2.*PI*ceil(n)));   
    float lower_r=a*exp(b*(t+2.*PI*floor(n)));
    // float lower_r = 0.0;
    
    float divider = remap(r,vec2(0.0,1.0), vec2(0.0,1.0));
    return min(abs(upper_r-r),abs(r-lower_r))+divider;
}

vec2 calculateUV(vec2 uv, float spiralValue){
    float angle = length(uv) * 1.0;
    float x = cos(spiralValue) * uv.x-sin(spiralValue) * uv.y;
    float y = sin(spiralValue) * uv.x + cos(spiralValue) * uv.y;
    return vec2(x,y);
}

void main(){
    //vec2 R = Position.xy;
    vec2 uv = Position.xy;
    vec2 c = vec2(0.0,0.0);
    
    // Uncomment for more swirl
    // vec2 c = vec2(0.7*sin(iTime*1.3), 0.3*sin(iTime)*2.0);
    float r = length(uv);
    float d = spiralSDF(uv,vec2(c));
    // Alter distance for a satisfying visual
    float v = pow(d, 1.23) / 1.03;
    v = 1.0-v;
    vec2 textureUV = calculateUV(uv,d);
    vec3 texcolor = texture2D(texture1,textureUV).rgb;
    gl_FragColor = vec4((v+texcolor.r)*colorTint.x,(v+texcolor.g)*colorTint.y,(v+texcolor.b)*colorTint.z,v*colorTint.w) ;
    //O.rgb = O.rgb*1.0/r;
    //O.xy=uv;
}