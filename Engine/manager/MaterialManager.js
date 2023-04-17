import { Material } from '../renderer/extras/Material.js'

export class MaterialManager {
  static materials = {}

  /**
   * Adds a material to the table
   *
   * @param {string} materialName The material name to add under
   * @param {Material} material The material
   * @returns {Material}
   */
  static Add(materialName, material) {
    if (this.materials[materialName]) {
      return this.materials[materialName]
    }

    this.materials[materialName] = material
    return this.materials[materialName]
  }

  /**
   * @param {string} materialName
   * @returns {Material}
   */
  static Get(materialName) {
    return this.materials[materialName] || null
  }
}
