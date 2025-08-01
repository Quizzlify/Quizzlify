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

    interface History {
      _id: ObjectId;
      userId: string;
      quizId: string;
      category: string;
      at: Date;
      answers: {
        [key: number]: {
            isCorrect: boolean;
        }
      }
    }

    interface Quiz {
      _id: ObjectId;
      index: number;
      author: string;
      level: number;
      title: string;
      created_at: string;
      category: string;
      status: "pending" | "published" | "rejected";
      content: {
        [key: string]: {
          question: string;
          points: number | null;
          correctAnswers: number[];
          answers: string[];
        };
      };
    }
};