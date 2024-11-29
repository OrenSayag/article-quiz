import { z } from 'zod';
import { ApiBaseResponse } from './app.types';
export type QuizAnswer = {
    isCorrect: boolean;
    text: string;
};
export type QuizQuestion = {
    question: string;
    answers: QuizAnswer[];
};
export type Quiz = {
    questions: QuizQuestion[];
};
export declare const quizSchema: z.ZodObject<{
    questions: z.ZodArray<z.ZodObject<{
        question: z.ZodString;
        answers: z.ZodArray<z.ZodObject<{
            isCorrect: z.ZodBoolean;
            text: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            isCorrect: boolean;
            text: string;
        }, {
            isCorrect: boolean;
            text: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        question: string;
        answers: {
            isCorrect: boolean;
            text: string;
        }[];
    }, {
        question: string;
        answers: {
            isCorrect: boolean;
            text: string;
        }[];
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    questions: {
        question: string;
        answers: {
            isCorrect: boolean;
            text: string;
        }[];
    }[];
}, {
    questions: {
        question: string;
        answers: {
            isCorrect: boolean;
            text: string;
        }[];
    }[];
}>;
export declare const genQuizRequestBodySchema: z.ZodObject<{
    type: z.ZodLiteral<"url">;
    data: z.ZodObject<{
        url: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        url: string;
    }, {
        url: string;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        url: string;
    };
    type: "url";
}, {
    data: {
        url: string;
    };
    type: "url";
}>;
declare const GenQuizRequestBodyDto_base: import("nestjs-zod").ZodDto<{
    data: {
        url: string;
    };
    type: "url";
}, z.ZodObjectDef<{
    type: z.ZodLiteral<"url">;
    data: z.ZodObject<{
        url: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        url: string;
    }, {
        url: string;
    }>;
}, "strip", z.ZodTypeAny>, {
    data: {
        url: string;
    };
    type: "url";
}>;
export declare class GenQuizRequestBodyDto extends GenQuizRequestBodyDto_base {
}
export type GenQuizResponseBody = ApiBaseResponse<Quiz>;
export {};
