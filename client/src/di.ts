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
import {US, UserService} from "./services/domain/UserService";
import {UserServiceImpl} from "./services/domain/implementations/UserServiceImpl";
import {HS, HttpService} from "./services/http/HttpService";
import {HttpServiceImpl} from "./services/http/HttpServiceImpl";
import {SCM, SiteComponentModel} from "./components/site/model/SiteComponentModel";
import {SiteComponentModelImpl} from "./components/site/model/SiteComponentModelImpl";
import {SiteService, SS} from "./services/domain/SiteService";
import {SiteServiceImpl} from "./services/domain/implementations/SiteServiceImpl";
import {CookieService, CS} from "./services/cookie/CookieService";
import {CookieServiceImpl} from "./services/cookie/CookieServiceImpl";
import {SDB, SiteDtoBuilder} from "./dtos/builders/SiteDtoBuilder";
import {SiteDtoBuilderImpl} from "./dtos/builders/implementations/SiteDtoBuilderImpl";
import {ReportComponentModel} from "./components/report/model/ReportComponentModel";
import {ReportComponentModelImpl} from "./components/report/model/ReportComponentModelImpl";
import {ReportDtoBuilderImpl} from "./dtos/builders/implementations/ReportDtoBuilderImpl";
import {RDB, ReportDtoBuilder} from "./dtos/builders/ReportDtoBuilder";

const container = new Container();
container.bind<HttpService>(HS).to(HttpServiceImpl);
container.bind<LoginComponentModel>(LCM).to(LoginComponentModelImpl);
container.bind<AlertComponentModel>(ACM).to(AlertComponentModelImpl).inSingletonScope();
container.bind<ProtectedComponentModel>(PCM).to(ProtectedComponentModelImpl).inSingletonScope();
container.bind<CookieService>(CS).to(CookieServiceImpl).inSingletonScope();
container.bind<RegistrationComponentModel>(RCM).to(RegistrationComponentModelImpl);
container.bind<UserService>(US).to(UserServiceImpl);
container.bind<UserDtoBuilder>(UDB).to(UserDtoBuilderImpl);
container.bind<SiteDtoBuilder>(SDB).to(SiteDtoBuilderImpl);
container.bind<AlertDtoBuilder>(ADB).to(AlertDtoBuilderImpl);
container.bind<ReportDtoBuilder>(RDB).to(ReportDtoBuilderImpl);
container.bind<SiteComponentModel>(SCM).to(SiteComponentModelImpl);
container.bind<ReportComponentModel>(RCM).to(ReportComponentModelImpl);
container.bind<SiteService>(SS).to(SiteServiceImpl);

export const DiContainer = container;