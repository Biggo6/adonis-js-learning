'use strict'

class RedirectIfAuthed {
  async handle ({ response, session, auth }, next) {
    // call next to advance the request

    if(auth.user) {
      session.flash({ notification: 'You did it!'})
      return response.redirect('/dashboard')
    }


    await next()
  }
}

module.exports = RedirectIfAuthed
