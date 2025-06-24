"use client"

import React, { useState } from "react";
import { X } from "lucide-react";
import QButton from "@/components/Utilities/QButton";
import QInput from "@/components/Utilities/QInput";
import { Switch } from "@heroui/switch";

interface ModalProps {
    quiz: Quiz | null;
    isOpen: boolean;
    onClose: () => void;
    onReject: (quizId: string | null) => void;
    onAccept: (quizId: string | null) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, quiz, onClose, onReject, onAccept }) => {
    const [activeTab, setActiveTab] = useState<'info' | 'questions'>('info');
    const [activeQuestionKey, setActiveQuestionKey] = useState<string | null>(null);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-background-tertiary rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-accent">Review le quiz</h2>
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
                                    quiz?.title !== null && quiz?.title !== undefined
                                            ? quiz.title
                                            : ""
                                }
                                disabled={true}
                            />
                        </div>
    
                        <div>
                            <label className="block text-sm font-medium mb-1">Catégorie</label>
                            <select
                                value={
                                    quiz?.category !== null && quiz?.category !== undefined
                                        ? quiz.category
                                        : ""
                                }
                                disabled={true}
                                className="w-full px-3 py-2 border border-[#2D2E32] rounded-xl bg-[#1A1B1E] text-foreground focus:ring-2 focus:ring-accent"
                            >
                                <option value="Autre">Autre</option>
                                <option value="Sports">Sports</option>
                                <option value="Musique">Musique</option>
                                <option value="Sciences">Science</option>
                                <option value="Histoire">Histoire</option>
                                <option value="Jeux Video">Jeux vidéo</option>
                            </select>
                        </div>
    
                        <div>
                            <label className="block text-sm font-medium mb-1">Niveau</label>
                            <QInput
                                type="number"
                                value={
                                    quiz?.level !== null && quiz?.level !== undefined
                                        ? quiz.level
                                        : ""
                                }
                                disabled={true}
                            />
                        </div>
                    </div>
                )}
    
                {activeTab === 'questions' && (
                    <div className="flex">
                        <div className="w-1/3 pr-4 border-r border-gray-600">
                            {(quiz?.content
                                ? Object.keys(quiz.content)
                                : []
                            ).map((key) => (
                                <div onClick={() => setActiveQuestionKey(key)} key={key} className={`p-2 rounded-md cursor-pointer flex flex-row gap-3 ${activeQuestionKey === key ? 'bg-accent bg-opacity-20 border border-accent' : 'hover:bg-gray-700'}`}>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm">
                                            {quiz?.content && quiz.content[key]?.question
                                                ? quiz.content[key]?.question?.substring(0, 20)
                                                : ""}
                                            {quiz?.content && quiz.content[key]?.question && quiz.content[key]?.question.length > 20
                                                ? '...' : ''}
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
                                            value={
                                                quiz?.content
                                                    ? quiz.content[activeQuestionKey].question ?? ""
                                                    : quiz?.content !== null
                                                        ? quiz?.content[activeQuestionKey].question ?? ""
                                                        : ""

                                            }
                                            disabled={true}
                                        />
                                    </div>
                
                                    { quiz?.level === 3 && (
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Points</label>
                                                <QInput
                                                type="number"
                                                value={
                                                    quiz?.content !== null
                                                        ? quiz.content[activeQuestionKey].points ?? -1
                                                        : -1
                                                }
                                                disabled={true}
                                            />
                                        </div>
                                        )
                                    }

                                    <div>
                                        <label className="block text-sm font-medium mb-1">Réponses</label>
                                        <div className="space-y-2">
                                            {(
                                                quiz?.content && quiz.content[activeQuestionKey]?.answers
                                                    ? quiz.content[activeQuestionKey].answers
                                                    : quiz?.content && quiz.content[activeQuestionKey]?.answers
                                                        ? quiz.content[activeQuestionKey].answers
                                                        : []
                                            ).map((answer, idx) => {
                                                return (
                                                    <div key={idx} className="flex items-center space-x-2">
                                                        <Switch
                                                            className={'flex-shrink-0'}
                                                            isSelected={
                                                                (quiz?.content && quiz.content[activeQuestionKey]?.correctAnswers
                                                                    ? quiz.content[activeQuestionKey].correctAnswers.includes(idx) ? true : false
                                                                    : false
                                                                )
                                                            }
                                                            color="success"
                                                            disabled={true}
                                                        />

                                                        <QInput
                                                            type="text"
                                                            value={
                                                                answer !== null && answer !== undefined
                                                                    ? answer
                                                                    : quiz?.content && quiz.content[activeQuestionKey]?.answers[idx] !== null && quiz.content[activeQuestionKey]?.answers[idx] !== undefined
                                                                        ? quiz.content[activeQuestionKey].answers[idx]
                                                                        : ""
                                                            }
                                                            disabled={true}
                                                            className="flex-grow"
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                    <p>Aucune question sélectionnée</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
    
                <div className="flex space-x-3 mt-6">
                    <div className="flex justify-start">
                        <QButton
                            text="Annuler" 
                            onClick={() => {
                                onClose();
                            }} 
                            className="bg-gray-600 hover:bg-gray-700"
                        />
                    </div>
                    <div className="flex flex-1 justify-end gap-2">
                        <QButton 
                            text="Rejeter" 
                            onClick={() => {onClose(), onReject(quiz?._id ?? null)}}
                            className="bg-accent hover:bg-accent-hover"
                        />
                        <QButton 
                            text="Accepter" 
                            onClick={() => {onClose(), onAccept(quiz?._id ?? null)}}
                            className="bg-accent hover:bg-accent-hover"
                        />
                    </div>

                </div>
            </div>
        </div>
    )
};
  
export default Modal;