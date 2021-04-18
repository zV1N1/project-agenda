const mongoose = require('mongoose');
const validator = require('validator')

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: false, default: '' },
  email: { type: String, required: false, default: '' },
  phone: { type: String, required: false, default: '' },
  createAt: { type: Date, default: Date.now },
});

const ContactModel = mongoose.model('Contact', ContactSchema);

class Contact {
  constructor(body) {
    this.body = body
    this.errors = []
    this.contact = null
  }

  async register() {
    this.valida()

    if (this.errors.length > 0) return
    this.contact = await ContactModel.create(this.body)
  }

  valida() {
    this.cleanUp()

    if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido')

    if(!this.body.name) this.errors.push('Nome é um campo obrigatório.') 
    if(!this.body.email && !this.body.phone) {
      this.errors.push('Pelos menos um contato precisa ser enviado: e-mail or phone')
    }
  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = ''
      }
    }

    this.body = {
      name: this.body.name,
      lastName: this.body.lastName,
      email: this.body.email,
      phone: this.body.phone,
    }
  }

  async edit(id) {
    if(typeof id !== 'string') return
    this.valida
    if(this.errors.length > 0) return
    this.contact = await ContactModel.findByIdAndUpdate(id, this.body, { new: true })

  }
}

// methods static
Contact.searchById = async (id) => {
  if (typeof id !== 'string') return
  const user = await ContactModel.findById(id)
  return user
}

Contact.searchContacts = async () => {
  const contact = await ContactModel.find()
    .sort({ createAt: -1 })
  return contact
}

Contact.delete = async (id) => {
  if (typeof id !== 'string') return
  const contact = await ContactModel.findOneAndDelete({_id: id})
  return contact
}

module.exports = Contact;
