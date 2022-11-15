import {Container} from "inversify";
import {UDB, UserDtoBuilder} from "./dtos/builders/UserDtoBuilder";
import {UserDtoBuilderImpl} from "./dtos/builders/implementations/UserDtoBuilderImpl";
import {ADB, AlertDtoBuilder} from "./dtos/builders/AlertDtoBuilder";
import {AlertDtoBuilderImpl} from "./dtos/builders/implementations/AlertDtoBuilderImpl";
import {LCM, LoginComponentModel} from "./components/login/model/LoginComponentModel";
import {LoginComponentModelImpl} from "./components/login/model/LoginComponentModelImpl";
import {ACM, AlertComponentModel} from "./components/alert/model/AlertComponentModel";
import {AlertComponentModelImpl} from "./components/alert/model/AlertComponentModelImpl";
import {PCM, ProtectedComponentModel} from "./security/model/ProtectedComponentModel";
import {ProtectedComponentModelImpl} from "./security/model/ProtectedComponentModelImpl";
import {RCM, RegistrationComponentModel} from "./components/registration/model/RegistrationComponentModel";
import {RegistrationComponentModelImpl} from "./components/registration/model/RegistrationComponentModelImpl";
import {US, UserService} from "./services/UserService";
import {UserServiceImpl} from "./services/implementations/UserServiceImpl";

const container = new Container();
container.bind<LoginComponentModel>(LCM).to(LoginComponentModelImpl);
container.bind<AlertComponentModel>(ACM).to(AlertComponentModelImpl).inSingletonScope();
container.bind<ProtectedComponentModel>(PCM).to(ProtectedComponentModelImpl).inSingletonScope();
container.bind<RegistrationComponentModel>(RCM).to(RegistrationComponentModelImpl);
container.bind<UserService>(US).to(UserServiceImpl);
container.bind<UserDtoBuilder>(UDB).to(UserDtoBuilderImpl);
container.bind<AlertDtoBuilder>(ADB).to(AlertDtoBuilderImpl);

export const DiContainer = container;
