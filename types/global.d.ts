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
      _id: string;
      index: number;
      author: string;
      created_at: string;
      content: {
        [key: string]: {
          question: string;
          points: number;
          correctAnswer: number;
          answers: string[];
        };
      };
      category: string;
    }
};