uniform sampler2D uMoonTexture;
uniform vec3 uSunDirection;
uniform vec3 uAtmosphereDayColor;
uniform vec3 uAtmosphereTwilightColor;
uniform vec3 uMoonColor;

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
    color = moonColor * uMoonColor;

    // Sun orientation
    // float sunOrientation = dot(uSunDirection, normal);

    // Atmosphere
    // float atmosphereDayMix = smoothstep(- 0.5, 1.0, sunOrientation);
    // vec3 atmosphereColor = mix(uAtmosphereTwilightColor, uAtmosphereDayColor, atmosphereDayMix);
    // atmosphereColor *= 2.0;
    // color = mix(color, atmosphereColor, atmosphereDayMix);

    // Final color
    gl_FragColor = vec4(color, 3.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}