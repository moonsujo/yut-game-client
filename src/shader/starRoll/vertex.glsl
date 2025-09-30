uniform float uSize;
uniform vec2 uResolution;
uniform float uProgress;

float remap(float value, float xMin, float xMax, float yMin, float yMax) {
    return yMin + (value - xMin) * (yMax - yMin) / (xMax - xMin);
}

void main()
{
    float progress = uProgress;
    vec3 newPosition = position;

    // Exploding
    float explodingOpeningProgress = remap(progress, 0.0, 0.1, 0.0, 1.0);
    float explodingClosingProgress = remap(progress, 0.9, 1.0, 1.0, 0.0);
    float explodingProgress = min(explodingOpeningProgress, explodingClosingProgress);
    explodingProgress = clamp(explodingProgress, 0.0, 1.0);
    newPosition *= explodingProgress;

    // Rotating
    float rotatingProgress = remap(progress, 0.0, 1.0, 0.0, 6.28);

    // Cache x and z before rotation
    float x = newPosition.x;
    float z = newPosition.z;

    // Apply rotation. requires matrix
    newPosition.x = x * cos(rotatingProgress) - z * sin(rotatingProgress);
    newPosition.z = x * sin(rotatingProgress) + z * cos(rotatingProgress);

    // Falling
    float fallingProgress = remap(progress, 0.0, 1.0, 0.0, 1.0);
    newPosition.x -= fallingProgress * 8.0;
    newPosition.z += fallingProgress * 4.0;

    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;

    // Final size
    gl_PointSize *= 1.0 / - viewPosition.z;
    gl_PointSize = uSize * uResolution.y;

    if (gl_PointSize < 1.0) {
        gl_Position = vec4(9999.9);
    }
}