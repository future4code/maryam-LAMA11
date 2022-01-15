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

app.get('/group/:id', groupController.getById)
app.get('/shows/:day', showController.getAll)