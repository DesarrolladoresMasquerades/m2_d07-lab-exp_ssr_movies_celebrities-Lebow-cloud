const router = require("express").Router();
const Movie = require("../models/Movie.model")
const Celebrity = require("../models/Celebrity.model")




router.post("/:id/delete", (req, res)=>{
    Movie.findByIdAndDelete(req.params.id)
        .then(()=>res.redirect("/"))
})



router
    .route("/create")
    .get((req, res)=>{
        Celebrity.find()
            .then((celeb)=>{

                res.render("movies/new-movie", {celeb})
            })
    })
    .post((req, res)=>{

        const {title, genre, plot, cast} = req.body

        Movie.create({title, genre, plot, cast})
            .then(()=>{
              //  console.log(movie)
                res.redirect("/movies")
            }).catch(err=>console.log(err))

    })

    router.get("/:id", (req, res)=>{
        Movie.findById(req.params.id)
            .populate("cast")
            .then((movie)=>{
                console.log(movie)
                res.render("movies/movie-details", movie)
            })
    })



    router.get("/", (req, res)=>{
        Movie.find()
            .then((movieList)=>{
                res.render("movies/movies", {movieList})
            })
    })


module.exports = router;