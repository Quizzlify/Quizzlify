"use client"

import React, { useState, useEffect } from "react";
import { X, Plus, Trash, CheckCircle } from "lucide-react";
import QButton from "@/components/Utilities/QButton";
import QInput from "@/components/Utilities/QInput";

type EditedQuiz = {
    level: number | null;
    title: string | null;
    content: {
      [key: string]: {
        question: string | null;
        points: number | null;
        correctAnswer: number | null;
        answers: string[] | null;
      };
    } | null;
    category: string | null;
}

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    quiz: Quiz | null;
    onSave: (editedQuiz: EditedQuiz) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, quiz, onSave }) => {
    const [activeTab, setActiveTab] = useState<'info' | 'questions'>('info');
    const [activeQuestionKey, setActiveQuestionKey] = useState<string | null>(null);

    const [editedQuiz, setEditedQuiz] = useState<EditedQuiz>({
        level: null,
        title: null,
        content: null,
        category: null,
    });
    
    const handleQuestionChange = (questionKey: string, field: string, value: any) => {
      setEditedQuiz(prev => {
        if (!prev) return prev;
        
        const updatedContent: { [key: string]: { question: string | null; points: number | null; correctAnswer: number | null; answers: string[] | null } } = { ...prev.content };
        updatedContent[questionKey] = {
          ...updatedContent[questionKey],
          [field]: value
        };
        
        return { ...prev, content: updatedContent };
      });
    };

    const handleInfoChange = (field: string, value: any) => {
        setEditedQuiz(prev => {
            if (!prev) return prev;
            return { ...prev, [field]: value };
        });
    };
  
    const handleAnswerChange = (questionKey: string, answerIndex: number, value: string) => {
      setEditedQuiz(prev => {
        if (!prev) return prev;
        
        const updatedContent = { ...prev.content };
        if (!updatedContent[questionKey]) {
          return prev;
        }
        const updatedAnswers = [
        ...(updatedContent[questionKey].answers ?? quiz?.content[questionKey].answers ?? [])
        ];
        updatedAnswers[answerIndex] = value;
        
        updatedContent[questionKey] = {
          ...updatedContent[questionKey],
          answers: updatedAnswers
        };
        
        return { ...prev, content: updatedContent };
      });
    };
  
    const handleCorrectAnswerChange = (questionKey: string, answerIndex: number) => {
      setEditedQuiz(prev => {
        if (!prev) return prev;
        
        const updatedContent = { ...prev.content };
        updatedContent[questionKey] = {
          ...updatedContent[questionKey],
          correctAnswer: answerIndex
        };
        
        return { ...prev, content: updatedContent };
      });
    };
  
    const addNewQuestion = () => {
      const newKey = `q${Object.keys(editedQuiz?.content || {}).length + 1}`;
      
      setEditedQuiz(prev => {
        if (!prev) return prev;
        
        const updatedContent = { ...prev.content };
        updatedContent[newKey] = {
          question: "Nouvelle question",
          points: 1,
          correctAnswer: 0,
          answers: ["Réponse 1", "Réponse 2"]
        };
        
        return { ...prev, content: updatedContent };
      });
      setActiveQuestionKey(newKey);
    };
  
    const removeQuestion = (questionKey: string) => {
        setEditedQuiz((prevQuiz) => {
            if (!prevQuiz) return prevQuiz;
            const updatedContent = { ...prevQuiz.content };
            delete updatedContent[questionKey];
            return { ...prevQuiz, content: updatedContent };
        });
    };
  
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-background-tertiary rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-accent">Modifier le quiz</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>
  
                <div className="flex border-b border-gray-600 mb-6">
                    <button
                        className={`px-4 py-2 ${activeTab === 'info' ? 'border-b-2 border-accent text-accent' : 'text-gray-400'}`}
                        onClick={() => setActiveTab('info')}
                    >
                        Informations générales
                    </button>
                    <button
                        className={`px-4 py-2 ${activeTab === 'questions' ? 'border-b-2 border-accent text-accent' : 'text-gray-400'}`}
                        onClick={() => setActiveTab('questions')}
                    >
                        Questions
                    </button>
                </div>
    
                {activeTab === 'info' && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Titre</label>
                            <QInput
                                type="text"
                                value={
                                    editedQuiz?.title !== null && editedQuiz?.title !== undefined
                                        ? editedQuiz.title
                                        : quiz?.title !== null && quiz?.title !== undefined
                                            ? quiz.title
                                            : ""
                                }
                                onChange={(e) => handleInfoChange("title", e.target.value)}
                                placeholder="Titre du quiz"
                            />
                        </div>
    
                        <div>
                            <label className="block text-sm font-medium mb-1">Catégorie</label>
                            <QInput
                                type="text"
                                value={
                                    editedQuiz?.category !== null && editedQuiz?.category !== undefined
                                        ? editedQuiz.category
                                        : quiz?.category !== null && quiz?.category !== undefined
                                            ? quiz.category
                                            : ""
                                }
                                onChange={(e) => handleInfoChange("category", e.target.value)}
                                placeholder="Catégorie du quiz"
                            />
                        </div>
    
                        <div>
                            <label className="block text-sm font-medium mb-1">Niveau</label>
                            <QInput
                                type="number"
                                value={
                                    editedQuiz?.level !== null && editedQuiz?.level !== undefined
                                        ? editedQuiz.level
                                        : quiz?.level !== null && quiz?.level !== undefined
                                            ? quiz.level
                                            : ""
                                }
                                onChange={(e) => handleInfoChange("level", parseInt(e.target.value))}
                                placeholder="Niveau de difficulté"
                                min={1}
                                max={3}
                            />
                        </div>
                    </div>
                )}
    
                {activeTab === 'questions' && (
                    <div className="flex">
                        <div className="w-1/3 pr-4 border-r border-gray-600">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="font-medium">Questions</h3>
                                <button 
                                    onClick={addNewQuestion}
                                    className="text-accent hover:text-accent-hover"
                                >
                                    <Plus size={20} />
                                </button>
                            </div>
                    
                            {Object.keys(editedQuiz?.content ?? quiz?.content ?? {}).map((key) => (
                                <div onClick={() => setActiveQuestionKey(key)} key={key} className={`p-2 rounded-md cursor-pointer flex flex-row gap-3 ${activeQuestionKey === key ? 'bg-accent bg-opacity-20 border border-accent' : 'hover:bg-gray-700'}`}>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeQuestion(key);
                                        }}
                                        className="text-red-500 hover:text-red-400"
                                    >
                                        {Object.keys(editedQuiz?.content || {}).length > 1 ? <Trash size={16} /> : null}
                                    </button>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm truncate">
                                            {(editedQuiz?.content && editedQuiz.content[key]?.question
                                                ? editedQuiz.content[key]?.question?.substring(0, 30)
                                                : quiz?.content && quiz.content[key]?.question
                                                    ? quiz.content[key]?.question?.substring(0, 30)
                                                    : ""
                                            )}
                                            {editedQuiz?.content && editedQuiz.content[key].question && editedQuiz.content[key].question.length > 30  || quiz?.content[key].question && quiz?.content[key].question.length > 30 ? '...' : ''}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
    
                        <div className="w-2/3 pl-4">
                            {activeQuestionKey ? (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Question</label>
                                        <QInput
                                            type="text"
                                            value={editedQuiz?.content && editedQuiz.content[activeQuestionKey].question || quiz?.content[activeQuestionKey].question || ""}
                                            onChange={(e) => handleQuestionChange(activeQuestionKey, "question", e.target.value)}
                                            placeholder="Texte de la question"
                                        />
                                    </div>
                
                                    { editedQuiz?.level === 3 && (
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Points</label>
                                                <QInput
                                                type="number"
                                                value={
                                                    editedQuiz?.content !== null && editedQuiz?.content !== undefined
                                                        ? editedQuiz.content[activeQuestionKey].points ?? ""
                                                        : quiz?.content !== null && quiz?.content !== undefined
                                                            ? quiz?.content[activeQuestionKey].points ?? ""
                                                            : 1
                                                }
                                                onChange={(e) => handleQuestionChange(activeQuestionKey, "points", parseInt(e.target.value) || null)}
                                                placeholder="Nombre de points"
                                                min={1}
                                            />
                                        </div>
                                        )
                                    }

                                    <div>
                                        <label className="block text-sm font-medium mb-1">Réponses</label>
                                        <div className="space-y-2">
                                            {(editedQuiz?.content && editedQuiz.content[activeQuestionKey]?.answers
                                                ? editedQuiz.content[activeQuestionKey].answers
                                                : quiz?.content && quiz.content[activeQuestionKey]?.answers
                                                    ? quiz.content[activeQuestionKey].answers
                                                    : []
                                            ).map((answer, idx) => (
                                                <div key={idx} className="flex items-center space-x-2">
                                                    <button
                                                        onClick={() => handleCorrectAnswerChange(activeQuestionKey, idx)}
                                                        className={`flex-shrink-0 ${editedQuiz?.content && editedQuiz.content[activeQuestionKey].correctAnswer === idx ? 'text-green-500' : 'text-gray-400'}`}
                                                    >
                                                        <CheckCircle size={20} />
                                                    </button>

                                                    <QInput
                                                        type="text"
                                                        value={
                                                            answer !== null && answer !== undefined
                                                                ? answer
                                                                : quiz?.content && quiz.content[activeQuestionKey]?.answers[idx] !== null && quiz.content[activeQuestionKey]?.answers[idx] !== undefined
                                                                    ? quiz.content[activeQuestionKey].answers[idx]
                                                                    : ""
                                                        }
                                                        onChange={(e) => handleAnswerChange(activeQuestionKey, idx, e.target.value)}
                                                        placeholder={`Réponse ${idx + 1}`}
                                                        className="flex-grow"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-xs text-gray-400 mt-2">
                                            Cliquez sur l'icône à gauche pour définir la réponse correcte
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                    <p>Aucune question sélectionnée</p>
                                    <button 
                                        onClick={addNewQuestion}
                                        className="mt-2 text-accent hover:text-accent-hover"
                                    >
                                        <Plus size={20} /> Ajouter une question
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
    
                <div className="flex justify-end space-x-3 mt-6">
                    <QButton 
                        text="Annuler" 
                        onClick={onClose} 
                        className="bg-gray-600 hover:bg-gray-700"
                    />
                    <QButton 
                        text="Enregistrer" 
                        onClick={() => editedQuiz && onSave(editedQuiz)}
                        className="bg-accent hover:bg-accent-hover"
                    />
                </div>
            </div>
        </div>
    )
};
  
export default Modal;