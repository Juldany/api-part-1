const models = require('../models')
const getdogs = async (request, response) => {
  try {
    const catList = await models.Dogs.findAll({ include: [{ model: models.Breeds }] })
    return response.send(DogList)
  } catch (error) {
    return response.status(500).send('Unknown error while retrieving animals')
  }
}
const getDogByBreeds = async (request, response) => {
  try {
    const id = parseInt(request.params.id)
    const animal = await models.Animals.findOne({
      where: { id },
      include: [{ model: models.Departments }],
    })
    return animal
      ? response.send(animal)
      : response.sendStatus(404)
  } catch (error) {
    return response.status(500).send('Unknown error while retrieving animal')
  }
}
const createDog = async (request, response) => {
  try {
    const { name, species, departmentId } = request.body
    if (!name || !species || !departmentId) {
      return response.status(400).send('The following attributes are required: name, species, departmentId')
    }
    const newAnimal = await models.Animals.create({ name, species, departmentId })
    return response.status(201).send(newAnimal)
  } catch (error) {
    return response.status(500).send('Unknown error while creating new animal')
  }
}
const deleteDog = async (request, response) => {
  try {
    const id = parseInt(request.params.id)
    const animal = await models.Animals.findOne({ where: { id } })
    if (!animal) return response.status(404).send(`Unknown animal with ID: ${id}`)
    if (animal.protected) return response.status(409).send('Cannot delete protected animals')
    await models.Animals.destroy({ where: { id } })
    return response.send(`Successfully deleted the animal with ID: ${id}`)
  } catch (error) {
    return response.status(500).send('Unknown error while deleting animal')
  }
}
module.exports = {
  getAnimals,
  getAnimalById,
  createAnimal,
  deleteAnimal,
}





