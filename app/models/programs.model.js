module.exports = mongoose => {

    let schema = mongoose.Schema(
        {
        title: String,
        description: String,
        published: Boolean,
        picture: String,
        details: String,
        vactitle: String,
        vacdetails: String,
        applylink: String,
        duration: String,
        startdate: String,
        cost: String,
        requirements: String    },

    {timestamps: true}

    )

    schema.method("toJSON", function(){
        const {__v, _id, ...object} = this.toObject()
        object.id = _id
        return object
    })

    const Programs = mongoose.model("programs", schema)
    return Programs
}