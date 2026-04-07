import { useState, useEffect } from 'react';
import axios from '../utils/axios';
import { useAuthStore } from '../store/authStore';
import { useCreditStore } from '../store/creditStore';

const Quiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const { user } = useAuthStore();
  const { fetchCredits } = useCreditStore();

  useEffect(() => {
    // Fetch quizzes from backend (or load static)
    axios.get('/quiz').then(res => setQuizzes(res.data.quizzes));
  }, []);

  const handleSubmit = async () => {
    const res = await axios.post(`/quiz/submit/${selectedQuiz._id}`, { answers });
    setResult(res.data);
    fetchCredits();
  };

  if (result) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl text-white">Your Score: {result.score}%</h2>
        <p>Credits earned: {result.creditsEarned}</p>
        <button onClick={() => setResult(null)} className="mt-4 bg-cyan-600 px-4 py-2 rounded">Back to Quizzes</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <h1 className="text-2xl text-white mb-6">Security Quizzes (300+)</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {quizzes.map(q => (
          <div key={q._id} className="bg-slate-900 p-4 rounded cursor-pointer" onClick={() => setSelectedQuiz(q)}>
            <h3 className="text-white">{q.title}</h3>
            <p className="text-slate-400 text-sm">{q.difficulty}</p>
          </div>
        ))}
      </div>
      {selectedQuiz && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-slate-900 max-w-2xl w-full p-6 rounded max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl text-white mb-4">{selectedQuiz.title}</h2>
            {selectedQuiz.questions.map((q, idx) => (
              <div key={idx} className="mb-4">
                <p className="text-white mb-2">{q.text}</p>
                {q.options.map((opt, optIdx) => (
                  <label key={optIdx} className="flex items-center gap-2 text-slate-300">
                    <input type="radio" name={`q${idx}`} onChange={() => { const newAnswers = [...answers]; newAnswers[idx] = optIdx; setAnswers(newAnswers); }} /> {opt}
                  </label>
                ))}
              </div>
            ))}
            <button onClick={handleSubmit} className="bg-cyan-600 px-6 py-2 rounded text-white">Submit</button>
            <button onClick={() => setSelectedQuiz(null)} className="ml-2 border px-6 py-2 rounded">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Quiz;