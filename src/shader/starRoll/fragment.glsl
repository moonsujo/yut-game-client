uniform vec3 uColor;
uniform float uShiny;
uniform float uProgress;

float remap(float value, float xMin, float xMax, float yMin, float yMax) {
    return yMin + (value - xMin) * (yMax - yMin) / (xMax - xMin);
}

// Function to convert HSV to RGB
vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main()
{
    if (uShiny == 0.0) {
        gl_FragColor = vec4(uColor, 1.0);
    } else {
        float timeColor = mod(uProgress, 0.5); // how many times to cycle
        float speedColor = 2.0;
        float hue = 0.3 + 0.2 * mod(timeColor * speedColor, 1.0); 
        float sat = 0.7 + 0.6 * mod(timeColor * speedColor, 1.0); 

        vec3 shinyColor = hsv2rgb(vec3(hue, sat, 0.8));
        gl_FragColor = vec4(shinyColor, 1.0);
    }

    #include <tonemapping_fragment>
}