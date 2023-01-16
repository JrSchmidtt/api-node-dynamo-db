import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import * as awsConfig from '../config/aws';

AWS.config.update(awsConfig);

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const tableName = 'books';

class BookService {
    constructor() {
        this.dynamoDb = dynamoDb;
    }
    async createBook(book) {
        const params = {
            TableName: tableName,
            Item: {
                id: uuidv4(),
                title: book.title,
            },
        };
        try {
            await this.dynamoDb.put(params).promise();
            return params.Item;
        } catch (error) {
            return { error };
        }
    }
    async getBooks() {
        const params = {
            TableName: tableName,
        };
        try {
            const result = await this.dynamoDb.scan(params).promise();
            return result.Items;
        } catch (error) {
            return { error };
        }
    }
    async getBook(id) {
        const params = {
            TableName: tableName,
            Key: {
                id,
            },
        };
        try {
            const result = await this.dynamoDb.get(params).promise();
            return result.Item;
        } catch (error) {
            return { error };
        }
    }
    async updateBook(id, book) {
        const params = {
            TableName: tableName,
            Key: {
                id,
            },
            UpdateExpression: 'set title = :title',
            ExpressionAttributeValues: {
                ':title': book.title,
            },
            ReturnValues: 'ALL_NEW',
        };
        try {
            const result = await this.dynamoDb.update(params).promise();
            return result.Attributes;
        } catch (error) {
            return { error };
        }
    }
    async deleteBook(id) {
        const params = {
            TableName: tableName,
            Key: {
                id,
            },
        };
        try {
            return await this.dynamoDb.delete(params).promise();
        } catch (error) {
            return { error };
        }
    }
}

export default new BookService();