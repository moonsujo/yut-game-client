uniform float uSize;
uniform vec2 uResolution;
uniform float uProgress;
uniform float uScale;

attribute float aSize;
attribute float aTimeMultiplier;

float remap(float value, float xMin, float xMax, float yMin, float yMax) {
    return yMin + (value - xMin) * (yMax - yMin) / (xMax - xMin);
}

float remapLog(float value) {
    return value * 5.0 / (1.0 + value);
}

void main()
{
    float progress = uProgress * aTimeMultiplier;
    vec3 newPosition = position;

    // Exploding
    // float explodingProgress = -(1.0 / progress) + 2.0;
    // float explodingProgress = log2(progress*20.0+1.0)/2.0; // log becomes positive from x = 1
    float explodingOpeningProgress = remap(progress, 0.0, 0.2, 0.0, 1.0);
    float explodingClosingProgress = remap(progress, 0.8, 1.0, 1.0, 0.0);
    float explodingProgress = min(explodingOpeningProgress, explodingClosingProgress);
    explodingProgress = clamp(explodingProgress, 0.0, 1.0);
    // ADD ROTATION
    newPosition *= explodingProgress;

    // Falling
    // fallingProgress = clamp(fallingProgress, 0.0, 1.0);
    // fallingProgress = 1.0 - pow(1.0 - fallingProgress, 3.0);
    float fallingProgress = remap(progress, 0.2, 1.0, 0.0, 1.0);
    newPosition.y -= fallingProgress * 0.2;

    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;

    // Final size
    gl_PointSize = uSize * uResolution.y;
    gl_PointSize *= 1.0 / - viewPosition.z;

    if (gl_PointSize < 1.0) {
        gl_Position = vec4(9999.9);
    }
}