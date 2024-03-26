import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ServeStaticModule } from '@nestjs/serve-static'
import appRootPath from 'app-root-path'
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from './prisma.service'

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: `${appRootPath}/uploads`,
			serveRoot: '/uploads'
		}),
		ConfigModule.forRoot()
	],
	controllers: [AppController],
	providers: [AppService, PrismaService]
})
export class AppModule {}
