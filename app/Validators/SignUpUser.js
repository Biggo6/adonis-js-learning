'use strict'

class SignUpUser {
  get rules () {
    return {
      'username': 'required|unique:users',
      'email': 'required|unique:users',
      'password': 'required'
    }
  }
  async fails(errorMessages) {
    this.ctx.session.withErrors(errorMessages).flashAll();

    return this.ctx.response.redirect('back')
  }

  get messages() {
    return {
      'email.required': 'Email is needed!'
    }
  }
}

module.exports = SignUpUser
