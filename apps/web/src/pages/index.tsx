import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Search, ChevronRight, ChevronLeft, ArrowLeft, CheckIcon } from 'lucide-react'
import { cn } from '@/utils'
import { useGetQuizzes } from '@/hooks/use-get-quizzes'
import { Quiz } from '@/services/get-quizzes'
import { useAnswerQuiz } from '@/hooks/use-answer-quiz'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { GoogleIcon } from '@/components/google-icon'
import { useAuth } from '@/hooks/use-auth'
import { useQueryClient } from 'react-query'
import { isNil } from 'lodash'
import { getDifficultyBadgeColor } from '@/services/get-difficulty-badge-color'

const topics = [
  "JavaScript",
  "CSS",
  "HTML",
  "React",
  "Redux",
  "Performance",
  "Network",
  "Testing"
]

export default function Index() {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredQuestions, setFilteredQuestions] = useState<Quiz[]>([])
  const { data: quizzes = [], isLoading } = useGetQuizzes()
  const { data: answer, mutate: answerQuiz, reset: resetAnswer } = useAnswerQuiz()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const [isSignInDialogOpen, setIsSignInDialogOpen] = useState(false)
  const { signInWithGoogle, isSignedIn, signOut } = useAuth()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (quizzes.length > 0) {
      setFilteredQuestions(quizzes)
    }
  }, [quizzes])

  useEffect(() => {
    const filtered = quizzes.filter(quiz =>
      (selectedTopics.length === 0 || selectedTopics.includes(quiz.topic)) &&
      quiz.question.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredQuestions(filtered)
  }, [selectedTopics, searchQuery])

  const toggleTopic = (topic: string) => {
    setSelectedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    )
  }

  const handleQuestionClick = (index: number) => {
    if (!isSignedIn) {
      setIsSignInDialogOpen(true)
      return
    }

    resetAnswer()
    setCurrentQuestionIndex(index)
    setSelectedAnswer(null)
    setShowAnswer(false)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex !== null && currentQuestionIndex < filteredQuestions.length - 1) {
      handleQuestionClick(currentQuestionIndex + 1)
    }
  }

  const handlePrevQuestion = () => {
    if (currentQuestionIndex !== null && currentQuestionIndex > 0) {
      handleQuestionClick(currentQuestionIndex - 1)
    }
  }

  const handleShowExplanation = () => {
    setShowAnswer(true)
  }

  const handleAnswerChange = (value: string) => {
    if (currentQuestionIndex === null) {
      return
    }

    const currentQuiz = quizzes[currentQuestionIndex];

    if (!currentQuiz) {
      return
    }

    setSelectedAnswer(parseInt(value))
    answerQuiz({
      quiz_id: currentQuiz.id,
      answer: parseInt(value)
    })
  }

  const getTopicBadgeColor = () => {
    return 'bg-black hover:bg-black'
  }

  const getAnswerColor = (index: number) => {
    if (answer && index === answer.user_answer) {
      return answer.is_correct ? 'text-green-600 font-bold border-green-600' : 'text-red-600 font-bold border-red-600'
    }

    return 'transition-colors duration-200'
  }

  const handleSignIn = () => {
    signInWithGoogle()
  }

  const handleSignOut = async () => {
    await signOut()
    queryClient.invalidateQueries('quizzes')
  }

  return (
    <>
      <header className="border-b bg-white shadow-sm py-4 px-8 fixed w-full">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">React Questions</h1>
          {isSignedIn ? (
            <Button onClick={handleSignOut}>Sign Out</Button>
          ) : (
            <Button onClick={() => setIsSignInDialogOpen(true)}>Sign In</Button>
          )}
        </div>
      </header>

      <div className="min-h-screen bg-background text-foreground p-8 pt-24">
        <div className="max-w-6xl mx-auto">
          {currentQuestionIndex === null ? (
            <>
              <div className="flex flex-wrap gap-2 mb-4">
                {topics.map(topic => (
                  <Button
                    key={topic}
                    variant={selectedTopics.includes(topic) ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => toggleTopic(topic)}
                    className="rounded-full"
                  >
                    {topic}
                  </Button>
                ))}
              </div>

              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search quiz questions"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex items-center gap-4 text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <span>{filteredQuestions.length} {filteredQuestions.length === 1 ? "question" : "questions"}</span>
                </div>
              </div>

              <div className="space-y-4">
                {isLoading && (
                  <div className="space-y-4 w-full mx-auto">
                    {[...Array(5)].map((_, i) => (
                      <Card key={i} className="w-full">
                        <CardContent className='p-4'>
                          <div className="flex items-center space-x-4">
                            <div className="h-7 w-7 rounded-full bg-gray-200 animate-pulse" />

                            <div className="flex-1 space-y-2">
                              <div className="h-5 mb-3 bg-gray-200 rounded animate-pulse" />
                              <div className="flex items-center space-x-2">
                                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {filteredQuestions.map((question, index) => (
                  <Card key={question.id} className="cursor-pointer hover:bg-accent" onClick={() => handleQuestionClick(index)}>
                    <CardContent className="p-4 flex items-center">
                      <div className={cn("flex rounded-full w-7 h-7 justify-center items-center border-solid border mr-4",
                        question.has_been_practiced ? "bg-green-500" : "bg-current-foreground",
                        question.has_been_practiced ? "text-white" : "text-muted-foreground",
                        { "border-green-500": question.has_been_practiced }
                      )}>
                        {question.has_been_practiced && <CheckIcon className='text-current w-4 h-4' />}
                      </div>

                      <div className="flex flex-col">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold">{question.question}</h3>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className={getDifficultyBadgeColor(question.difficulty)}>{question.difficulty}</Badge>
                          <Badge className={getTopicBadgeColor()}>{question.topic}</Badge>
                          <span className="text-sm text-muted-foreground">{question.total_attempt_count} {question.total_attempt_count === 1 ? "attempt" : "attempts"}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <div className="flex">
              <div className="w-1/4 pr-4 border-r">
                <Button variant="ghost" className="mb-4" onClick={() => setCurrentQuestionIndex(null)}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to list
                </Button>
                <div className="space-y-2">
                  {filteredQuestions.map((question, index) => (
                    <div
                      key={question.id}
                      className={`p-2 rounded cursor-pointer ${index === currentQuestionIndex ? 'bg-accent' : 'hover:bg-accent'}`}
                      onClick={() => handleQuestionClick(index)}
                    >
                      {question.question}
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-3/4 pl-8">
                <h3 className="text-xl font-semibold mb-4">{filteredQuestions[currentQuestionIndex].question}</h3>
                <div className="flex items-center gap-2 mb-6">
                  <Badge className={getDifficultyBadgeColor(filteredQuestions[currentQuestionIndex].difficulty)}>{filteredQuestions[currentQuestionIndex].difficulty}</Badge>
                  <Badge className={getTopicBadgeColor()}>{filteredQuestions[currentQuestionIndex].topic}</Badge>
                </div>
                <RadioGroup value={isNil(selectedAnswer) ? '' : selectedAnswer.toString()} onValueChange={handleAnswerChange}>
                  {filteredQuestions[currentQuestionIndex].options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem className={getAnswerColor(index)} value={index.toString()} id={`option-${index}`} />
                      <Label
                        htmlFor={`option-${index}`}
                        className={getAnswerColor(index)}
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                <Button className="mt-4 mb-6" onClick={handleShowExplanation} disabled={selectedAnswer === null}>
                  Show Explanation
                </Button>

                {showAnswer && (
                  <div className="bg-accent p-4 rounded-md">
                    <h4 className="font-semibold mb-2">Explanation:</h4>
                    <p>{filteredQuestions[currentQuestionIndex].explanation}</p>
                  </div>
                )}

                <div className="flex justify-between mt-8">
                  <Button onClick={handlePrevQuestion} disabled={currentQuestionIndex === 0}>
                    <ChevronLeft className="mr-2 h-4 w-4" /> Prev
                  </Button>
                  <span>{currentQuestionIndex + 1}/{filteredQuestions.length}</span>
                  <Button onClick={handleNextQuestion} disabled={currentQuestionIndex === filteredQuestions.length - 1}>
                    Next <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        <Dialog open={isSignInDialogOpen} onOpenChange={setIsSignInDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Sign in to continue</DialogTitle>
              <DialogDescription>
                Please sign in with your Google account to access the quiz.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center mt-4">
              <Button onClick={handleSignIn} className="flex items-center gap-2">
                <GoogleIcon />

                Sign in with Google
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>

  )
}