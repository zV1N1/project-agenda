const Contact = require('../models/ContactModel')

exports.index = (req, res) => {
    res.render('contact', {
        contact: {}
    })
}

exports.register = async (req, res) => {
    try {
        const contact = new Contact(req.body)
        await contact.register()

        if (contact.errors.length > 0) {
            req.flash('errors', contact.errors)
            req.session.save(() => res.redirect('/contact/index'))
            return
        } 

        
        req.flash('success', 'Contacts successfully registered.')
        req.session.save(() => res.redirect(`/contact/index/${contact.contact._id}`))
        return
          
    } catch(e) {
        return res.render('404')
    }
    
}

exports.editIndex = async (req, res) => {
    if (!req.params.id) return res.render('404')
 
    const contact = await Contact.searchById(req.params.id)

    if (!contact) return res.render('404')
    
    res.render('contact', { contact })
}

exports.edit = async (req, res) => {
    try {
        if(!req.params.id) return res.render(404)
        const contact = new Contact(req.body)
        await contact.edit(req.params.id)
    
        if (contact.errors.length > 0) {
            req.flash('errors', contact.errors)
            req.session.save(() => res.redirect('/contact/index'))
            return
        } 
    
        req.flash('success', 'Contacts updated.')
        req.session.save(() => res.redirect(`/contact/index/${contact.contact._id}`))
        return  
    } catch(e) {
        console.log(e)
        res.render('404')
    }
}

exports.delete = async (req, res) => {
    if (!req.params.id) return res.render('404')

    const contact = await Contact.delete(req.params.id)
    if (!contact) return res.render('404')

    req.flash('success', 'Contact successfully deleted.')
    req.session.save(() => res.redirect(`/`))

}
