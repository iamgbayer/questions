import React from 'react'
import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export default function Index() {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Revise.LC: Mastering Coding Patterns Through Spaced Repetition
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Revise.LC transforms LeetCode practice through personalized review sessions, enhancing long-term
                  retention and understanding of coding patterns. Designed for beginners and advanced coders alike,
                  unlock your full potential.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  href="#"
                >
                  Get Started
                </Link>
              </div>
            </div>
            <img
              alt="Hero"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              height="310"
              src="/placeholder.svg"
              width="550"
            />
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-zinc-900">
        <div className="container px-4 md:px-6">
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <MergeIcon className="h-12 w-12 text-gray-900 dark:text-gray-50" />
              <h3 className="text-xl font-bold">Personalized Review Sessions</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Revise.LC customizes your practice sessions based on your performance, maximizing learning efficiency.
                You can create your own questions and lists or use existing ones like the Grind 75 list.
              </p>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <BotIcon className="h-12 w-12 text-gray-900 dark:text-gray-50" />
              <h3 className="text-xl font-bold">Spaced Repetition</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Enhance long-term retention of coding patterns through our spaced repetition algorithm. When practicing
                a question, you need to rate the difficulty, and the platform will schedule a day for you to practice it
                again based on your rating.
              </p>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <ScaleIcon className="h-12 w-12 text-gray-900 dark:text-gray-50" />
              <h3 className="text-xl font-bold">Free and Open Source Platform</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Revise.LC is a free and open-source platform that helps you unlock your full potential and become a
                coding expert.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Get answers to the most common questions about Revise.LC.
            </p>
          </div>
          <div className="mx-auto w-full max-w-2xl space-y-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is Revise.LC?</AccordionTrigger>
                <AccordionContent>
                  Revise.LC is a platform that transforms LeetCode practice through personalized review sessions,
                  enhancing long-term retention and understanding of coding patterns. You can create your own questions
                  and lists or use existing ones like the Grind 75 list.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>How does Revise.LC work?</AccordionTrigger>
                <AccordionContent>
                  Revise.LC uses a spaced repetition algorithm to customize your practice sessions based on your
                  performance, ensuring you focus on the areas you need to improve the most. When practicing a question,
                  you need to rate the difficulty, and the platform will schedule a day for you to practice it again based
                  on your rating.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Who is Revise.LC for?</AccordionTrigger>
                <AccordionContent>
                  Revise.LC is designed for both beginners and advanced coders who want to enhance their understanding of
                  coding patterns and improve their problem-solving skills. You can create your own questions and lists or
                  use existing ones like the Grind 75 list.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
    </>
  )
}


function BotIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  )
}


function ChevronRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}


function MergeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 6 4-4 4 4" />
      <path d="M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22" />
      <path d="m20 22-5-5" />
    </svg>
  )
}


function ScaleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="M7 21h10" />
      <path d="M12 3v18" />
      <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
    </svg>
  )
}
