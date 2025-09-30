uniform vec3 uColor;

void main()
{
    // Final color
    gl_FragColor = vec4(uColor, 1.0);
    // gl_FragColor = vec4(gl_PointCoord, 1.0, 1.0);
    #include <tonemapping_fragment>
    // #include <colorspace_fragment>
}