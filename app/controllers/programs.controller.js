const db = require("../models")
const Programs = db.programs

exports.create = (req, res) => {

    if(!req.body.title){
       res.status(400).send({messege: "Content can not be empty!"})
       return
    }

    const programs = new Programs({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false,
        picture: req.body.picture,
        details: req.body.details,
        vactitle: req.body.vactitle,
        vacdetails: req.body.vacdetails,
        applylink: req.body.applylink,
        duration: req.body.duration,
        startdate: req.body.startdate,
        cost: req.body.cost,
        requirements: req.body.requirements


    })

    programs
    .save(programs)
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            messege: 
            err.messege || "Some error occured while creating the Program"
        })
    })
}

exports.findAll = (req, res) => {
    
    const title = req.query.title
    let condition = title ? {title: {$regex: new RegExp(title), $options: "i"}} : {}

    Programs.find(condition)
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            messege:
            err.messege || "Some error occured while retrieve programs"
        })
    })
}


exports.findOne = (req, res) => {
    const id = req.params.id

    Programs.findById(id)
    .then(data => {

        if (!data)
            res.status(404).send({messege: "Programs not found, with id " + id})
        
        else res.send(data)
        
    })
    .catch(err => {
        res.status(500)
        .send({messege: "Error retrieving programs with id" + id})
    })


}

exports.update = (res,req) => {
    if(!req.body) {
        return res.status(400).send({messege: "Data to update can not be empty"})
    }

    const id = req.params.id 

    Programs.findByIdUpdate(id, req.body, {useFindAndModify: false})
    .then(data => {
        if(!data) {
            res.status(404).send({messege: `Cannot update Programs with id=${id}. Maybe Programs was not found`})

        }else res.send({messege: "Programs was updated successfully"})
    })
    .catch(err => {
        res.status({messege: "Error updating Programs with id=" + id})
    })
}


exports.delete = (req,res) => {

    const id = req.params.id 

    Programs.findByIdAndRemove(id, {useFindAndModify: false})
    .then(data => {
        if (!data){
            res.status(404).send({messege: `Cannot delete Programs with id=${id}. Maybe Programs was not found`})
        }
        else{
             res.send({messege: "Programs was deleted successfully"})
        }
    })

    .catch(err => {

        res.status(500).send({messege: "Could not delete programs with id" + id})
    })
}

exports.deleteAll = (req, res) => {
    Programs.deleteMany({})
    .then(data => {
        res.send({messege: `${data.deletedCount} programs were deleted successful`})
    })
    .catch(err => {
        res.status(500).send({messege: err.messege || "Some error occurred while retrieving Programs"})
    })
}

exports.findAllPublished = (req, res) => {
    Programs.find({published: true})
    .then(data => {
        res.send(data)

    })
    .catch(err => {
        res.status(500).send({messege: err.messege || "Some occurred while retrieving programs"})
    })
}