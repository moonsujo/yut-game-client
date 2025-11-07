uniform sampler2D uMoonTexture;
uniform vec3 uSunDirection;
uniform vec3 uAtmosphereDayColor;
uniform vec3 uAtmosphereTwilightColor;
uniform float uAtmosphereColorFactor;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main()
{
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    vec3 normal = normalize(vNormal);
    vec3 color = vec3(0.0);

    // Moon
    vec3 moonColor = texture(uMoonTexture, vUv).rgb;
    
    // Brighter and whiter moon
    vec3 whiteTint = vec3(1.2, 1.15, 1.0); // Slightly warm white
    moonColor = moonColor * whiteTint * 2.5; // Much brighter
    
    color = moonColor;

    // Sun orientation
    float sunOrientation = dot(uSunDirection, normal);

    // Fresnel for subtle glow
    float fresnel = dot(viewDirection, normal) + 1.0;
    fresnel = pow(fresnel, 2.0);

    // Atmosphere with subtle glow
    float atmosphereDayMix = smoothstep(-0.5, 1.0, sunOrientation);
    vec3 atmosphereColor = mix(uAtmosphereTwilightColor, uAtmosphereDayColor, atmosphereDayMix);
    atmosphereColor *= uAtmosphereColorFactor;
    color = mix(color, atmosphereColor, fresnel * atmosphereDayMix * 0.2);

    // Final color
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}