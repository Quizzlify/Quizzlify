"use client"

import React, { useEffect, useState } from "react";
import { X, Trash, CircleAlert, Info } from "lucide-react";
import QButton from "@/components/Utilities/QButton";
import QInput from "@/components/Utilities/QInput";
import { Switch } from "@heroui/switch";

type EditedQuiz = {
    level: number | null;
    title: string | null;
    content: {
      [key: string]: {
        question: string | null;
        points: number | null;
        correctAnswers: number[] | null;
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
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>("");

    const [noEmptyInput, setEmptyInput] = useState<boolean>(false);
    
    const [editedQuiz, setEditedQuiz] = useState<EditedQuiz>({
        level: quiz?.level ? quiz.level : null,
        title: quiz?.title ? quiz.title : null,
        content: quiz?.content ? {...quiz.content} : null,
        category: quiz?.category ? quiz.category : null,
    });

    useEffect(() => {
        if (isOpen && quiz) {
            setEditedQuiz({
                level: quiz.level ?? null,
                title: quiz.title ?? null,
                content: quiz.content ? { ...quiz.content } : null,
                category: quiz.category ?? null,
            });
        }
        if (!isOpen) {
            setEditedQuiz({ level: null, title: null, content: null, category: null });
        }
    }, [isOpen, quiz]);
    
    const handleQuestionChange = (questionKey: string, field: string, value: string | number) => {
      setEditedQuiz(prev => {
        if (!prev) return prev;

        if (value === "") {
            setAlertMessage(`Le champ ${field} ne peut pas être vide.`);
            setShowAlert(true);
            setEmptyInput(true);

        } else if (field === "points" && (Number(value) < 1 || Number(value) > 5)) {
            setAlertMessage("Le nombre de points doit être compris entre 1 et 5.");
            setShowAlert(true);
            setEmptyInput(true);

        } else {
            setShowAlert(false);
            setEmptyInput(false);
        }

        const updatedContent: { [key: string]: { question: string | null; points: number | null; correctAnswers: number[] | null; answers: string[] | null } } = { 
          ...(prev.content ?? (quiz?.content as EditedQuiz['content']) ?? {}) 
        };
        updatedContent[questionKey] = {
          ...updatedContent[questionKey],
          [field]: value
        };

        return { ...prev, content: updatedContent };
      });
    };

    const handleInfoChange = (field: string, value: string | number) => {
        setEditedQuiz(prev => {
            if (!prev) return prev;
            if (value === "" || value === null || value === undefined) {
                setAlertMessage(`Le champ ${field} ne peut pas être vide.`);
                setShowAlert(true);
                setEmptyInput(true);
            } else if (field === "level" && (Number(value) < 1 || Number(value) > 3)) {
                setAlertMessage("Le niveau doit être compris entre 1 et 3.");
                setShowAlert(true);
                setEmptyInput(true);
            } else {
                setShowAlert(false);
                setEmptyInput(false);
            }

            return { ...prev, [field]: field === "level" ? Number(value) : value };
        });
    };
  
    const handleAnswerChange = (questionKey: string, answerIndex: number, value: string) => {
      setEditedQuiz(prev => {
        if (!prev) return prev;
        
        if (value === "") {
          setAlertMessage("Les champs des réponses ne peuvent pas être vide.");
          setShowAlert(true);
          setEmptyInput(true);
        } else {setShowAlert(false); setEmptyInput(false);}

        const updatedContent = prev.content !== null && prev.content !== undefined
            ? { ...prev.content }
            : { ...((quiz?.content as EditedQuiz['content']) ?? {}) };
        
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
  
    const handleCorrectAnswerChange = (questionKey: string, answerIndex: number, isSelected: boolean) => {
        if (isSelected) {
            setEditedQuiz(prev => {
                if (!prev) return prev;

                const updatedContent = prev.content !== null && prev.content !== undefined
                    ? { ...prev.content }
                    : { ...((quiz?.content as Quiz['content']) ?? {}) };
                    const currentCorrectAnswers = [
                        ...(updatedContent[questionKey].correctAnswers ?? quiz?.content[questionKey].correctAnswers ?? [])
                    ];
                    if (!currentCorrectAnswers.includes(answerIndex)) {
                        updatedContent[questionKey] = {
                            ...updatedContent[questionKey],
                            correctAnswers: [...currentCorrectAnswers, answerIndex],
                        };
                    }
                
                return { ...prev, content: updatedContent };
            });
        } else {
            setEditedQuiz(prev => {
                if (!prev) return prev;

                const updatedContent = prev.content !== null && prev.content !== undefined
                    ? { ...prev.content }
                    : { ...((quiz?.content as Quiz['content']) ?? {}) };
                const currentCorrectAnswers = updatedContent[questionKey].correctAnswers ?? quiz?.content[questionKey].correctAnswers ?? [];
                const updatedCorrectAnswers = currentCorrectAnswers.filter(index => index !== answerIndex);
                
                updatedContent[questionKey] = {
                    ...updatedContent[questionKey],
                    correctAnswers: updatedCorrectAnswers,
                };
                
                return { ...prev, content: updatedContent };
            });
        }

    };
  
    const removeQuestion = (questionKey: string) => {
        setEditedQuiz(prev => {
            if (
                prev &&
                prev.level === null &&
                prev.title === null &&
                prev.content === null &&
                prev.category === null
            ) {
                const content = quiz?.content ? { ...quiz.content } : {};
                delete content[questionKey];
                return { ...prev, content };
            } else {
                const updatedContent = { ...prev.content };
                delete updatedContent[questionKey];

                return { ...prev, content: updatedContent };
            }
        });
        setActiveQuestionKey(null);
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
                            <select
                                value={
                                    editedQuiz?.category !== null && editedQuiz?.category !== undefined
                                        ? editedQuiz.category
                                        : quiz?.category !== null && quiz?.category !== undefined
                                            ? quiz.category
                                            : ""
                                }
                                onChange={(e) => handleInfoChange("category", e.target.value)}
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
                                    editedQuiz?.level !== null && editedQuiz?.level !== undefined
                                        ? editedQuiz.level
                                        : quiz?.level !== null && quiz?.level !== undefined
                                            ? quiz.level
                                            : ""
                                }
                                onChange={(e) => handleInfoChange("level", e.target.value)}
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
                            {(editedQuiz?.content
                                ? Object.keys(editedQuiz.content)
                                : []
                            ).map((key) => (
                                <div onClick={() => setActiveQuestionKey(key)} key={key} className={`p-2 rounded-md cursor-pointer flex flex-row gap-3 ${activeQuestionKey === key ? 'bg-accent bg-opacity-20 border border-accent' : 'hover:bg-gray-700'}`}>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeQuestion(key);
                                            setActiveQuestionKey(null)
                                        }}
                                        className="text-red-500 hover:text-red-400"
                                    >
                                        {Object.keys(editedQuiz?.content || {}).length > 1 ? <Trash size={16} /> : null}
                                    </button>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm">
                                            {editedQuiz?.content && editedQuiz.content[key]?.question
                                                ? editedQuiz.content[key]?.question?.substring(0, 20)
                                                : ""}
                                            {editedQuiz?.content && editedQuiz.content[key]?.question && editedQuiz.content[key]?.question.length > 20
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
                                                editedQuiz?.content
                                                    ? editedQuiz.content[activeQuestionKey].question ?? ""
                                                    : quiz?.content !== null
                                                        ? quiz?.content[activeQuestionKey].question ?? ""
                                                        : ""

                                            }
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
                                                    editedQuiz?.content !== null
                                                        ? editedQuiz.content[activeQuestionKey].points ?? ""
                                                        : quiz?.content !== null
                                                            ? quiz?.content[activeQuestionKey].points ?? ""
                                                            : 1
                                                }
                                                onChange={(e) => handleQuestionChange(activeQuestionKey, "points", e.target.value)}
                                                placeholder="Nombre de points"
                                                min={1}
                                                max={5}
                                            />
                                        </div>
                                        )
                                    }

                                    <div>
                                        <label className="block text-sm font-medium mb-1">Réponses</label>
                                        <div className="space-y-2">
                                            {(
                                                editedQuiz?.content && editedQuiz.content[activeQuestionKey]?.answers
                                                    ? editedQuiz.content[activeQuestionKey].answers
                                                    : quiz?.content && quiz.content[activeQuestionKey]?.answers
                                                        ? quiz.content[activeQuestionKey].answers
                                                        : []
                                            ).map((answer, idx) => {
                                                return (
                                                    <div key={idx} className="flex items-center space-x-2">
                                                        <Switch
                                                            onValueChange={(isSelected) => handleCorrectAnswerChange(activeQuestionKey, idx, isSelected)}
                                                            className={'flex-shrink-0'}
                                                            isSelected={
                                                                (editedQuiz?.content && editedQuiz.content[activeQuestionKey]?.correctAnswers
                                                                    ? editedQuiz.content[activeQuestionKey].correctAnswers.includes(idx) ? true : false
                                                                    : quiz?.content && quiz.content[activeQuestionKey]?.correctAnswers
                                                                        ? quiz.content[activeQuestionKey].correctAnswers.includes(idx)
                                                                        : false
                                                                )
                                                            }
                                                            color="success"
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
                                                            onChange={(e) => handleAnswerChange(activeQuestionKey, idx, e.target.value)}
                                                            placeholder={`Réponse ${idx + 1}`}
                                                            className="flex-grow"
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <p className="text-xs text-gray-400 mt-2">
                                            Cliquez sur le bouton à gauche pour définir la/les réponse(s) correcte(s)
                                        </p>
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
                    {showAlert && (
                        <div className="flex items-start gap-2 bg-red-500/10 backdrop-blur-lg border border-danger text-danger rounded-lg px-4 py-2 animate-slide-up">
                            <CircleAlert size={18} />
                            <span className="text-sm">{alertMessage}</span>
                        </div>
                    )}
                    <div className="flex flex-col gap-2 flex flex-1 justify-end">
                        <div className="flex flex-1 justify-end gap-2">
                            <QButton 
                                text="Annuler" 
                                onClick={() => {
                                    onClose();
                                    setEditedQuiz({ level: null, title: null, content: null, category: null });
                                }} 
                                className="bg-gray-600 hover:bg-gray-700"
                            />

                            <QButton 
                                text="Enregistrer"
                                onClick={() => {
                                    if (editedQuiz) onSave(editedQuiz);
                                    setEditedQuiz({ level: null, title: null, content: null, category: null });
                                }}
                                className="bg-accent hover:bg-accent-hover"
                                disabled={noEmptyInput}
                            />
                        </div>
                        <span className="text-xs text-gray-400 flex flex-1 justify-end">
                            Toute modification soumettra à nouveau le quiz à une vérification.
                        </span>
                    </div>
                </div>
                
                { quiz?.status === "published" && (
                    <div className="flex items-start gap-2 mt-3 bg-yellow-500/10 backdrop-blur-lg border border-yellow-500 text-yellow-500 rounded-lg px-4 py-2 animate-slide-up">
                        <Info size={18} />
                        <span className="text-sm">
                            Partagez votre quiz avec cette adresse: <br />
                            <a
                                href={`${window.location.origin}/quiz/${quiz?._id}`}
                                target="_blank"
                                className="ml-1 font-mono text-accent"
                            >
                                {typeof window !== "undefined" && quiz?._id
                                    ? `${window.location.origin}/quiz/${quiz._id}`
                                    : ""}
                            </a>
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
};
  
export default Modal;