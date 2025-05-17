import { Switch } from "@heroui/switch";
import QInput from "../Utilities/QInput";

interface CreateQuestionProps {
  questionNum: number;
  removeQuestion: (num: number) => void;
  content: Quiz['content'];
  setContent: (content: Quiz['content']) => void;
  level: number;
}

const CreateQuestion: React.FC<CreateQuestionProps> = ({ questionNum, removeQuestion, content, setContent, level }) => {
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>, field: string) {
    const value = field === 'points' ? Number(e.target.value) : e.target.value;
    setContent({
      ...content,
      [questionNum]: {
        ...content[questionNum],
        [field]: value
      }
    });
  }

  function handleAnswerChange(e: React.ChangeEvent<HTMLInputElement>, answerIndex: number) {
    const newAnswers = [...(content[questionNum]?.answers || [])];
    newAnswers[answerIndex] = e.target.value;

    setContent({
      ...content,
      [questionNum]: {
        ...content[questionNum],
        answers: newAnswers
      }
    });
  }

  function handleCorrectAnswerChange(answerIndex: number, isSelected: boolean) {
    if (isSelected) {
      const updatedQuestion = {
        ...content[questionNum],
        correctAnswer: answerIndex,
      };

      if (level !== 3) {
        updatedQuestion.points = null;
      }

      setContent({
        ...content,
        [questionNum]: updatedQuestion,
      });
    }
 }

  return (
    <div className="card glass-effect w-full px-6 py-6 my-6 relative animate-slide-up bg-background-tertiary rounded-2xl shadow-lg border border-border">
      <div className="flex flex-col">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-gradient flex items-center">
            Question {questionNum}
          </h2>

          <div className="flex-grow">
            <QInput
              label="Intitulé de la question"
              placeholder="Entrez la question ici"
              onChange={(e) => handleInputChange(e, "question")}
              type="input"
              className="w-full [&>div]:!border-border text-xl"
              required
            />
          </div>

          {level === 3 && (
            <div className="flex items-center">
              <QInput
                label="Points"
                placeholder="Entrez le nombre de points"
                onChange={(e) => handleInputChange(e, "points")}
                type="input"
                className="w-24 [&>div]:!border-border text-xl"
                required
                min={1}
                max={5}
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-muted p-4 rounded-xl">
          {["A", "B", "C", "D"].map((label, i) => (
            <div key={i} className="flex flex-col gap-2">
              <QInput
                label={`Réponse ${label}`}
                placeholder={`Entrez la réponse ${label} ici`}
                onChange={(e) => handleAnswerChange(e, i)}
                type="input"
                className="[&>div]:!border-border"
                required
              />
              <Switch
                color="warning"
                onValueChange={(isSelected) => handleCorrectAnswerChange(i, isSelected)}
              >
                Marquer comme correcte
              </Switch>
            </div>
          ))}
        </div>

        {questionNum > 1 && (
          <div className="mt-8">
            <button
              onClick={() => removeQuestion(questionNum)}
              className="w-full btn-primary text-sm bg-danger hover:bg-red-600 py-2 rounded-lg transition-all"
            >
              Supprimer la question
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateQuestion;