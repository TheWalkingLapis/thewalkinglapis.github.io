const canvas = document.getElementById("glcanvas");
const gl = canvas.getContext("webgl");

let vertexShaderSource = `
attribute vec4 a_position;
void main() {
  gl_Position = a_position;
}
`;

async function main() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const fragShaderSource = await fetch("./shader/background.frag").then(res => res.text());

  const program = createProgram(vertexShaderSource, fragShaderSource);
  gl.useProgram(program);

  const positionLoc = gl.getAttribLocation(program, "a_position");
  const resolutionLoc = gl.getUniformLocation(program, "u_resolution");
  const timeLoc = gl.getUniformLocation(program, "u_time");

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1, -1, 1, -1, -1, 1,
    -1, 1, 1, -1, 1, 1,
  ]), gl.STATIC_DRAW);

  gl.enableVertexAttribArray(positionLoc);
  gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

  function render(time) {
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
    gl.uniform1f(timeLoc, time * 0.001);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

function createShader(type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}

function createProgram(vsSource, fsSource) {
  const vs = createShader(gl.VERTEX_SHADER, vsSource);
  const fs = createShader(gl.FRAGMENT_SHADER, fsSource);
  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  return program;
}

main();