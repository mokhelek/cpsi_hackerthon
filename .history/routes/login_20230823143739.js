
export default function login_route() {

    
    function show(req, res) {
        res.render("login")
    }

    return {
        show
    }

}


