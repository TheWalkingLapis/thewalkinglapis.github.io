#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec3 color = vec3(0.0);
    float slowdown = 10.0;

    color = vec3(st.x, st.y, abs(sin(u_time / slowdown)));

    gl_FragColor = vec4(color, 1.0);
}