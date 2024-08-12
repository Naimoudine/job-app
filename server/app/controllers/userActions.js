const tables = require('../../database/tables')

async function browse(req, res, next) {
  try {
    const users = await tables.users.readAll()
    res.json(users)
  }
  catch (error) {
    next(error)
  }
}

async function readById(req, res, next) {
  try {
    const user = await tables.users.readById(req.params.userId)
    if (!user) {
      res.status(409).json({ message: 'No user found' })
      return
    }

    res.json(user)
  }
  catch (error) {
    next(error)
  }
}

async function readApplications(req, res, next) {
  try {
    const applications = await tables.users.readApplications(req.params.userId)
    if (!applications) {
      res.status(404).json({ message: 'No applications found' })
    }
    res.json(applications)
  }
  catch (error) {
    next(error)
  }
}

async function readBoomarks(req, res, next) {
  try {
    const bookmarks = await tables.users.readBookmarks(req.params.userId)
    if (!bookmarks) {
      res.status(404).json({ message: 'No bookmarks found' })
    }
    res.json(bookmarks)
  }
  catch (error) {
    next(error)
  }
}

async function edit(req, res, next) {
  console.log('ici')
  try {
    const uploadDest = `${process.env.HOST_URL}/${req.file.filename}`
    req.body.cv = uploadDest
    const affectedRows = await tables.users.update(req.body, req.params.userId)
    res.status(204).json(affectedRows)
  }
  catch (error) {
    next(error)
  }
}

async function editPicture(req, res, next) {
  try {
    const uploadDest = `${process.env.HOST_URL}/images/`
    const picture = uploadDest + req.file.filename
    const affectedRows = await tables.users.updatePicture(
      picture,
      req.params.userId,
    )
    res.status(204).json(affectedRows)
  }
  catch (error) {
    next(error)
  }
}

async function addApply(req, res, next) {
  try {
    const insertedId = await tables.users.createApply(
      req.params.userId,
      req.params.offerId,
      req.file.path,
    )
    res.status(201).json(insertedId)
  }
  catch (error) {
    next(error)
  }
}

async function addBookmark(req, res, next) {
  try {
    const insertId = await tables.users.createBookmark(
      req.params.userId,
      req.params.offerId,
    )
    res.status(201).json(insertId)
  }
  catch (error) {
    next(error)
  }
}

async function add(req, res, next) {
  try {
    const userExists = await tables.users.readByEmail(req.body.email)

    if (userExists) {
      res.status(409).json({ message: 'Email already in use. Please log in.' })
    }

    const insertId = await tables.users.create(req.body)

    if (!insertId) {
      throw new Error('Error while creating account')
    }

    res.status(201).json({ insertId })
  }
  catch (error) {
    next(error)
  }
}

async function destroyApplication(req, res, next) {
  try {
    const affectedRows = await tables.users.deleteApplication(
      req.params.userId,
      req.params.offerId,
    )
    res.status(204).json(affectedRows)
  }
  catch (error) {
    next(error)
  }
}

async function destroyBookmark(req, res, next) {
  try {
    const affectedRows = await tables.users.deleteBookmark(
      req.params.userId,
      req.params.offerId,
    )

    res.status(204).json(affectedRows)
  }
  catch (error) {
    next(error)
  }
}

module.exports = {
  browse,
  readById,
  readApplications,
  readBoomarks,
  edit,
  editPicture,
  add,
  addApply,
  addBookmark,
  destroyApplication,
  destroyBookmark,
}
