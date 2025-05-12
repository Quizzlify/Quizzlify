import { MongoClient } from "mongodb";

declare global {
    var _mongoClientPromise: Promise<MongoClient>
    
    interface User {
        _id: ObjectId;
        email: string;
        username: string;
        password: string;
        score: number;
        quizCompleted: number;
        role: string;
        created_at: Date;
        updated_at: Date;
    };

    interface Quiz {
      _id: string;
      index: number;
      author: string;
      level: number;
      title: string;
      created_at: string;
      content: {
        [key: string]: {
          question: string;
          points: number | null;
          correctAnswer: number;
          answers: string[];
        };
      };
      category: string;
    }
};