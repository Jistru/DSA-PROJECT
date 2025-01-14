const { request, response } = require('express')
const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// get all workouts
const getWorkouts = async (request, response) => {
    const workouts = await Workout.find({}).sort({createAt: -1})

    response.status(200).json(workouts)
}

// get a single workout
const getWorkout = async (request, response) => {
    const { id } = request.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findById(id)

    if (!workout){
        return response.status(404).json({error: 'No such workout'})
    }

    response.status(200).json(workout)
}


// create a new workout
const createWorkout = async (request, response) => {
    const {title, load, reps} = request.body

    // add doc to DB
    try{
        const workout = await Workout.create({title, load, reps})
        response.status(200).json(workout)
    } catch(error) {
        response.status(400).json({error: error.message})
    }
}


// delete a workout
const deleteWorkout = async (request, response) => {
    const { id } = request.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findOneAndDelete({_id: id })

    if (!workout){
        return response.status(404).json({error: 'No such workout'})
    }

    response.status(200).json(workout)
}


// update a workout
const updateWorkout = async (request, response) => {
    const { id } = request.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findByIdAndUpdate({_id: id}, {
        ...request.body
    })

    if (!workout){
        return response.status(404).json({error: 'No such workout'})
    }

    response.status(200).json(workout)

}


module.exports = {
    getWorkout,
    getWorkouts,
    createWorkout,
    deleteWorkout,
    updateWorkout
}