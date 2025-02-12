import { MongoClient } from "mongodb";

declare global {
    var _mongoClientPromise: Promise<MongoClient>
    
    interface User {
        _id: ObjectId;
        email: string;
        username: string;
        password: string;
        points: number;
        role: string;
        created_at: Date;
        updated_at: Date;
    };

    interface Quiz {
        _id: ObjectId;
        index: number;
        author: ObjectId;
        created_at: Date;
        category: string;
        content: {
          [key: number]: {
            question: string;
            answers: string[];
            points: number;
          };
        };
      }      
};