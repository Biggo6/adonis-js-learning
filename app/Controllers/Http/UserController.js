'use strict'


const { validateAll } = use('Validator');


const User = use('App/Models/User')

const Mail = use('Mail')

class UserController {
    signup({response, view}) {
        return view.render('auth.signup');
    }

    signin({response, view}) {
        return view.render('auth.signing');
    }

    async store({request, session, response, auth}) {

        const body = request.all();

    
        let { username, password, email} = body;

        const user = await User.create({
            username,
            password,
            email
        })

        session.flash({
            notification: 'Successfully'
        });

        await auth.login(user);


        await Mail.send('emails.welcome', { user }, (message) => {
            message.from('noreply@izweb.co.tz')
            message.to(user.email)
        })


        return response.redirect('back')
    }

    async login({ response, auth, request, session }) {
        const body = request.all();
        
        let { email, password } = request.all();

        try {
            await auth.attempt(email, password) 
            session.flash({
                notification : "Login Successfully"
            })
        } catch (error) {
           console.log(error) 
           session.flash({
            error : "Invalid User"
        })
           return response.redirect('back')
        }

        


        return response.redirect('/')
    }
}

module.exports = UserController
