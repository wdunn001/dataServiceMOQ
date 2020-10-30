export interface Question {
    id: number;
    text: string;
    type: string;
    required?: boolean;
    min?: number;
    max?: number;
    multiple?: false;
    options?: Option[]
}

export interface Option {
    id: number;
    text: string;
}

export interface QuestionResponse{
    question_id: number;
    text: string;
}