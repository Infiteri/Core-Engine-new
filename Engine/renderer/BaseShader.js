import { Shader } from './webgl/Shader.js'

const vertexSource = `
    attribute vec3 aPosition;
    attribute vec2 aUVs;

    uniform mat4 uProjection;
    uniform mat4 uModel;

    varying vec2 vUVs;

    void main()
    {
        gl_Position = uProjection * uModel * vec4(aPosition, 1.0);
        vUVs = aUVs;
    }
`
const fragmentSource = `
    precision mediump float;

    uniform sampler2D uSampler;
    uniform vec4 uColor;
    uniform int useTexture;

    varying vec2 vUVs;

    void main()
    {
      vec4 final = uColor;

      if(useTexture == 1) {
        final = uColor * texture2D(uSampler, vUVs);
      }

      gl_FragColor = final;
    }
`

export class BaseShader extends Shader {
  constructor() {
    super(vertexSource, fragmentSource)
  }
}
