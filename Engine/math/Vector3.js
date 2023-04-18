export class Vector3 {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x
    this.y = y
    this.z = z
  }

  static get ZERO() {
    return new Vector3(0, 0, 0)
  }

  static get ONE() {
    return new Vector3(1, 1, 1)
  }

  static FromJSON(json) {
    let x = 0
    let y = 0
    let z = 0

    if (json.x) {
      x = json.x
    }

    if (json.y) {
      y = json.y
    }

    if (json.z) {
      z = json.z
    }

    return new Vector3(x, y, z)
  }

  FromJSON(json) {
    if (json.x) {
      this.x = json.x
    }

    if (json.y) {
      this.y = json.y
    }

    if (json.z) {
      this.z = json.z
    }

    return this
  }

  ToArray() {
    return [this.x, this.y, this.z]
  }

  To32Array() {
    return new Float32Array(this.ToArray())
  }

  Add(vector) {
    this.x += vector.x
    this.y += vector.y
    this.z += vector.z

    return this
  }

  Sub(vector) {
    this.x -= vector.x
    this.y -= vector.y
    this.z -= vector.z

    return this
  }

  Div(vector) {
    this.x /= vector.x
    this.y /= vector.y
    this.z /= vector.z

    return this
  }

  Mul(vector) {
    this.x *= vector.x
    this.y *= vector.y
    this.z *= vector.z

    return this
  }

  Clone() {
    return new Vector3(this.x, this.y, this.z)
  }
}
