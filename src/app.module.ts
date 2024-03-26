import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ServeStaticModule } from '@nestjs/serve-static'
import appRootPath from 'app-root-path'
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from './prisma.service'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { TaskListModule } from './task-list/task-list.module';

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: `${appRootPath}/uploads`,
			serveRoot: '/uploads'
		}),
		ConfigModule.forRoot(),
		AuthModule,
		UserModule,
		TaskListModule
	],
	controllers: [AppController],
	providers: [AppService, PrismaService]
})
export class AppModule {}
