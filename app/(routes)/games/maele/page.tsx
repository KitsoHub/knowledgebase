'use client';

import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import Leaderboard from '@/app/components/shared/games/leaderboard';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import { Background } from '@/app/components/shared/games/background';
import { LevelIndicator } from '@/app/components/shared/games/level-indicator';
import useRandomQuestion from '@/app/hooks/use-generate-question';
import { useShuffledOptions } from '@/app/hooks/use-shuffle-options';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { LucideArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAudio } from 'react-use';
import ConfettiButton from '@/app/components/shared/confetti';
import NameEntry from '@/app/components/shared/games/name-entry';
import { db } from '@/lib/firebase';
import { collection, addDoc, query, orderBy, limit, getDocs } from 'firebase/firestore';

function QuizApp({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const [username, setUsername] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [currentLevel, setCurrentLevel] = useState(0);
  const { chosenQuestion: question, options } = useRandomQuestion(currentLevel);
  const [answerChecked, setAnswerChecked] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [quizResult, setQuizResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const [isVisible, setIsVisible] = useState(false);
  const maxLevel = 10;
  const quizItem = question;
  const quizQuestion = quizItem?.phrase;

  const [audio, _state, controls, _ref] = useAudio({
    src: '/Win sound.wav',
    autoPlay: false,
  });
  const [wrong_audio, _wrong_state, wrong_controls, _wrong_ref] = useAudio({
    src: '/wrong.mp3',
    autoPlay: false,
  });

  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const saveToLeaderboard = async (username: string, score: number) => {
    try {
      await addDoc(collection(db, 'leaderboard'), {
        username,
        score,
        timestamp: new Date(),
      });
      console.log('Score saved to leaderboard');
      MySwal.fire({
        title: 'Success',
        text: 'Your score has been saved to the leaderboard!',
        icon: 'success',
        confirmButtonText: 'View Leaderboard',
      }).then(() => {
        setActiveTab('leaderboard'); // Switch to leaderboard tab after saving
      });
    } catch (error) {
      console.error('Error saving to leaderboard:', error);
      MySwal.fire({
        title: 'Error',
        text: 'Failed to save score to leaderboard',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const showCorrectSwal = () => {
    controls.play();
    MySwal.fire({
      title: 'Congratulations',
      text: 'You got the correct answer',
      icon: 'success',
      confirmButtonText: 'Next Question',
    }).then(() => {
      setCurrentLevel((prev) => Math.min(prev + 1, maxLevel));
    });
  };

  const showIncorrectSwal = () => {
    wrong_controls.play();
    MySwal.fire({
      title: 'Error',
      text: 'You got the answer wrong',
      icon: 'error',
      confirmButtonText: 'Next Question',
    }).then(() => {
      setCurrentLevel((prev) => Math.min(prev + 1, maxLevel));
    });
  };

  const displayResults = () => {
    MySwal.fire({
      title: 'Quiz Results',
      html: `
        <p>Score: ${quizResult.score}</p>
        <p>Correct Answers: ${quizResult.correctAnswers}</p>
        <p>Wrong Answers: ${quizResult.wrongAnswers}</p>
      `,
      icon: 'success',
      confirmButtonText: 'OK',
    }).then(() => {
      if (username) {
        saveToLeaderboard(username, quizResult.score);
      }
    });
  };

  const handleSubmit = () => {
    if (selectedAnswer) {
      setAnswerChecked(true);
      if (selectedAnswer === question?.meaning) {
        setQuizResult((prev) => ({
          ...prev,
          correctAnswers: prev.correctAnswers + 1,
          score: prev.score + 1,
        }));
        showCorrectSwal();
      } else {
        setQuizResult((prev) => ({
          ...prev,
          wrongAnswers: prev.wrongAnswers + 1,
        }));
        showIncorrectSwal();
      }
      setSelectedAnswer(null);
      if (currentLevel === maxLevel - 1) {
        setShowResults(true);
      }
    }
  };

  const handleNameSubmit = (name: string) => {
    setUsername(name);
  };

  const allOptions = useShuffledOptions(question, options);
  const completed = currentLevel === maxLevel;

  if (!username) {
    return <NameEntry onSubmit={handleNameSubmit} />;
  }

  return (
    <div className="flex items-center justify-center mt-12 bg-white relative overflow-hidden">
      <Background />
      {audio}
      {wrong_audio}
      {isVisible && <ConfettiButton />}
      <Card className="w-full max-w-lg mx-4 bg-white/90 border border-gray-200 shadow-xl backdrop-blur-sm relative z-10">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center text-gray-800">
            <div className="flex items-center">
              <Button
                onClick={() => router.back()}
                variant={'ghost'}
                size="icon"
                className="mb-9"
              >
                <LucideArrowLeft size={20} />
              </Button>
              <div className="justify-center w-full">
                <div className="text-3xl">Maele A Setswana</div>
                <div className="">Quiz</div>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {completed ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800">
                Game Complete!
              </h2>
              <p className="text-lg text-gray-700"></p>
              <Button
                onClick={() => {
                  setIsVisible(true);
                  displayResults();
                }}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-2 px-6 rounded-full transition-all"
              >
                Show Results
              </Button>
            </div>
          ) : (
            <>
              <LevelIndicator
                currentLevel={currentLevel}
                maxLevel={maxLevel}
              />
              <p className="mb-6 text-lg font-medium text-center text-gray-700">
                {quizQuestion}
                <div className="text-white text-xs">
                  {question?.meaning}
                </div>
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {allOptions.map((answer, index) => (
                  <Button
                    key={index}
                    variant={
                      selectedAnswer === answer?.meaning
                        ? 'default'
                        : 'outline'
                    }
                    className={`h-20 flex flex-col py-4 px-6 text-left transition-all text-wrap text-center ${
                      selectedAnswer === answer?.meaning
                        ? 'bg-purple-600 text-white'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                    }`}
                    onClick={() => handleAnswerSelect(answer!.meaning)}
                  >
                    {answer?.meaning}
                  </Button>
                ))}
              </div>
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          {!completed && (
            <Button
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-2 px-6 rounded-full transition-all"
              disabled={!selectedAnswer}
              onClick={handleSubmit}
            >
              Submit Answer
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}



export default function GamePage() {
  const [activeTab, setActiveTab] = useState('game');

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto pt-6">
        <div className="flex justify-center mb-6">
          <div className="flex space-x-4 bg-white rounded-lg shadow-md p-1">
            <Button
              variant={activeTab === 'game' ? 'default' : 'outline'}
              className={`${
                activeTab === 'game'
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'text-gray-700'
              } px-6 py-2 rounded-md`}
              onClick={() => setActiveTab('game')}
            >
              Game
            </Button>
            <Button
              variant={activeTab === 'leaderboard' ? 'default' : 'outline'}
              className={`${
                activeTab === 'leaderboard'
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'text-gray-700'
              } px-6 py-2 rounded-md`}
              onClick={() => setActiveTab('leaderboard')}
            >
              Leaderboard
            </Button>
          </div>
        </div>
        {activeTab === 'game' ? (
          <QuizApp setActiveTab={setActiveTab} />
        ) : (
          <Leaderboard />
        )}
      </div>
    </div>
  );
}