import { gl } from '../Renderer.js'

export class Shader {
  /**
   * @param {string} vsSource
   * @param {string} fsSource
   */
  constructor(vsSource, fsSource) {
    const vertexShader = this.LoadShader(gl.VERTEX_SHADER, vsSource)
    const fragmentShader = this.LoadShader(gl.FRAGMENT_SHADER, fsSource)

    this.program = this.LoadProgram(vertexShader, fragmentShader)

    this.attributes = {}
    this.uniforms = {}

    this.DetectAttributes()
    this.DetectUniforms()
  }

  Use() {
    gl.useProgram(this.program)
  }

  Vec3(name, x, y, z) {
    const vec3 = this.GetUniLocation(name)
    gl.uniform3f(vec3, x, y, z)
  }
  Vec3fv(name, data) {
    const vec3 = this.GetUniLocation(name)
    gl.uniform3fv(vec3, data)
  }

  Vec4(name, x, y, z, w) {
    const vec3 = this.GetUniLocation(name)
    gl.uniform4f(vec3, x, y, z, w)
  }

  Vec4fv(name, data) {
    const vec3 = this.GetUniLocation(name)
    gl.uniform4fv(vec3, data)
  }

  Int(name, i) {
    const loc = this.GetUniLocation(name)
    gl.uniform1i(loc, i)
  }

  Mat4(name, data) {
    const mat = this.GetUniLocation(name)
    gl.uniformMatrix4fv(mat, false, data)
  }

  GetAttrLocation(name) {
    if (this.attributes[name] === undefined)
      throw new Error(`Unable to find attribute: ${name}`)

    return this.attributes[name]
  }

  GetUniLocation(name) {
    if (this.uniforms[name] === undefined)
      throw new Error(`Unable to find uniform: ${name}`)

    return this.uniforms[name]
  }

  /** @private */
  LoadProgram(vertexShader, fragmentShader) {
    const program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    //! ERROR Checking
    const error = gl.getProgramInfoLog(program).trim()
    if (error !== '') {
      throw new Error(`Unable to create program: ${error} `)
    }

    return program
  }

  /** @private */
  LoadShader(type, source) {
    const shader = gl.createShader(type)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)

    //! ERROR Checking
    const error = gl.getShaderInfoLog(shader).trim()
    if (error !== '') {
      //! Get the shader type
      const shaderType =
        type === gl.FRAGMENT_SHADER ? 'fragment shader' : 'vertex shader'

      throw new Error(`ERROR Compiling the ${shaderType}: ${error} `)
    }

    return shader
  }

  /** @private */
  DetectAttributes() {
    const count = gl.getProgramParameter(this.program, gl.ACTIVE_ATTRIBUTES)

    for (let i = 0; i < count; i++) {
      const attribute = gl.getActiveAttrib(this.program, i)

      if (!attribute) break

      this.attributes[attribute.name] = gl.getAttribLocation(
        this.program,
        attribute.name
      )
    }
  }

  /** @private */
  DetectUniforms() {
    const count = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS)

    for (let i = 0; i < count; i++) {
      const uniform = gl.getActiveUniform(this.program, i)

      if (!uniform) break

      this.uniforms[uniform.name] = gl.getUniformLocation(
        this.program,
        uniform.name
      )
    }
  }
}
