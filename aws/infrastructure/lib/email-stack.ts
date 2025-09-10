import { Stack, StackProps, CfnOutput, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as lambdaNodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as apigateway from 'aws-cdk-lib/aws-apigatewayv2';
import * as integrations from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as path from 'path';
import * as logs from 'aws-cdk-lib/aws-logs';
import { AccessLogFormat } from "aws-cdk-lib/aws-apigateway";

export class EmailStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const emailFunctionLogGroup = new logs.LogGroup(this, 'EmailFunctionLogs', {
            retention: logs.RetentionDays.ONE_WEEK,
        });

        const emailFunction = new lambdaNodejs.NodejsFunction(
            this,
            'EmailHandler',
            {
                entry: path.join(__dirname, '../../lambda/email-handler/index.ts'),
                runtime: lambda.Runtime.NODEJS_20_X,
                architecture: lambda.Architecture.ARM_64,
                handler: 'handler',
                memorySize: 256,
                timeout: Duration.seconds(10),
                tracing: lambda.Tracing.ACTIVE,
                insightsVersion: lambda.LambdaInsightsVersion.VERSION_1_0_391_0,
                logGroup: emailFunctionLogGroup,
                environment: { NODE_OPTIONS: '--enable-source-maps' },
                bundling: {
                    minify: true,
                    sourceMap: true,
                    target: 'es2022',
                    externalModules: ['@aws-sdk/client-ses'],
                },
            },
        );

        // SES разрешения
        emailFunction.addToRolePolicy(new iam.PolicyStatement({
            effect: iam.Effect.ALLOW,
            actions: [
                'ses:SendEmail',
                'ses:SendRawEmail',
            ],
            resources: ['*'],
            // TODO ограничить ресурсы для прода
            // resources: [
            //     // разрешённый домен
            //     'arn:aws:ses:eu-central-1:123456789012:identity:coralworld.eu',
            //     // разрешённый адрес
            //     'arn:aws:ses:eu-central-1:123456789012:identity:andreywirz@gmail.com',
            // ],
        }));

        // HTTP API Gateway
        const httpApi = new apigateway.HttpApi(this, 'EmailApi-v3', {
            description: 'Coral Club Contact Form API (CDK v3)',
            corsPreflight: {
                allowOrigins: ['http://angular.coralworld.eu', 'http://localhost:8080'],
                allowMethods: [
                    apigateway.CorsHttpMethod.GET,
                    apigateway.CorsHttpMethod.POST,
                    apigateway.CorsHttpMethod.OPTIONS,
                ],
                allowHeaders: ['Content-Type', 'Authorization'],
                maxAge: Duration.days(10),
            },
        });

        const apiLogGroup = new logs.LogGroup(this, 'EmailApiAccessLogs', {
            retention: logs.RetentionDays.ONE_WEEK,
        });

        new apigateway.HttpStage(this, 'ProdStage', {
            httpApi,
            stageName: 'prod',
            autoDeploy: true,
            accessLogSettings: {
                destination: new apigateway.LogGroupLogDestination(apiLogGroup),
                format: AccessLogFormat.custom(JSON.stringify({
                    requestId: "$context.requestId",
                    sourceIp: "$context.identity.sourceIp",
                    method: "$context.httpMethod",
                    userContext: {
                        sub: "$context.authorizer.claims.sub",
                        email: "$context.authorizer.claims.email"
                    }
                }))
            }
        });

        httpApi.addRoutes({
            path: '/contact',
            methods: [apigateway.HttpMethod.POST],
            integration: new integrations.HttpLambdaIntegration(
                'EmailIntegration',
                emailFunction,
            ),
        });

        // Выводим API URL
        new CfnOutput(this, 'CoralBusinessEmailApiUrl-v3', {
            value: httpApi.url!,
            description: 'Contact Form API Gateway URL (CDK v3)',
            exportName: 'CoralBusinessEmailApiUrl',
        });
    }
}