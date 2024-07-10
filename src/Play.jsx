import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import questions from "../questions";
import Confetti from "./components/Confetti";

const Play = () => {
  const loadQuestion = () => {
    const random = Math.random();
    const randomNumber = Math.ceil(random * questions.length);
    const randomQuestion = questions[randomNumber];

    if (!randomQuestion) return;
    const { answers, correctIndex } = randomQuestion;

    setQuestion(randomQuestion);

    setCorrectIndex(correctIndex);

    if (!randomQuestion) return;

    setAnswers(answers);
  };

  const { register, handleSubmit } = useForm();

  const [question, setQuestion] = useState(null);

  const [correctIndex, setCorrectIndex] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [rightAnswer, setRightAnswer] = useState(undefined);
  const [questionAnswered, setQuestionAnswered] = useState(false);
  const [allowConfetti, setAllowConfetti] = useState(false);

  useEffect(() => {
    loadQuestion();

    return () => {};
  }, []);

  const onSubmit = ({ answer }) => {
    debugger;
    if (!question) return;
    const correctIndex = question.correctIndex;
    const correctAnswer = question.answers[correctIndex];

    setTimeout(() => {
      loadQuestion();
    }, 4000);

    if (correctAnswer === answer) {
      setAllowConfetti(true);
      setRightAnswer(true);
      setTimeout(() => {
        setAllowConfetti(false);
        return setRightAnswer(undefined);
      }, 4000);
    } else {
      setRightAnswer(false);
    }
  };

  return (
    <>
      <div className="bg-blue-200 w-[40vw] min-h-screen flex items-center">
        {rightAnswer && allowConfetti && <Confetti />}
        <div className="w-full">
          <h2 className="text-center text-blue-400 font-bold text-2xl uppercase mb-10">
            Test your JS knowledge
          </h2>
          <div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2 min-h-[600px]">
            <form onSubmit={handleSubmit(onSubmit)} action="">
              <div className="mb-5">
                <label
                  htmlFor="name"
                  className="block mb-2 font-bold text-gray-600"
                >
                  Question:
                </label>
                {question && <h2 className="my-3">{question.question}</h2>}

                <select
                  className="py-2 px-4 border border-[rgba(75,85,99,0.6)] rounded-md"
                  {...register("answer", { required: true })}
                >
                  <option value="">Select...</option>
                  {answers?.map((answer) => (
                    <option key={answer} value={answer}>
                      {answer}
                    </option>
                  ))}

                  <option value={"test"}>{"test"}</option>
                </select>
              </div>

              <button
                type="submit"
                className="block w-full bg-blue-500 text-white font-bold p-4 rounded-lg"
              >
                Check answer
              </button>
            </form>
            {rightAnswer === true && (
              <img
                className="pt-3 rounded-md"
                src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmU3dGhnN3F0azhrbTIyeHo4eHpnZ3RmcGhxZ3g5bWQ2OTc5aXZzNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/GS1VR900wmhJ6/giphy.gif"
              />
            )}
            {rightAnswer === false && (
              <img
                className="pt-3 rounded-md"
                src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWNhMzBraGlueTh1a2l2cXV5bmVnemtucjlkMWxtbW1jOGpoZGRvdiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/li0dswKqIZNpm/200.gif"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Play;
