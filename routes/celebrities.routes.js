const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model")

router
    .route("/create")
    .get((req, res) => {
        res.render("celebrities/new-celebrity")
    })
    .post((req, res) => {
        const name = req.body.name
        const occupation = req.body.occupation
        const catchPhrase = req.body.catchPhrase

        Celebrity.create({name, occupation, catchPhrase})
            .then(() => res.redirect("/celebrities"))
            .catch(err=>console.log(err))
    })

router.get("/", (req, res) => {
    Celebrity.find()
        .then((celebrities)=>{
            res.render("celebrities/celebrities", {celebrities})
        }).catch(err=>console.log(err))
})

    
module.exports = router;