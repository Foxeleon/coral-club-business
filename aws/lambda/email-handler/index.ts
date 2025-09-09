import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { SES } from 'aws-sdk';

const ses = new SES({ region: 'eu-central-1' });

export const handler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    // CORS headers
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // TODO Для прода указать мой домен
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle preflight
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    try {
        if (!event.body) {
            return { statusCode: 400, headers, body: JSON.stringify({ message: 'Отсутствуют данные' }) };
        }

        const { name, email, message, phone } = JSON.parse(event.body);

        if (!name || !email || !message) {
            return { statusCode: 400, headers, body: JSON.stringify({ message: 'Не заполнены обязательные поля: name, email, message' }) };
        }
        const htmlBody = `
          <html>
            <head>
              <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            </head>
            <body style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">
              <h3 style="color: #0056b3;">Новая заявка с сайта Coral Club</h3>
              <p><strong>Имя:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              ${phone ? `<p><strong>Телефон:</strong> ${phone}</p>` : ''}
              <p><strong>Сообщение:</strong></p>
              <p style="padding: 10px; border-left: 3px solid #ccc;">${message}</p>
              <hr>
              <p style="font-size: 12px; color: #888;"><i>Отправлено: ${new Date().toLocaleString('ru-RU')}</i></p>
            </body>
          </html>
        `;

        const textBody = `
          Новая заявка с сайта Coral Club:
          Имя: ${name}
          Email: ${email}
          ${phone ? `Телефон: ${phone}` : ''}
          Сообщение: ${message}
          Отправлено: ${new Date().toLocaleString('ru-RU')}
        `;

        const params = {
            Source: 'info.coralworld@gmail.com',
            Destination: {
                ToAddresses: ['info.coralworld@gmail.com'],
            },
            Message: {
                Subject: {
                    Data: `Новая заявка от ${name}`,
                    Charset: 'UTF-8',
                },
                Body: {
                    Html: {
                        Data: htmlBody,
                        Charset: 'UTF-8',
                    },
                    Text: {
                        Data: textBody,
                        Charset: 'UTF-8',
                    }
                },
            },
            ReplyToAddresses: [email],
        };

        await ses.sendEmail(params).promise();

        return { statusCode: 200, headers, body: JSON.stringify({ message: 'Email отправлен успешно' }) };

    } catch (error) {
        console.error('Error:', error);
        return { statusCode: 500, headers, body: JSON.stringify({ message: 'Ошибка отправки email', error: error instanceof Error ? error.message : 'Unknown error' }) };
    }
};