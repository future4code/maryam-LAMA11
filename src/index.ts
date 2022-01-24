import app from "./app";
import GroupController from "./controller/GroupController";
import ShowController from "./controller/ShowController";
import UserController from "./controller/UserController";

const userController = new UserController()
const groupController = new GroupController()
const showController = new ShowController()

app.post('/signup', userController.signup)
app.post('/login', userController.login)
app.post('/create', groupController.create)
app.post('/shows', showController.create)
app.post('/ticket', showController.createTicket)
app.post('/photo/:showId', showController.createPhoto)

app.get('/group/:id', groupController.getById)
app.get('/shows/:day', showController.getAll)
app.get('/photo/:showId', showController.getPhotos)

app.put('/ticket/:ticketId', userController.buyTicket)