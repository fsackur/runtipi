import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql';
import AppsService from './apps.service';
import { AppInputType, ListAppsResonse } from './apps.types';
import App from './app.entity';

@Resolver()
export default class AppsResolver {
  @Query(() => ListAppsResonse)
  listAppsInfo(): Promise<ListAppsResonse> {
    return AppsService.listApps();
  }

  @Query(() => App)
  getApp(@Arg('id', () => String) id: string): Promise<App> {
    return AppsService.getApp(id);
  }

  @Authorized()
  @Query(() => [App])
  async installedApps(): Promise<App[]> {
    return App.find();
  }

  @Authorized()
  @Mutation(() => App)
  async installApp(@Arg('input', () => AppInputType) input: AppInputType): Promise<App> {
    const { id, form, exposed, domain } = input;

    return AppsService.installApp(id, form, exposed, domain);
  }

  @Authorized()
  @Mutation(() => App)
  async startApp(@Arg('id', () => String) id: string): Promise<App> {
    return AppsService.startApp(id);
  }

  @Authorized()
  @Mutation(() => App)
  async stopApp(@Arg('id', () => String) id: string): Promise<App> {
    return AppsService.stopApp(id);
  }

  @Authorized()
  @Mutation(() => App)
  async uninstallApp(@Arg('id', () => String) id: string): Promise<App> {
    return AppsService.uninstallApp(id);
  }

  @Authorized()
  @Mutation(() => App)
  async updateAppConfig(@Arg('input', () => AppInputType) input: AppInputType): Promise<App> {
    const { id, form, exposed, domain } = input;

    return AppsService.updateAppConfig(id, form, exposed, domain);
  }

  @Authorized()
  @Mutation(() => App)
  async updateApp(@Arg('id', () => String) id: string): Promise<App> {
    return AppsService.updateApp(id);
  }
}
